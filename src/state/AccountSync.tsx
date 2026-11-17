import { useEffect, useRef } from 'react';
import type { Ingredient } from '../data/ingredients';
import type { Recipe } from '../data/recipes';
import { supabase } from '../lib/supabase';
import { diffById, diffSets, mergeById, mergeFavorites } from '../lib/sync';
import { useAuth } from './AuthContext';
import { useBar } from './BarContext';

type Snapshot = { favorites: Set<string>; recipes: Recipe[]; ingredients: Ingredient[] };

const stripRecipe = ({ custom: _c, ...r }: Recipe) => r as Recipe;
const stripIngredient = (i: Ingredient) => ({ id: i.id, name: i.name, category: i.category });

/**
 * Keeps favourites and the user's own recipes in step with their account.
 * On sign-in, phone and account data are merged (nothing is lost); after that, every change is uploaded.
 * Renders nothing.
 */
export function AccountSync() {
  const { userId } = useAuth();
  const bar = useBar();
  const synced = useRef<Snapshot | null>(null);
  const prevUser = useRef<string | null>(null);

  // First sync after signing in.
  useEffect(() => {
    const client = supabase;
    if (!client || !bar.ready) return;
    if (!userId) {
      // Signed out: the user's own recipes belong to the account, so remove them from this phone.
      if (prevUser.current) bar.replaceCustom([], []);
      prevUser.current = null;
      synced.current = null;
      return;
    }
    if (prevUser.current === userId) return;
    prevUser.current = userId;
    let cancelled = false;

    (async () => {
      const [fav, rec, ing] = await Promise.all([
        client.from('favorites').select('recipe_id'),
        client.from('custom_recipes').select('recipe'),
        client.from('custom_ingredients').select('id, name'),
      ]);
      if (cancelled || fav.error || rec.error || ing.error) {
        console.warn('Account sync failed', fav.error ?? rec.error ?? ing.error);
        prevUser.current = null; // try again next time
        return;
      }
      const remoteFav = (fav.data ?? []).map((r) => r.recipe_id as string);
      const remoteRec = (rec.data ?? []).map((r) => r.recipe as Recipe);
      const remoteIng = (ing.data ?? []).map((r) => ({ id: r.id as string, name: r.name as string, category: 'Your own' as const }));

      const favorites = mergeFavorites(bar.favorites, remoteFav);
      const recipes = mergeById(bar.customRecipes.map(stripRecipe), remoteRec);
      const ingredients = mergeById(bar.customIngredients.map(stripIngredient), remoteIng);

      // Upload anything that was only on this phone.
      await push(userId, { favorites: new Set(remoteFav), recipes: remoteRec, ingredients: remoteIng }, { favorites, recipes, ingredients });
      if (cancelled) return;
      synced.current = { favorites, recipes, ingredients };
      bar.replaceFavorites(favorites);
      bar.replaceCustom(recipes, ingredients);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, bar.ready]);

  // Upload later changes.
  useEffect(() => {
    if (!userId || !synced.current) return;
    const next: Snapshot = {
      favorites: new Set(bar.favorites),
      recipes: bar.customRecipes.map(stripRecipe),
      ingredients: bar.customIngredients.map(stripIngredient),
    };
    const before = synced.current;
    synced.current = next;
    push(userId, before, next).catch((e) => console.warn('Account sync failed', e));
  }, [userId, bar.favorites, bar.customRecipes, bar.customIngredients]);

  return null;
}

async function push(userId: string, before: Snapshot, after: Snapshot) {
  const client = supabase;
  if (!client) return;
  const fav = diffSets(before.favorites, after.favorites);
  const rec = diffById(before.recipes, after.recipes);
  const ing = diffById(before.ingredients, after.ingredients);
  const jobs: PromiseLike<unknown>[] = [];
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
