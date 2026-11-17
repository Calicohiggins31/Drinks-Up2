/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { RECIPES } from '../data/recipes';
import { baseOf, BASES, groupByBase } from './base';

const base = (id: string) => baseOf(RECIPES.find((r) => r.id === id)!);

test('drinks land under their main spirit', () => {
  assert.equal(base('margarita'), 'agave');
  assert.equal(base('mezcal_negroni'), 'agave');
  assert.equal(base('old_fashioned'), 'whiskey');
  assert.equal(base('caipirinha'), 'rum');
  assert.equal(base('pisco_sour'), 'brandy');
  assert.equal(base('moscow_mule'), 'vodka');
  assert.equal(base('negroni'), 'gin');
});

test('wine and bubbles only win when they clearly dominate', () => {
  assert.equal(base('sangria'), 'wine', 'a splash of brandy does not make it a brandy drink');
  assert.equal(base('mimosa'), 'wine');
  assert.equal(base('michelada'), 'wine');
  assert.equal(base('french_75'), 'gin');
  assert.equal(base('new_york_sour'), 'whiskey');
});

test('mocktails and liqueur-only drinks get their own groups', () => {
  assert.equal(base('virgin_mojito'), 'mocktail');
  assert.equal(base('b52'), 'liqueur');
  assert.equal(base('garibaldi'), 'liqueur');
});

test('every recipe is grouped, in display order', () => {
  const groups = groupByBase(RECIPES, (r) => r);
  assert.equal(groups.reduce((n, g) => n + g.items.length, 0), RECIPES.length);
  const order = BASES.map((b) => b.id);
  assert.deepEqual(groups.map((g) => g.id), order.filter((id) => groups.some((g) => g.id === id)));
});
