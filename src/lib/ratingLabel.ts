export type RatingSummary = { average: number | null; total: number };

/** "4.3 ★ from 27 ratings", or a prompt when nobody has rated yet. */
export function ratingLabel(summary: RatingSummary | null): string {
  if (!summary || !summary.total || summary.average == null) return 'No ratings yet. Be the first!';
  return `${summary.average.toFixed(1)} ★ from ${summary.total} ${summary.total === 1 ? 'rating' : 'ratings'}`;
}

/** Compact form for drink cards, e.g. "4.6 (12)". Empty when nobody has rated yet. */
export function shortRating(summary: RatingSummary | undefined): string {
  if (!summary || !summary.total || summary.average == null) return '';
  return `${summary.average.toFixed(1)} (${summary.total})`;
}

/** Drinks averaging at least 4 stars, best first; ties go to the one with more ratings. */
export function topRatedIds(all: ReadonlyMap<string, RatingSummary>, minAverage = 4): string[] {
  return [...all.entries()]
    .filter(([, s]) => s.total > 0 && (s.average ?? 0) >= minAverage)
    .sort(([, a], [, b]) => (b.average ?? 0) - (a.average ?? 0) || b.total - a.total)
    .map(([id]) => id);
}
