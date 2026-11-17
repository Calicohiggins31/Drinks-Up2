import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';
import type { RatingSummary } from '../lib/ratingLabel';
import { supabase } from '../lib/supabase';

type RatingsValue = {
  /** Average and count per recipe id, for every rated drink. */
  ratings: ReadonlyMap<string, RatingSummary>;
  refresh: () => void;
};

const RatingsContext = createContext<RatingsValue>({ ratings: new Map(), refresh: () => {} });

/** Loads every drink's rating in one request, on launch and whenever the app comes back to the front. */
export function RatingsProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<ReadonlyMap<string, RatingSummary>>(new Map());

  const refresh = useCallback(() => {
    if (!supabase) return;
    supabase.rpc('all_recipe_ratings').then(
      ({ data, error }) => {
        if (error || !Array.isArray(data)) return;
        setRatings(
          new Map(
            (data as { recipe_id: string; average: number | string | null; total: number | string }[]).map((r) => [
              r.recipe_id,
              { average: r.average == null ? null : Number(r.average), total: Number(r.total) },
            ]),
          ),
        );
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', (state) => state === 'active' && refresh());
    return () => sub.remove();
  }, [refresh]);

  const value = useMemo(() => ({ ratings, refresh }), [ratings, refresh]);
  return <RatingsContext.Provider value={value}>{children}</RatingsContext.Provider>;
}

export const useRatings = () => useContext(RatingsContext);
