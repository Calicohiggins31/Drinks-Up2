import { byFame, isClassic } from '../data/classics';
import { getIngredient, type IngredientCategory } from '../data/ingredients';
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
    .sort((a, b) => a.missing.length - b.missing.length || byFame(a.recipe, b.recipe));
}

export type Suggestion = { ingredientId: string; unlocks: Recipe[] };

/** How much a newly unlocked drink is worth: classics count three times as much. */
const drinkWeight = (r: Recipe) => (isClassic(r.id) ? 3 : 1);

/** Everyday grocery items are easier to pick up than specialty bottles, so they rank higher. */
const EASE: Partial<Record<IngredientCategory, number>> = {
  Juices: 1.5,
  Mixers: 1.5,
  'Syrups & Sweeteners': 1.5,
  'Fresh & Pantry': 1.5,
  Spirits: 1,
  Bitters: 0.8,
  'Liqueurs & Wine': 0.6,
};

/** Ranking score for buying one ingredient (exported for tests). */
export function suggestionScore(ingredientId: string, unlocks: Recipe[]): number {
  const ease = EASE[getIngredient(ingredientId).category] ?? 1;
  return unlocks.reduce((sum, r) => sum + drinkWeight(r), 0) * ease;
}

/**
 * The single purchases that unlock the best new drinks: classics count most,
 * and everyday items (juice, mixers, fruit) beat specialty bottles.
 */
export function shoppingSuggestions(matches: DrinkMatch[], limit = 5): Suggestion[] {
  const unlocks = new Map<string, Recipe[]>();
  for (const m of matches) {
    if (m.missing.length !== 1) continue;
    const id = m.missing[0].id;
    unlocks.set(id, [...(unlocks.get(id) ?? []), m.recipe]);
  }
  return [...unlocks.entries()]
    .map(([ingredientId, recipes]) => ({
      ingredientId,
      unlocks: [...recipes].sort(byFame),
      score: suggestionScore(ingredientId, recipes),
    }))
    .sort((a, b) => b.score - a.score || b.unlocks.length - a.unlocks.length || a.ingredientId.localeCompare(b.ingredientId))
    .slice(0, limit)
    .map(({ ingredientId, unlocks: u }) => ({ ingredientId, unlocks: u }));
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

/** Servings options for "scale for a crowd". */
export const SERVING_OPTIONS = [1, 2, 4, 8] as const;

/**
 * Human-readable amount, multiplied for the number of servings.
 * Garnish-style amounts ("to top", "a pinch", "a twist") stay as they are.
 */
export function formatAmount(item: RecipeIngredient, system: UnitSystem, servings = 1): string {
  const n = item.amount == null ? undefined : item.amount * servings;
  const count = (fallback = 1) => n ?? fallback * servings;
  const plural = (word: string, c: number) => (c !== 1 ? `${word}s` : word);
  const unit: Unit = item.unit;
  switch (unit) {
    case 'oz':
      if (n == null) return '';
      return system === 'ml' ? `${Math.round((n * 30) / 5) * 5} ml` : `${ozText(n)} oz`;
    case 'tsp':
      return system === 'ml' ? `${Math.round(count() * 5)} ml` : `${trimNumber(count())} tsp`;
    case 'slice':
      return n ? `${trimNumber(n)} ${plural('slice', n)}` : 'a few slices';
    case 'dash':
      return `${trimNumber(count())} ${count() !== 1 ? 'dashes' : 'dash'}`;
    case 'leaves':
      return n ? `${trimNumber(n)} leaves` : 'a few leaves';
    case 'cube':
      return `${trimNumber(count())} ${plural('cube', count())}`;
    case 'top':
      return 'to top';
    case 'pinch':
      return 'a pinch';
    case 'wedge':
      return n || servings > 1 ? `${trimNumber(count())} ${plural('wedge', count())}` : 'a wedge';
    case 'peel':
      return servings > 1 ? `${servings} twists` : 'a twist';
    case 'whole':
      return `${trimNumber(count())}`;
  }
}
