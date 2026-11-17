/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getIngredient, INGREDIENTS, setCustomIngredients, STARTER_KITS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import { formatAmount, matchAll, matchRecipe, shoppingSuggestions } from './matching';

const ids = new Set(INGREDIENTS.map((i) => i.id));
const recipe = (id: string) => RECIPES.find((r) => r.id === id)!;

test('every recipe and kit only uses known ingredients', () => {
  for (const r of RECIPES) {
    for (const i of r.ingredients) {
      assert.ok(ids.has(i.id), `${r.id} uses unknown ${i.id}`);
      for (const alt of i.alternatives ?? []) assert.ok(ids.has(alt), `${r.id} alt ${alt}`);
    }
  }
  for (const k of STARTER_KITS) for (const i of k.ingredients) assert.ok(ids.has(i), `${k.id}: ${i}`);
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
  const [top] = shoppingSuggestions(matchAll(owned));
  assert.equal(top.ingredientId, 'lime_juice');
  const names = top.unlocks.map((r) => r.id);
  assert.ok(names.includes('daiquiri') && names.includes('gimlet'));
});

test('amounts format in oz and ml', () => {
  assert.equal(formatAmount({ id: 'gin', amount: 1.5, unit: 'oz' }, 'oz'), '1½ oz');
  assert.equal(formatAmount({ id: 'gin', amount: 0.75, unit: 'oz' }, 'oz'), '¾ oz');
  assert.equal(formatAmount({ id: 'gin', amount: 2, unit: 'oz' }, 'ml'), '60 ml');
  assert.equal(formatAmount({ id: 'gin', amount: 0.75, unit: 'oz' }, 'ml'), '25 ml');
  assert.equal(formatAmount({ id: 'angostura', amount: 2, unit: 'dash' }, 'oz'), '2 dashes');
});

test('every built-in recipe has an About section and at least one step', () => {
  assert.ok(RECIPES.length >= 120, `only ${RECIPES.length} recipes`);
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
