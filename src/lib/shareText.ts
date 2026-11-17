import { ingredientName } from '../data/ingredients';
import type { Recipe } from '../data/recipes';
import { formatAmount, type UnitSystem } from './matching';

/** Plain-text recipe for sharing by message, email or notes. */
export function recipeShareText(recipe: Recipe, units: UnitSystem, servings = 1): string {
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
  return lines.join('\n');
}
