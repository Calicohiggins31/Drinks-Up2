/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pickRandom } from './pick';

test('picks nothing from an empty list', () => assert.equal(pickRandom([]), undefined));

test('never repeats the last pick when there is another option', () => {
  for (let i = 0; i < 200; i++) assert.notEqual(pickRandom(['a', 'b', 'c'], 'b'), 'b');
});

test('with one drink, that drink is picked even if it was last', () => {
  assert.equal(pickRandom(['only'], 'only'), 'only');
});

test('every option can come up', () => {
  const seen = new Set([0, 0.34, 0.67, 0.999].map((r) => pickRandom(['a', 'b', 'c'], undefined, () => r)));
  assert.deepEqual([...seen].sort(), ['a', 'b', 'c']);
});

test('picks favour classics but can still pick anything', async () => {
  const { pickDrinkId } = await import('./pickDrink');
  const ids = ['margarita', 'air_mail', 'army_navy'];
  assert.equal(pickDrinkId(ids, undefined, () => 0.1), 'margarita', 'low roll: from the classics');
  assert.notEqual(pickDrinkId(ids, undefined, () => 0.9), 'margarita', 'high roll: from the whole list');
  assert.equal(pickDrinkId([], undefined), undefined);
});
