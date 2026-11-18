import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { INGREDIENTS, setCustomIngredients, type Ingredient } from '../data/ingredients';
import { RECIPES, type Recipe } from '../data/recipes';
import type { UnitSystem } from '../lib/matching';
import { setUsageEnabled, trackUsage } from '../lib/usage';

const STORAGE_KEY = 'drinksup:v1';
const BUILT_IN_INGREDIENTS = new Set(INGREDIENTS.map((i) => i.id));
const BUILT_IN_RECIPES = new Set(RECIPES.map((r) => r.id));

export type AgeStatus = 'unknown' | 'verified' | 'denied';

type Saved = {
  ageGate?: AgeStatus;
  owned: string[];
  favorites: string[];
  units: UnitSystem;
  customIngredients?: Ingredient[];
  customRecipes?: Recipe[];
  backupPromptDismissed?: boolean;
  shareUsageStats?: boolean;
  notes?: Record<string, string>;
  shopping?: ShoppingItem[];
  setupDone?: boolean;
};

/** One line on the shopping list. `checked` means bought. */
export type ShoppingItem = { id: string; checked: boolean };

type BarContextValue = {
  ready: boolean;
  ageStatus: AgeStatus;
  setAgeStatus: (status: AgeStatus) => void;
  owned: ReadonlySet<string>;
  favorites: ReadonlySet<string>;
  units: UnitSystem;
  /** Built-in recipes plus the user's own. */
  recipes: Recipe[];
  customRecipes: Recipe[];
  customIngredients: Ingredient[];
  findRecipe: (id: string) => Recipe | undefined;
  toggleIngredient: (id: string) => void;
  addIngredients: (ids: string[]) => void;
  clearBar: () => void;
  toggleFavorite: (id: string) => void;
  setUnits: (units: UnitSystem) => void;
  /** Adds (or finds) one of the user's own ingredients and returns its id. */
  addCustomIngredient: (name: string) => string;
  deleteCustomIngredient: (id: string) => void;
  saveRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  /** Used by account sync to replace local data with the merged copy. */
  replaceFavorites: (ids: Iterable<string>) => void;
  replaceCustom: (recipes: Recipe[], ingredients: Ingredient[]) => void;
  backupPromptDismissed: boolean;
  dismissBackupPrompt: () => void;
  replaceOwned: (ids: Iterable<string>) => void;
  /** "Share anonymous usage stats" setting (on by default). */
  shareUsageStats: boolean;
  setShareUsageStats: (on: boolean) => void;
  /** Private tasting notes by recipe id. */
  notes: Readonly<Record<string, string>>;
  setNote: (recipeId: string, text: string) => void;
  replaceNotes: (notes: Record<string, string>) => void;
  shopping: ShoppingItem[];
  addToShopping: (ids: string[]) => void;
  toggleShoppingChecked: (id: string) => void;
  removeFromShopping: (id: string) => void;
  /** Adds every ticked item to My Bar and takes it off the list. Returns how many moved. */
  moveCheckedToBar: () => number;
  clearShopping: () => void;
  replaceShopping: (items: ShoppingItem[]) => void;
  /** True once the first-launch quick setup was finished or skipped. */
  setupDone: boolean;
  completeSetup: (ids: string[]) => void;
};

const BarContext = createContext<BarContextValue | null>(null);

function tap() {
  if (Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {});
}

export function makeId(prefix: string, name: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 24) || 'item';
  return `custom_${prefix}${slug}_${Date.now().toString(36)}`;
}

function isValidRecipe(r: unknown): r is Recipe {
  const x = r as Recipe;
  return !!x && typeof x.id === 'string' && typeof x.name === 'string' && Array.isArray(x.ingredients) && Array.isArray(x.steps);
}

