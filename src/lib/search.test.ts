/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { RECIPES } from '../data/recipes';
import { searchRecipes } from './search';

const names = (q: string) => searchRecipes(RECIPES, q).map((r) => r.name);

test('an empty search lists every drink A to Z', () => {
  const all = names('');
  assert.equal(all.length, RECIPES.length);
  assert.deepEqual(all, [...all].sort((a, b) => a.localeCompare(b)));
});

test('accents and capitals do not matter', () => {
  assert.equal(names('pina')[0], 'Piña Colada');
  assert.ok(names('ELYSEES').includes('Champs-Élysées'));
});

test('name matches rank above ingredient matches', () => {
  const r = names('margarita');
  assert.ok(r.slice(0, 4).every((n) => n.toLowerCase().includes('margarita')), r.slice(0, 4).join());
});

test('ingredients are searchable, including swaps', () => {
  assert.ok(names('pineapple').includes('Painkiller'));
  assert.ok(names('rye').includes('Old Fashioned'), 'rye is an alternative in an Old Fashioned');
});

test('every word must match', () => {
  const r = names('gin lime');
  assert.ok(r.includes('Gimlet'));
  assert.ok(!r.includes('Negroni'));
  assert.deepEqual(names('zzzz'), []);
});
