/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getIngredient, INGREDIENTS, setCustomIngredients } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import { formatAmount, matchAll, matchRecipe, shoppingSuggestions } from './matching';

const ids = new Set(INGREDIENTS.map((i) => i.id));
const recipe = (id: string) => RECIPES.find((r) => r.id === id)!;

test('every recipe only uses known ingredients', () => {
  for (const r of RECIPES) {
    for (const i of r.ingredients) {
      assert.ok(ids.has(i.id), `${r.id} uses unknown ${i.id}`);
      for (const alt of i.alternatives ?? []) assert.ok(ids.has(alt), `${r.id} alt ${alt}`);
    }
  }
});

test('recipe and ingredient ids are unique', () => {
  assert.equal(new Set(RECIPES.map((r) => r.id)).size, RECIPES.length);
  assert.equal(ids.size, INGREDIENTS.length);
});

test('a drink is makeable when every required ingredient is owned', () => {
  const m = matchRecipe(recipe('margarita'), new Set(['tequila', 'triple_sec', 'lime_juice']));
  assert.equal(m.canMake, true, 'salt is optional');
});

test('missing required ingredients are reported', () => {
  const m = matchRecipe(recipe('margarita'), new Set(['tequila']));
  assert.equal(m.canMake, false);
  assert.deepEqual(m.missing.map((i) => i.id), ['triple_sec', 'lime_juice']);
});

test('alternatives count: rye works in an Old Fashioned, sugar replaces simple syrup', () => {
  assert.ok(matchRecipe(recipe('old_fashioned'), new Set(['rye', 'sugar', 'angostura'])).canMake);
  assert.ok(matchRecipe(recipe('daiquiri'), new Set(['white_rum', 'lime_juice', 'sugar'])).canMake);
});

test('an empty bar can make nothing', () => {
  assert.equal(matchAll(new Set()).filter((m) => m.canMake).length, 0);
});

test('results are sorted by how few ingredients are missing', () => {
  const all = matchAll(new Set(['vodka', 'orange_juice']));
  assert.equal(all[0].recipe.id, 'screwdriver');
  for (let i = 1; i < all.length; i++) assert.ok(all[i - 1].missing.length <= all[i].missing.length);
});

test('shopping suggestions pick the ingredient that unlocks the most drinks', () => {
  const owned = new Set(['vodka', 'gin', 'white_rum', 'simple_syrup', 'soda_water']);
  const top2 = shoppingSuggestions(matchAll(owned)).slice(0, 2);
  assert.deepEqual(top2.map((s) => s.ingredientId).sort(), ['lemon_juice', 'lime_juice'], 'citrus unlocks the most');
  const lime = top2.find((s) => s.ingredientId === 'lime_juice')!.unlocks.map((r) => r.id);
  assert.ok(lime.includes('daiquiri') && lime.includes('gimlet'));
});

test('amounts format in oz and ml', () => {
  assert.equal(formatAmount({ id: 'gin', amount: 1.5, unit: 'oz' }, 'oz'), '1½ oz');
  assert.equal(formatAmount({ id: 'gin', amount: 0.75, unit: 'oz' }, 'oz'), '¾ oz');
  assert.equal(formatAmount({ id: 'gin', amount: 2, unit: 'oz' }, 'ml'), '60 ml');
  assert.equal(formatAmount({ id: 'gin', amount: 0.75, unit: 'oz' }, 'ml'), '25 ml');
  assert.equal(formatAmount({ id: 'angostura', amount: 2, unit: 'dash' }, 'oz'), '2 dashes');
});

test('every built-in recipe has an About section and at least one step', () => {
  assert.equal(RECIPES.length, 300);
  for (const r of RECIPES) {
    assert.ok(r.about && r.about.length > 40, `${r.id} has no about text`);
    assert.ok(r.steps.length > 0, `${r.id} has no steps`);
    assert.ok(r.ingredients.some((i) => !i.optional), `${r.id} has no required ingredients`);
  }
});

test('custom recipes match against custom ingredients', () => {
  setCustomIngredients([{ id: 'custom_ing_grandmas_jam', name: "Grandma's jam", category: 'Your own' }]);
  assert.equal(getIngredient('custom_ing_grandmas_jam').name, "Grandma's jam");
  const mine = {
    ...recipe('gin_tonic'),
    id: 'custom_drink_jam_fizz',
    custom: true,
    ingredients: [
      { id: 'gin', amount: 2, unit: 'oz' as const },
      { id: 'custom_ing_grandmas_jam', amount: 1, unit: 'tsp' as const },
    ],
  };
  const [m] = matchAll(new Set(['gin', 'custom_ing_grandmas_jam']), [mine]);
  assert.ok(m.canMake);
  assert.equal(matchRecipe(mine, new Set(['gin'])).missing[0].id, 'custom_ing_grandmas_jam');
});

test('a deleted custom ingredient still has a readable name', () => {
  setCustomIngredients([]);
  assert.equal(getIngredient('custom_ing_old_thing_abc').name, 'old thing');
});

