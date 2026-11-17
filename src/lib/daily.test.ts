/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { dailyPick, greeting, localDayKey } from './daily';

test('the pick stays the same all day and changes across days', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  assert.equal(dailyPick(items, '2026-11-17'), dailyPick(items, '2026-11-17'));
  const week = new Set(['10', '11', '12', '13', '14', '15', '16'].map((d) => dailyPick(items, `2026-11-${d}`)));
  assert.ok(week.size > 1, 'varies over a week');
  assert.equal(dailyPick([], '2026-11-17'), undefined);
});

test('day keys and greetings', () => {
  assert.equal(localDayKey(new Date(2026, 0, 5, 23, 30)), '2026-01-05');
  assert.equal(greeting(new Date(2026, 0, 5, 9)), 'Good morning');
  assert.equal(greeting(new Date(2026, 0, 5, 14)), 'Good afternoon');
  assert.equal(greeting(new Date(2026, 0, 5, 19)), 'Good evening');
  assert.equal(greeting(new Date(2026, 0, 5, 1)), 'Late night');
});
