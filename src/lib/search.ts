import { byFame } from '../data/classics';
import { ingredientName } from '../data/ingredients';
import type { Recipe } from '../data/recipes';

/** Lowercases and strips accents, so "pina" finds "Piña" and "elysees" finds "Élysées". */
export function fold(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/**
 * Drinks matching every word typed, best matches first:
 * name starts with the words, then name contains them, then ingredients, then descriptions.
 * Ties go to the classics, so well-known drinks come first.
 */
export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [...recipes].sort(byFame);

  const scored: { recipe: Recipe; score: number }[] = [];
  for (const recipe of recipes) {
    const name = fold(recipe.name);
    const ingredients = fold(
      recipe.ingredients.flatMap((i) => [ingredientName(i.id), ...(i.alternatives ?? []).map(ingredientName)]).join(' '),
    );
    const text = fold(`${recipe.description} ${recipe.about ?? ''} ${recipe.glass} ${recipe.method}`);
    let score = 0;
    let all = true;
    for (const w of words) {
      if (name.startsWith(w) || name.includes(` ${w}`)) score += 4;
      else if (name.includes(w)) score += 3;
      else if (ingredients.includes(w)) score += 2;
      else if (text.includes(w)) score += 1;
      else {
        all = false;
        break;
      }
    }
    if (all) scored.push({ recipe, score });
  }
  return scored
    .sort((a, b) => b.score - a.score || byFame(a.recipe, b.recipe))
    .map((s) => s.recipe);
}
