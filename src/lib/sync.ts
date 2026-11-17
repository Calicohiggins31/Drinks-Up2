import type { Ingredient } from '../data/ingredients';
import type { Recipe } from '../data/recipes';

/** Favourites from this phone and the account are combined, so nothing is lost on sign-in. */
export function mergeFavorites(local: Iterable<string>, remote: Iterable<string>): Set<string> {
  return new Set([...local, ...remote]);
}

/** Combines by id. The account's copy wins if the same item exists in both places. */
export function mergeById<T extends { id: string }>(local: T[], remote: T[]): T[] {
  const byId = new Map(local.map((x) => [x.id, x]));
  for (const r of remote) byId.set(r.id, r);
  return [...byId.values()];
}

export type SetDiff = { added: string[]; removed: string[] };

export function diffSets(before: ReadonlySet<string>, after: ReadonlySet<string>): SetDiff {
  return {
    added: [...after].filter((x) => !before.has(x)),
    removed: [...before].filter((x) => !after.has(x)),
  };
}

/** Items that are new or changed, and ids that were deleted, between two lists. */
export function diffById<T extends { id: string }>(before: T[], after: T[]): { upsert: T[]; removed: string[] } {
  const prev = new Map(before.map((x) => [x.id, JSON.stringify(x)]));
  const nextIds = new Set(after.map((x) => x.id));
  return {
    upsert: after.filter((x) => prev.get(x.id) !== JSON.stringify(x)),
    removed: [...prev.keys()].filter((id) => !nextIds.has(id)),
  };
}

export type CloudData = { favorites: string[]; recipes: Recipe[]; ingredients: Ingredient[] };

/** Built-in ids only (people's own recipes and ingredients are never counted), without duplicates. */
export function usageItems(ids: Iterable<string>): string[] {
  return [...new Set([...ids].filter((id) => /^[a-z0-9_]+$/.test(id) && !id.startsWith('custom_')))].slice(0, 50);
}
