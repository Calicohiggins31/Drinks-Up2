/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { INGREDIENTS, STARTER_KITS } from '../data/ingredients';
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