test('teaspoons and slices format sensibly', () => {
  assert.equal(formatAmount({ id: 'honey', amount: 1, unit: 'tsp' }, 'oz'), '1 tsp');
  assert.equal(formatAmount({ id: 'honey', amount: 2, unit: 'tsp' }, 'ml'), '10 ml');
  assert.equal(formatAmount({ id: 'jalapeno', amount: 2, unit: 'slice' }, 'oz'), '2 slices');
});

test('scaling for a crowd multiplies measured amounts only', () => {
  assert.equal(formatAmount({ id: 'gin', amount: 1.5, unit: 'oz' }, 'oz', 4), '6 oz');
  assert.equal(formatAmount({ id: 'gin', amount: 0.75, unit: 'oz' }, 'oz', 2), '1½ oz');
  assert.equal(formatAmount({ id: 'gin', amount: 2, unit: 'oz' }, 'ml', 8), '480 ml');
  assert.equal(formatAmount({ id: 'angostura', amount: 2, unit: 'dash' }, 'oz', 4), '8 dashes');
  assert.equal(formatAmount({ id: 'mint', amount: 8, unit: 'leaves' }, 'oz', 2), '16 leaves');
  assert.equal(formatAmount({ id: 'soda_water', unit: 'top' }, 'oz', 8), 'to top');
  assert.equal(formatAmount({ id: 'salt', unit: 'pinch' }, 'oz', 8), 'a pinch');
  assert.equal(formatAmount({ id: 'lime', unit: 'wedge' }, 'oz', 4), '4 wedges');
  assert.equal(formatAmount({ id: 'orange', unit: 'peel' }, 'oz', 2), '2 twists');
});

test('share text has the ingredients, steps and scaled amounts', async () => {
  const { recipeShareText } = await import('./shareText');
  const text = recipeShareText(recipe('daiquiri'), 'oz', 2);
  assert.match(text, /Daiquiri \(for 2\)/);
  assert.match(text, /• 4 oz White rum/);
  assert.match(text, /1\. Shake everything with ice/);
  assert.match(text, /Shared from Drinks Up/);
});

test('among drinks you can make, classics are listed first', () => {
  const all = matchAll(new Set(['white_rum', 'lime_juice', 'simple_syrup', 'mint', 'soda_water', 'honey', 'cola']));
  const ready = all.filter((m) => m.canMake).map((m) => m.recipe.name);
  assert.equal(ready[0], 'Mojito');
  assert.ok(ready.indexOf('Daiquiri') < ready.indexOf('Canchánchara'));
});

test('shopping list favours classics and everyday items over specialty bottles', () => {
  const owned = new Set(['vodka', 'tequila', 'white_rum', 'triple_sec', 'simple_syrup', 'cream']);
  const list = shoppingSuggestions(matchAll(owned), 10).map((s) => s.ingredientId);
  assert.equal(list[0], 'lime_juice', 'lime unlocks Margarita and Daiquiri');
  assert.ok(list.slice(0, 5).includes('cranberry_juice'), `cranberry (Cape Codder) should be in the top 5: ${list}`);
  assert.ok(list.includes('orange_juice'), `orange juice (Screwdriver) should be suggested: ${list}`);
  const oj = list.indexOf('orange_juice');
  const coffee = list.indexOf('coffee_liqueur');
  assert.ok(coffee === -1 || oj < coffee, `orange juice should beat coffee liqueur: ${list}`);
});

test('the drinks each suggestion unlocks are listed classics first', () => {
  const owned = new Set(['white_rum', 'simple_syrup', 'mint', 'soda_water', 'tequila', 'triple_sec', 'honey']);
  const lime = shoppingSuggestions(matchAll(owned)).find((s) => s.ingredientId === 'lime_juice')!;
  assert.deepEqual(lime.unlocks.slice(0, 3).map((r) => r.name), ['Margarita', 'Mojito', 'Daiquiri']);
});

test('share text adds app store links only once they are set', async () => {
  const { recipeShareText } = await import('./shareText');
  assert.doesNotMatch(recipeShareText(recipe('mojito'), 'oz', 1, { appStore: '', googlePlay: '' }), /Get Drinks Up/);
  const text = recipeShareText(recipe('mojito'), 'oz', 1, {
    appStore: 'https://apps.apple.com/app/id123',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.drinksup.app',
  });
  assert.match(text, /Get Drinks Up:\niPhone: https:\/\/apps\.apple\.com\/app\/id123\nAndroid: https:\/\/play\.google\.com/);
});

test('shopping list share text', async () => {
  const { shoppingListText } = await import('./shareText');
  assert.equal(
    shoppingListText([{ id: 'lime_juice', checked: false }, { id: 'gin', checked: true }]),
    '🛒 Drinks Up shopping list\n\n☐ Lime juice\n✓ Gin',
  );
});

test('typed-in shopping items show their name and are never real ingredients', async () => {
  const { isListOnlyItem } = await import('../data/ingredients');
  assert.equal(getIngredient('item:Cocktail napkins').name, 'Cocktail napkins');
  assert.ok(isListOnlyItem('item:Ice'));
  assert.ok(!isListOnlyItem('lime_juice'));
  const { usageItems } = await import('./sync');
  assert.deepEqual(usageItems(['item:Ice', 'gin']), ['gin'], 'never counted in usage stats');
});
