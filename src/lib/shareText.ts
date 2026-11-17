import { ingredientName } from '../data/ingredients';
import type { Recipe } from '../data/recipes';
import { STORE_LINKS } from '../config/storeLinks';
import { formatAmount, type UnitSystem } from './matching';

/** Plain-text recipe for sharing by message, email or notes. */
export function recipeShareText(recipe: Recipe, units: UnitSystem, servings = 1, links = STORE_LINKS): string {
  const lines = [
    `${recipe.emoji} ${recipe.name}${servings > 1 ? ` (for ${servings})` : ''}`,
    recipe.description,
    '',
    'Ingredients:',
    ...recipe.ingredients.map((i) => {
      const amount = formatAmount(i, units, servings);
      return `• ${amount ? `${amount} ` : ''}${ingredientName(i.id)}${i.optional ? ' (optional)' : ''}`;
    }),
    '',
    'Method:',
    ...recipe.steps.map((s, idx) => `${idx + 1}. ${s}`),
    '',
    `Glass: ${recipe.glass}`,
    '',
    'Shared from Drinks Up. Please drink responsibly.',
  ];
  // Once the app is in the stores, invite people to get it.
  const stores = [
    links.appStore && `iPhone: ${links.appStore}`,
    links.googlePlay && `Android: ${links.googlePlay}`,
  ].filter(Boolean) as string[];
  if (stores.length) lines.push('', 'Get Drinks Up:', ...stores);
  return lines.join('\n');
}

/** Plain-text shopping list for sharing. Bought items are ticked. */
export function shoppingListText(items: { id: string; checked: boolean }[]): string {
  return [
    '🛒 Drinks Up shopping list',
    '',
    ...items.map((i) => `${i.checked ? '✓' : '☐'} ${ingredientName(i.id)}`),
  ].join('\n');
}
