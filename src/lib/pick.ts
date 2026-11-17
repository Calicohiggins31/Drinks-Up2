/** Picks one item at random, avoiding the previous pick when there is another choice. */
export function pickRandom<T>(items: T[], previous?: T, random: () => number = Math.random): T | undefined {
  const pool = items.length > 1 && previous !== undefined ? items.filter((x) => x !== previous) : items;
  if (pool.length === 0) return undefined;
  return pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
}
