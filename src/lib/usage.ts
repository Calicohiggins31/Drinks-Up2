import { supabase } from './supabase';
import { usageItems } from './sync';

export type UsageKind = 'stocked' | 'viewed' | 'favorited';

let enabled = true;
const viewedThisSession = new Set<string>();

/** Follows the "Share anonymous usage stats" setting. */
export function setUsageEnabled(on: boolean) {
  enabled = on;
}


/**
 * Adds one to today's anonymous totals. Nothing identifying is sent: when signed in, the
 * server tags the count with the account's city/state; otherwise it is a plain total.
 * Fire-and-forget: failures are ignored and never affect the app.
 */
export function trackUsage(kind: UsageKind, ids: Iterable<string>) {
  if (!enabled || !supabase) return;
  const items = usageItems(ids);
  if (items.length === 0) return;
  supabase.rpc('bump_usage', { p_kind: kind, p_items: items }).then(
    () => {},
    () => {},
  );
}

/** Counts a drink page view at most once per app session. */
export function trackView(recipeId: string) {
  if (viewedThisSession.has(recipeId)) return;
  viewedThisSession.add(recipeId);
  trackUsage('viewed', [recipeId]);
}
