import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { INGREDIENTS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import type { UnitSystem } from '../lib/matching';

const STORAGE_KEY = 'drinksup:v1';
const KNOWN_INGREDIENTS = new Set(INGREDIENTS.map((i) => i.id));
const KNOWN_RECIPES = new Set(RECIPES.map((r) => r.id));

type Saved = { owned: string[]; favorites: string[]; units: UnitSystem };

type BarContextValue = {
  ready: boolean;
  owned: ReadonlySet<string>;
  favorites: ReadonlySet<string>;
  units: UnitSystem;
  toggleIngredient: (id: string) => void;
  addIngredients: (ids: string[]) => void;
  clearBar: () => void;
  toggleFavorite: (id: string) => void;
  setUnits: (units: UnitSystem) => void;
};

const BarContext = createContext<BarContextValue | null>(null);

function tap() {
  if (Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {});
}

export function BarProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [owned, setOwned] = useState<ReadonlySet<string>>(new Set());
  const [favorites, setFavorites] = useState<ReadonlySet<string>>(new Set());
  const [units, setUnitsState] = useState<UnitSystem>('oz');

  // Load saved bar once on launch.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw) as Partial<Saved>;
        // Drop ids that no longer exist so old saves can't break matching.
        setOwned(new Set((saved.owned ?? []).filter((id) => KNOWN_INGREDIENTS.has(id))));
        setFavorites(new Set((saved.favorites ?? []).filter((id) => KNOWN_RECIPES.has(id))));
        if (saved.units === 'ml' || saved.units === 'oz') setUnitsState(saved.units);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  // Save whenever something changes (after the first load, so we never overwrite with empty state).
  useEffect(() => {
    if (!ready) return;
    const data: Saved = { owned: [...owned], favorites: [...favorites], units };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch(() => {});
  }, [ready, owned, favorites, units]);

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

  const value = useMemo(
    () => ({
      ready, owned, favorites, units,
      toggleIngredient, addIngredients, clearBar, toggleFavorite, setUnits: setUnitsState,
    }),
    [ready, owned, favorites, units, toggleIngredient, addIngredients, clearBar, toggleFavorite],
  );

  return <BarContext.Provider value={value}>{children}</BarContext.Provider>;
}

export function useBar(): BarContextValue {
  const ctx = useContext(BarContext);
  if (!ctx) throw new Error('useBar must be used inside <BarProvider>');
  return ctx;
}
