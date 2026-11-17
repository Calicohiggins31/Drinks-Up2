import { useEffect, useRef } from 'react';
import type { Ingredient } from '../data/ingredients';
import type { Recipe } from '../data/recipes';
import { supabase } from '../lib/supabase';
import { diffById, diffSets, mergeById, mergeFavorites } from '../lib/sync';
import { useAuth } from './AuthContext';
import { useBar } from './BarContext';

type Snapshot = { owned: Set<string>; favorites: Set<string>; recipes: Recipe[]; ingredients: Ingredient[] };

const stripRecipe = ({ custom: _c, ...r }: Recipe) => r as Recipe;
const stripIngredient = (i: Ingredient) => ({ id: i.id, name: i.name, category: i.category });

/**
 * Keeps My Bar, favourites and the user's own recipes in step with their account.
 * On sign-in, phone and account data are merged (nothing is lost); after that, every change is uploaded.
 * Renders nothing.
 */
export function AccountSync() {
  const { userId } = useAuth();
  const local = useBar();
  const synced = useRef<Snapshot | null>(null);
  const prevUser = useRef<string | null>(null);

  // First sync after signing in.
  useEffect(() => {
    const client = supabase;
    if (!client || !local.ready) return;
    if (!userId) {
      // Signed out: the user's own recipes belong to the account, so remove them from this phone.
      if (prevUser.current) local.replaceCustom([], []);
      prevUser.current = null;
      synced.current = null;
      return;
    }
    if (prevUser.current === userId) return;
    prevUser.current = userId;
    let cancelled = false;

    (async () => {
      const [bar, fav, rec, ing] = await Promise.all([
        client.from('bar_items').select('ingredient_id'),
        client.from('favorites').select('recipe_id'),
        client.from('custom_recipes').select('recipe'),
        client.from('custom_ingredients').select('id, name'),
      ]);
      if (cancelled || bar.error || fav.error || rec.error || ing.error) {
        console.warn('Account sync failed', bar.error ?? fav.error ?? rec.error ?? ing.error);
        prevUser.current = null; // try again next time
        return;
      }
      const remoteBar = (bar.data ?? []).map((r) => r.ingredient_id as string);
      const remoteFav = (fav.data ?? []).map((r) => r.recipe_id as string);
      const remoteRec = (rec.data ?? []).map((r) => r.recipe as Recipe);
      const remoteIng = (ing.data ?? []).map((r) => ({ id: r.id as string, name: r.name as string, category: 'Your own' as const }));

      const owned = mergeFavorites(local.owned, remoteBar);
      const favorites = mergeFavorites(local.favorites, remoteFav);
      const recipes = mergeById(local.customRecipes.map(stripRecipe), remoteRec);
      const ingredients = mergeById(local.customIngredients.map(stripIngredient), remoteIng);

      // Upload anything that was only on this phone.
      await push(
        userId,
        { owned: new Set(remoteBar), favorites: new Set(remoteFav), recipes: remoteRec, ingredients: remoteIng },
        { owned, favorites, recipes, ingredients },
      );
      if (cancelled) return;
      synced.current = { owned, favorites, recipes, ingredients };
      local.replaceOwned(owned);
      local.replaceFavorites(favorites);
      local.replaceCustom(recipes, ingredients);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, local.ready]);

  // Upload later changes.
  useEffect(() => {
    if (!userId || !synced.current) return;
    const next: Snapshot = {
      owned: new Set(local.owned),
      favorites: new Set(local.favorites),
      recipes: local.customRecipes.map(stripRecipe),
      ingredients: local.customIngredients.map(stripIngredient),
    };
    const before = synced.current;
    synced.current = next;
    push(userId, before, next).catch((e) => console.warn('Account sync failed', e));
  }, [userId, local.owned, local.favorites, local.customRecipes, local.customIngredients]);

  return null;
}

async function push(userId: string, before: Snapshot, after: Snapshot) {
  const client = supabase;
  if (!client) return;
  const bar = diffSets(before.owned, after.owned);
  const fav = diffSets(before.favorites, after.favorites);
  const rec = diffById(before.recipes, after.recipes);
  const ing = diffById(before.ingredients, after.ingredients);
  const jobs: PromiseLike<unknown>[] = [];
  if (bar.added.length) jobs.push(client.from('bar_items').upsert(bar.added.map((ingredient_id) => ({ user_id: userId, ingredient_id }))));
  if (bar.removed.length) jobs.push(client.from('bar_items').delete().eq('user_id', userId).in('ingredient_id', bar.removed));
  if (fav.added.length) jobs.push(client.from('favorites').upsert(fav.added.map((recipe_id) => ({ user_id: userId, recipe_id }))));
  if (fav.removed.length) jobs.push(client.from('favorites').delete().eq('user_id', userId).in('recipe_id', fav.removed));
  if (ing.upsert.length) jobs.push(client.from('custom_ingredients').upsert(ing.upsert.map((i) => ({ user_id: userId, id: i.id, name: i.name }))));
  if (ing.removed.length) jobs.push(client.from('custom_ingredients').delete().eq('user_id', userId).in('id', ing.removed));
  if (rec.upsert.length) {
    jobs.push(
      client.from('custom_recipes').upsert(
        rec.upsert.map((r) => ({ user_id: userId, id: r.id, recipe: r, updated_at: new Date().toISOString() })),
      ),
    );
  }
  if (rec.removed.length) jobs.push(client.from('custom_recipes').delete().eq('user_id', userId).in('id', rec.removed));
  const results = (await Promise.all(jobs)) as { error?: unknown }[];
  const failed = results.find((r) => r?.error);
  if (failed) throw failed.error;
}
