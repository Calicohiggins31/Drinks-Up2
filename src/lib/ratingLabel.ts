export type RatingSummary = { average: number | null; total: number };

/** "4.3 ★ from 27 ratings", or a prompt when nobody has rated yet. */
export function ratingLabel(summary: RatingSummary | null): string {
  if (!summary || !summary.total || summary.average == null) return 'No ratings yet. Be the first!';
  return `${summary.average.toFixed(1)} ★ from ${summary.total} ${summary.total === 1 ? 'rating' : 'ratings'}`;
}
