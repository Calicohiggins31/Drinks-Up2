import type { Recipe } from '../data/recipes';

export type BaseId = 'vodka' | 'gin' | 'rum' | 'agave' | 'whiskey' | 'brandy' | 'wine' | 'liqueur' | 'mocktail';

/** Display order for the Mix screen. */
export const BASES: { id: BaseId; label: string; emoji: string }[] = [
  { id: 'vodka', label: 'Vodka', emoji: '🍸' },
  { id: 'gin', label: 'Gin', emoji: '🌿' },
  { id: 'rum', label: 'Rum & cachaça', emoji: '🏝️' },
  { id: 'agave', label: 'Tequila & mezcal', emoji: '🌵' },
  { id: 'whiskey', label: 'Whiskey', emoji: '🥃' },
  { id: 'brandy', label: 'Brandy & pisco', emoji: '🍇' },
  { id: 'wine', label: 'Wine, bubbles & beer', emoji: '🥂' },
  { id: 'liqueur', label: 'Liqueurs & aperitivos', emoji: '🍊' },
  { id: 'mocktail', label: 'Mocktails', emoji: '🧃' },
];

const SPIRIT_BASE: Record<string, BaseId> = {
  vodka: 'vodka',
  gin: 'gin',
  white_rum: 'rum', dark_rum: 'rum', spiced_rum: 'rum', coconut_rum: 'rum', cachaca: 'rum',
  tequila: 'agave', mezcal: 'agave',
  bourbon: 'whiskey', rye: 'whiskey', scotch: 'whiskey', irish_whiskey: 'whiskey',
  cognac: 'brandy', pisco: 'brandy',
  absinthe: 'liqueur',
};
const WINE = new Set(['sparkling_wine', 'red_wine', 'white_wine', 'beer', 'lillet_blanc']);

const ozOf = (amount: number | undefined, unit: string) => (unit === 'oz' ? amount ?? 0 : 0);

/**
 * The spirit a drink is built on: the largest required spirit pour.
 * Wine or beer wins only when it clearly dominates (a splash of brandy doesn't make Sangria a brandy drink).
 */
export function baseOf(recipe: Recipe): BaseId {
  if (recipe.strength === 'None') return 'mocktail';
  const required = recipe.ingredients.filter((i) => !i.optional);

  let spirit: { base: BaseId; oz: number } | null = null;
  let wineOz = 0;
  for (const i of required) {
    const oz = ozOf(i.amount, i.unit);
    const base = SPIRIT_BASE[i.id];
    if (base && (!spirit || oz > spirit.oz)) spirit = { base, oz };
    if (WINE.has(i.id)) wineOz = Math.max(wineOz, i.unit === 'top' ? 4 : oz);
  }
  if (spirit && !(wineOz > 0 && spirit.oz < wineOz / 4)) return spirit.base;
  if (wineOz > 0) return 'wine';
  return 'liqueur';
}

/** Groups items by base in display order, skipping empty groups. */
export function groupByBase<T>(items: T[], recipeOf: (item: T) => Recipe) {
  const groups = new Map<BaseId, T[]>();
  for (const item of items) {
    const b = baseOf(recipeOf(item));
    groups.set(b, [...(groups.get(b) ?? []), item]);
  }
  return BASES.filter((b) => groups.has(b.id)).map((b) => ({ ...b, items: groups.get(b.id)! }));
}
