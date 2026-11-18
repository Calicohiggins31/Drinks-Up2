/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isEasy, OCCASIONS, occasionsOf } from '../data/occasions';
import { RECIPES } from '../data/recipes';

const ids = new Set(RECIPES.map((r) => r.id));
const recipe = (id: string) => RECIPES.find((r) => r.id === id)!;

test('every occasion only lists real drinks, without duplicates', () => {
  for (const o of OCCASIONS) {
    for (const id of o.ids) assert.ok(ids.has(id), `${o.id}: ${id} is not a recipe`);
    assert.equal(new Set(o.ids).size, o.ids.length, `${o.id} has duplicates`);
    assert.ok(o.ids.length >= 15, `${o.id} should have a decent choice`);
  }
});

test('occasions make sense', () => {
  assert.deepEqual(occasionsOf('mimosa').map((o) => o.id), ['brunch']);
  assert.ok(occasionsOf('hot_toddy').some((o) => o.id === 'cosy'));
  assert.ok(occasionsOf('espresso_martini').some((o) => o.id === 'after_dinner'));
});

test('easy means 3 or fewer required ingredients, garnish not counted', () => {
  assert.ok(isEasy(recipe('margarita')), 'tequila, triple sec, lime (+ optional salt)');
  assert.ok(isEasy(recipe('gin_tonic')));
  assert.ok(!isEasy(recipe('long_island')));
  assert.ok(RECIPES.filter(isEasy).length > 60, 'plenty of easy drinks');
});

test('quick setup lists real, unique ingredients', async () => {
  const { QUICK_SETUP } = await import('../data/quickSetup');
  const { INGREDIENTS } = await import('../data/ingredients');
  const known = new Set(INGREDIENTS.map((i) => i.id));
  for (const { id } of QUICK_SETUP) assert.ok(known.has(id), id);
  assert.equal(new Set(QUICK_SETUP.map((q) => q.id)).size, QUICK_SETUP.length);
});
