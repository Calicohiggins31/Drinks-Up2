import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { INGREDIENTS, setCustomIngredients, type Ingredient } from '../data/ingredients';
import { RECIPES, type Recipe } from '../data/recipes';
import type { UnitSystem } from '../lib/matching';

const STORAGE_KEY = 'drinksup:v1';
const BUILT_IN_INGREDIENTS = new Set(INGREDIENTS.map((i) => i.id));
const BUILT_IN_RECIPES = new Set(RECIPES.map((r) => r.id));

type Saved = {
  owned: string[];
  favorites: string[];
  units: UnitSystem;
  customIngredients?: Ingredient[];
  customRecipes?: Recipe[];
};

type BarContextValue = {
  ready: boolean;
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
  const [owned, setOwned] = useState<ReadonlySet<string>>(new Set());
  const [favorites, setFavorites] = useState<ReadonlySet<string>>(new Set());
  const [units, setUnitsState] = useState<UnitSystem>('oz');
  const [customIngredients, setCustomIngredientsState] = useState<Ingredient[]>([]);
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);

  // Keep the ingredient name lookup in sync before children render.
  useMemo(() => setCustomIngredients(customIngredients), [customIngredients]);

  // Load saved data once on launch.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw) as Partial<Saved>;
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
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  // Save whenever something changes (after the first load, so we never overwrite with empty state).
  useEffect(() => {
    if (!ready) return;
    const data: Saved = { owned: [...owned], favorites: [...favorites], units, customIngredients, customRecipes };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch(() => {});
  }, [ready, owned, favorites, units, customIngredients, customRecipes]);

  const toggleIngredient = useCallback((id: string) => {
    tap();
    setOwned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addIngredients = useCallback((ids: string[]) => {
    tap();
    setOwned((prev) => new Set([...prev, ...ids]));
  }, []);

  const clearBar = useCallback(() => setOwned(new Set()), []);

  const toggleFavorite = useCallback((id: string) => {
    tap();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

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

  const recipes = useMemo(() => [...customRecipes, ...RECIPES], [customRecipes]);
  const findRecipe = useCallback((id: string) => recipes.find((r) => r.id === id), [recipes]);

  const value = useMemo(
    () => ({
      ready, owned, favorites, units, recipes, customRecipes, customIngredients, findRecipe,
      toggleIngredient, addIngredients, clearBar, toggleFavorite, setUnits: setUnitsState,
      addCustomIngredient, deleteCustomIngredient, saveRecipe, deleteRecipe,
    }),
    [
      ready, owned, favorites, units, recipes, customRecipes, customIngredients, findRecipe,
      toggleIngredient, addIngredients, clearBar, toggleFavorite,
      addCustomIngredient, deleteCustomIngredient, saveRecipe, deleteRecipe,
    ],
  );

  return <BarContext.Provider value={value}>{children}</BarContext.Provider>;
}

export function useBar(): BarContextValue {
  const ctx = useContext(BarContext);
  if (!ctx) throw new Error('useBar must be used inside <BarProvider>');
  return ctx;
}