export function BarProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [ageStatus, setAgeStatus] = useState<AgeStatus>('unknown');
  const [owned, setOwned] = useState<ReadonlySet<string>>(new Set());
  const [favorites, setFavorites] = useState<ReadonlySet<string>>(new Set());
  const [units, setUnitsState] = useState<UnitSystem>('oz');
  const [customIngredients, setCustomIngredientsState] = useState<Ingredient[]>([]);
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);
  const [backupPromptDismissed, setBackupPromptDismissed] = useState(false);
  const [shareUsageStats, setShareUsageStats] = useState(true);
  const [notes, setNotes] = useState<Readonly<Record<string, string>>>({});
  const [shopping, setShopping] = useState<ShoppingItem[]>([]);
  const [setupDone, setSetupDone] = useState(false);
  useMemo(() => setUsageEnabled(shareUsageStats), [shareUsageStats]);

  // Keep the ingredient name lookup in sync before children render.
  useMemo(() => setCustomIngredients(customIngredients), [customIngredients]);

  // Load saved data once on launch.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw) as Partial<Saved>;
        if (saved.ageGate === 'verified' || saved.ageGate === 'denied') setAgeStatus(saved.ageGate);
        const ingredients = (saved.customIngredients ?? []).filter(
          (i) => i && typeof i.id === 'string' && typeof i.name === 'string',
        );
        const recipes = (saved.customRecipes ?? []).filter(isValidRecipe).map((r) => ({ ...r, custom: true }));
        const knownIngredients = new Set([...BUILT_IN_INGREDIENTS, ...ingredients.map((i) => i.id)]);
        const knownRecipes = new Set([...BUILT_IN_RECIPES, ...recipes.map((r) => r.id)]);
        setCustomIngredientsState(ingredients.map((i) => ({ ...i, category: 'Your own' })));
        setCustomRecipes(recipes);
        // Drop ids that no longer exist so old saves can't break matching.
        setOwned(new Set((saved.owned ?? []).filter((id) => knownIngredients.has(id))));
        setFavorites(new Set((saved.favorites ?? []).filter((id) => knownRecipes.has(id))));
        if (saved.units === 'ml' || saved.units === 'oz') setUnitsState(saved.units);
        setBackupPromptDismissed(!!saved.backupPromptDismissed);
        if (saved.shareUsageStats === false) setShareUsageStats(false);
        // People who used the app before quick setup existed already have a bar; don't show it to them.
        setSetupDone(!!saved.setupDone || (saved.owned ?? []).length > 0);
        if (Array.isArray(saved.shopping)) {
          setShopping(saved.shopping.filter((i) => i && typeof i.id === 'string').map((i) => ({ id: i.id, checked: !!i.checked })));
        }
        if (saved.notes && typeof saved.notes === 'object') {
          setNotes(Object.fromEntries(Object.entries(saved.notes).filter(([, v]) => typeof v === 'string' && v.trim())));
        }
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  // Save whenever something changes (after the first load, so we never overwrite with empty state).
  useEffect(() => {
    if (!ready) return;
    const data: Saved = { ageGate: ageStatus, owned: [...owned], favorites: [...favorites], units, customIngredients, customRecipes, backupPromptDismissed, shareUsageStats, notes, shopping, setupDone };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch(() => {});
  }, [ready, ageStatus, owned, favorites, units, customIngredients, customRecipes, backupPromptDismissed, shareUsageStats, notes, shopping, setupDone]);

  const toggleIngredient = useCallback((id: string) => {
    tap();
    if (!owned.has(id)) trackUsage('stocked', [id]);
    setOwned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [owned]);

  const addIngredients = useCallback(
    (ids: string[]) => {
      tap();
      trackUsage('stocked', ids.filter((id) => !owned.has(id)));
      setOwned((prev) => new Set([...prev, ...ids]));
    },
    [owned],
  );

  const clearBar = useCallback(() => setOwned(new Set()), []);

  const toggleFavorite = useCallback((id: string) => {
    tap();
    if (!favorites.has(id)) trackUsage('favorited', [id]);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [favorites]);

  const addCustomIngredient = useCallback(
    (rawName: string) => {
      const name = rawName.trim();
      const lower = name.toLowerCase();
      const existing = [...INGREDIENTS, ...customIngredients].find((i) => i.name.toLowerCase() === lower);
      if (existing) return existing.id;
      const ingredient: Ingredient = { id: makeId('ing_', name), name, category: 'Your own' };
      setCustomIngredients([...customIngredients, ingredient]); // make the name available immediately
      setCustomIngredientsState((prev) => [...prev, ingredient]);
      return ingredient.id;
    },
    [customIngredients],
  );

  const deleteCustomIngredient = useCallback((id: string) => {
    setCustomIngredientsState((prev) => prev.filter((i) => i.id !== id));
    setOwned((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const saveRecipe = useCallback((recipe: Recipe) => {
    const r = { ...recipe, custom: true };
    setCustomRecipes((prev) => (prev.some((p) => p.id === r.id) ? prev.map((p) => (p.id === r.id ? r : p)) : [...prev, r]));
  }, []);

  const deleteRecipe = useCallback((id: string) => {
    setCustomRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const setNote = useCallback((recipeId: string, text: string) => {
    setNotes((prev) => {
      const next = { ...prev };
      const clean = text.slice(0, 2000);
      if (clean.trim()) next[recipeId] = clean;
      else delete next[recipeId];
      return next;
    });
  }, []);
  const addToShopping = useCallback((ids: string[]) => {
    tap();
    setShopping((prev) => {
      const have = new Set(prev.map((i) => i.id));
      return [...prev, ...ids.filter((id) => !have.has(id)).map((id) => ({ id, checked: false }))];
    });
  }, []);
  const toggleShoppingChecked = useCallback((id: string) => {
    tap();
    setShopping((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  }, []);
  const removeFromShopping = useCallback((id: string) => setShopping((prev) => prev.filter((i) => i.id !== id)), []);
  const clearShopping = useCallback(() => setShopping([]), []);
  const replaceShopping = useCallback((items: ShoppingItem[]) => setShopping(items.map((i) => ({ ...i }))), []);
  const moveCheckedToBar = useCallback(() => {
    const bought = shopping.filter((i) => i.checked).map((i) => i.id);
    if (bought.length === 0) return 0;
    trackUsage('stocked', bought.filter((id) => !owned.has(id)));
    setOwned((prev) => new Set([...prev, ...bought]));
    setShopping((prev) => prev.filter((i) => !i.checked));
    return bought.length;
  }, [shopping, owned]);

  const completeSetup = useCallback(
    (ids: string[]) => {
      trackUsage('stocked', ids.filter((id) => !owned.has(id)));
      setOwned((prev) => new Set([...prev, ...ids]));
      setSetupDone(true);
    },
    [owned],
  );

  const replaceNotes = useCallback((next: Record<string, string>) => setNotes({ ...next }), []);

  const replaceOwned = useCallback((ids: Iterable<string>) => setOwned(new Set(ids)), []);

  const replaceFavorites = useCallback((ids: Iterable<string>) => setFavorites(new Set(ids)), []);

  const replaceCustom = useCallback((nextRecipes: Recipe[], nextIngredients: Ingredient[]) => {
    const ingredients = nextIngredients.map((i) => ({ ...i, category: 'Your own' as const }));
    setCustomIngredients(ingredients);
    setCustomIngredientsState(ingredients);
    setCustomRecipes(nextRecipes.filter(isValidRecipe).map((r) => ({ ...r, custom: true })));
  }, []);

  const dismissBackupPrompt = useCallback(() => setBackupPromptDismissed(true), []);

  const recipes = useMemo(() => [...customRecipes, ...RECIPES], [customRecipes]);
  const findRecipe = useCallback((id: string) => recipes.find((r) => r.id === id), [recipes]);

  const value = useMemo(
    () => ({
      ready, ageStatus, setAgeStatus, owned, favorites, units, recipes, customRecipes, customIngredients, findRecipe,
      toggleIngredient, addIngredients, clearBar, toggleFavorite, setUnits: setUnitsState,
      addCustomIngredient, deleteCustomIngredient, saveRecipe, deleteRecipe,
      replaceFavorites, replaceCustom, backupPromptDismissed, dismissBackupPrompt,
      replaceOwned, shareUsageStats, setShareUsageStats, notes, setNote, replaceNotes,
      shopping, addToShopping, toggleShoppingChecked, removeFromShopping, moveCheckedToBar, clearShopping, replaceShopping,
      setupDone, completeSetup,
    }),
    [
      ready, ageStatus, setAgeStatus, owned, favorites, units, recipes, customRecipes, customIngredients, findRecipe,
      toggleIngredient, addIngredients, clearBar, toggleFavorite,
      addCustomIngredient, deleteCustomIngredient, saveRecipe, deleteRecipe,
      replaceFavorites, replaceCustom, backupPromptDismissed, dismissBackupPrompt,
      replaceOwned, shareUsageStats, notes, setNote, replaceNotes,
      shopping, addToShopping, toggleShoppingChecked, removeFromShopping, moveCheckedToBar, clearShopping, replaceShopping,
      setupDone, completeSetup,
    ],
  );

  return <BarContext.Provider value={value}>{children}</BarContext.Provider>;
}

export function useBar(): BarContextValue {
  const ctx = useContext(BarContext);
  if (!ctx) throw new Error('useBar must be used inside <BarProvider>');
  return ctx;
}
