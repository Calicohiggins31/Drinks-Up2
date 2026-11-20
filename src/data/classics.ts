/**
 * Drinks most people have heard of, roughly most famous first.
 * These are shown before lesser-known drinks everywhere in the app.
 */
export const CLASSICS: string[] = [
  'margarita', 'old_fashioned', 'mojito', 'pina_colada', 'mai_tai', 'cosmopolitan', 'martini', 'manhattan',
  'daiquiri', 'negroni', 'moscow_mule', 'long_island', 'bloody_mary', 'gin_tonic', 'whiskey_sour',
  'espresso_martini', 'aperol_spritz', 'mimosa', 'tequila_sunrise', 'white_russian', 'cuba_libre', 'paloma',
  'screwdriver', 'sex_on_the_beach', 'strawberry_daiquiri', 'irish_coffee', 'mint_julep', 'tom_collins',
  'french_75', 'lemon_drop', 'dirty_martini', 'spicy_margarita', 'sangria', 'bellini', 'hot_toddy',
  'black_russian', 'dark_stormy', 'gimlet', 'amaretto_sour', 'mudslide', 'blue_lagoon', 'sidecar',
  'sazerac', 'kamikaze', 'sea_breeze', 'cape_codder', 'hurricane', 'rum_punch', 'painkiller', 'caipirinha',
  'fuzzy_navel', 'greyhound', 'salty_dog', 'eggnog', 'mulled_wine', 'michelada', 'whiskey_ginger', 'b52',
  'grasshopper', 'boulevardier', 'pisco_sour',
  'vodka_tonic', 'vodka_soda', 'frozen_margarita', 'strawberry_margarita', 'whiskey_cola', 'appletini',
  'dirty_shirley', 'vodka_martini', 'orange_crush', 'mexican_mule', 'irish_mule',
  // Mocktails everyone knows
  'shirley_temple', 'virgin_mojito', 'arnold_palmer', 'virgin_mary', 'virgin_colada', 'roy_rogers', 'virgin_margarita',
  'pink_lemonade', 'virgin_strawberry_daiquiri', 'raspberry_lemonade',
];

const rank = new Map(CLASSICS.map((id, i) => [id, i]));

export const isClassic = (id: string) => rank.has(id);

/** Lower is more famous; non-classics come after all classics. */
export const fameRank = (id: string) => rank.get(id) ?? CLASSICS.length;

/** Classics first (in fame order), then everything else A to Z. */
export function byFame<T extends { id: string; name: string }>(a: T, b: T): number {
  return fameRank(a.id) - fameRank(b.id) || a.name.localeCompare(b.name);
}
