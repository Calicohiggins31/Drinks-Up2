import { RECIPES, type Recipe, type RecipeIngredient, type Unit } from '../data/recipes';

export type DrinkMatch = {
  recipe: Recipe;
  /** Required ingredients you don't have (and have no alternative for). */
  missing: RecipeIngredient[];
  canMake: boolean;
};

export function hasIngredient(item: RecipeIngredient, owned: ReadonlySet<string>): boolean {
  return owned.has(item.id) || (item.alternatives ?? []).some((alt) => owned.has(alt));
}

/** Which of the user's ingredients will actually be used for this line (primary first). */
export function usedIngredient(item: RecipeIngredient, owned: ReadonlySet<string>): string | undefined {
  if (owned.has(item.id)) return item.id;
  return (item.alternatives ?? []).find((alt) => owned.has(alt));
}

export function matchRecipe(recipe: Recipe, owned: ReadonlySet<string>): DrinkMatch {
  const missing = recipe.ingredients.filter((i) => !i.optional && !hasIngredient(i, owned));
  return { recipe, missing, canMake: missing.length === 0 };
}

export function matchAll(owned: ReadonlySet<string>, recipes: Recipe[] = RECIPES): DrinkMatch[] {
  return recipes
    .map((r) => matchRecipe(r, owned))
    .sort((a, b) => a.missing.length - b.missing.length || a.recipe.name.localeCompare(b.recipe.name));
}

export type Suggestion = { ingredientId: string; unlocks: Recipe[] };

/**
 * Ingredients that would unlock the most new drinks if you bought just that one thing.
 */
export function shoppingSuggestions(matches: DrinkMatch[], limit = 5): Suggestion[] {
  const unlocks = new Map<string, Recipe[]>();
  for (const m of matches) {
    if (m.missing.length !== 1) continue;
    const id = m.missing[0].id;
    unlocks.set(id, [...(unlocks.get(id) ?? []), m.recipe]);
  }
  return [...unlocks.entries()]
    .map(([ingredientId, recipes]) => ({ ingredientId, unlocks: recipes }))
    .sort((a, b) => b.unlocks.length - a.unlocks.length || a.ingredientId.localeCompare(b.ingredientId))
    .slice(0, limit);
}

export type UnitSystem = 'oz' | 'ml';

function trimNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

const FRACTIONS: Record<string, string> = { '0.25': '¼', '0.5': '½', '0.75': '¾' };

function ozText(n: number): string {
  const whole = Math.floor(n);
  const frac = FRACTIONS[trimNumber(n - whole)];
  if (!frac) return trimNumber(n);
  return whole === 0 ? frac : `${whole}${frac}`;
}

export function formatAmount(item: RecipeIngredient, system: UnitSystem): string {
  const n = item.amount;
  const plural = (word: string) => (n && n !== 1 ? `${word}s` : word);
  const unit: Unit = item.unit;
  switch (unit) {
    case 'oz':
      if (n == null) return '';
      return system === 'ml' ? `${Math.round((n * 30) / 5) * 5} ml` : `${ozText(n)} oz`;
    case 'tsp':
      return system === 'ml' && n ? `${Math.round(n * 5)} ml` : `${n ?? 1} tsp`;
    case 'slice':
      return n ? `${n} ${plural('slice')}` : 'a few slices';
    case 'dash':
      return `${n ?? 1} ${n && n !== 1 ? 'dashes' : 'dash'}`;
    case 'leaves':
      return n ? `${n} leaves` : 'a few leaves';
    case 'cube':
      return `${n ?? 1} ${plural('cube')}`;
    case 'top':
      return 'to top';
    case 'pinch':
      return 'a pinch';
    case 'wedge':
      return n ? `${n} ${plural('wedge')}` : 'a wedge';
    case 'peel':
      return 'a twist';
    case 'whole':
      return n ? `${n}` : '1';
  }
}
