import type { RatingSummary } from './ratingLabel';
import { supabase } from './supabase';

export { ratingLabel, type RatingSummary } from './ratingLabel';

/** Anonymous average for a drink: no names or ids come back. */
export async function fetchRatingSummary(recipeId: string): Promise<RatingSummary | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('recipe_rating', { p_recipe_id: recipeId });
  if (error) return null;
  const row = (Array.isArray(data) ? data[0] : data) as { average: number | string | null; total: number | string } | undefined;
  return { average: row?.average == null ? null : Number(row.average), total: Number(row?.total ?? 0) };
}

/** The signed-in person's own stars for a drink, or null. */
export async function fetchMyRating(userId: string, recipeId: string): Promise<number | null> {
  if (!supabase) return null;
  const { data } = await supabase.from('ratings').select('stars').eq('user_id', userId).eq('recipe_id', recipeId).maybeSingle();
  return (data?.stars as number | undefined) ?? null;
}

export async function saveMyRating(userId: string, recipeId: string, stars: number): Promise<void> {
  if (!supabase) throw new Error("Accounts aren't switched on yet.");
  const { error } = await supabase
    .from('ratings')
    .upsert({ user_id: userId, recipe_id: recipeId, stars, updated_at: new Date().toISOString() });
  if (error) throw error;
}
