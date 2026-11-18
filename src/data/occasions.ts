import type { Recipe } from './recipes';

export type OccasionId = 'summer' | 'brunch' | 'aperitivo' | 'after_dinner' | 'party' | 'cosy';

/** Hand-picked moods and occasions. A drink can be in several. */
export const OCCASIONS: { id: OccasionId; label: string; emoji: string; ids: string[] }[] = [
  {
    id: 'summer', label: 'Summer', emoji: '☀️',
    ids: [
      'margarita', 'mojito', 'pina_colada', 'daiquiri', 'strawberry_daiquiri', 'paloma', 'ranch_water', 'gin_tonic',
      'tom_collins', 'aperol_spritz', 'hugo_spritz', 'campari_spritz', 'moscow_mule', 'dark_stormy', 'cuba_libre',
      'painkiller', 'mai_tai', 'blue_hawaiian', 'bay_breeze', 'sea_breeze', 'cape_codder', 'greyhound', 'salty_dog',
      'sangria', 'white_sangria', 'shandy', 'michelada', 'spicy_margarita', 'tommys_margarita', 'gin_rickey', 'caipirinha',
      'whisky_highball', 'elderflower_gt', 'lillet_tonic', 'wine_spritzer', 'bicicletta', 'cantarito', 'matador',
      'virgin_mojito', 'virgin_colada', 'lime_rickey', 'arnold_palmer', 'cucumber_cooler', 'strawberry_lemonade',
      'mint_lemonade', 'virgin_paloma', 'virgin_margarita', 'peach_iced_tea', 'cherry_limeade', 'passion_fizz',
    ],
  },
  {
    id: 'brunch', label: 'Brunch', emoji: '🥞',
    ids: [
      'mimosa', 'bellini', 'bloody_mary', 'bloody_maria', 'screwdriver', 'french_75', 'aperol_spritz', 'kir_royale',
      'rossini', 'garibaldi', 'michelada', 'brandy_milk_punch', 'espresso_martini', 'irish_coffee', 'poinsettia',
      'virgin_mary', 'virgin_bellini', 'sunrise_cooler', 'espresso_tonic', 'cinderella', 'arnold_palmer',
    ],
  },
  {
    id: 'aperitivo', label: 'Before dinner', emoji: '🍽️',
    ids: [
      'negroni', 'americano', 'aperol_spritz', 'campari_spritz', 'negroni_sbagliato', 'martini', 'dirty_martini',
      'vesper', 'gin_tonic', 'kir', 'kir_royale', 'bicicletta', 'lillet_tonic', 'garibaldi', 'boulevardier',
      'french_75', 'martinez', 'bronx', 'champagne_cocktail', 'whisky_highball', 'paloma', 'gimlet',
    ],
  },
  {
    id: 'after_dinner', label: 'After dinner', emoji: '🍰',
    ids: [
      'espresso_martini', 'white_russian', 'black_russian', 'mudslide', 'grasshopper', 'brandy_alexander',
      'chocolate_martini', 'toasted_almond', 'godfather', 'godmother', 'rusty_nail', 'stinger', 'old_fashioned',
      'manhattan', 'sazerac', 'vieux_carre', 'irish_coffee', 'baileys_coffee', 'carajillo', 'amaretto_sour',
      'b52', 'baby_guinness', 'black_manhattan', 'rob_roy',
    ],
  },
  {
    id: 'party', label: 'Party', emoji: '🎉',
    ids: [
      'margarita', 'long_island', 'sex_on_the_beach', 'cosmopolitan', 'kamikaze', 'lemon_drop', 'rum_punch',
      'sangria', 'white_sangria', 'pina_colada', 'tequila_sunrise', 'woo_woo', 'blue_lagoon', 'electric_lemonade',
      'jungle_bird', 'hurricane', 'bahama_mama', 'fuzzy_navel', 'melon_ball', 'b52', 'baby_guinness',
      'mojito', 'moscow_mule', 'french_martini', 'pornstar_martini', 'espresso_martini', 'cuba_libre',
      'shirley_temple', 'roy_rogers', 'tropical_punch', 'cherry_limeade',
    ],
  },
  {
    id: 'cosy', label: 'Cosy & warm', emoji: '❄️',
    ids: [
      'hot_toddy', 'irish_coffee', 'mulled_wine', 'hot_spiced_cider', 'eggnog', 'rum_flip', 'baileys_coffee',
      'old_fashioned', 'maple_old_fashioned', 'manhattan', 'penicillin', 'rusty_nail', 'godfather', 'boulevardier',
      'white_russian', 'brandy_alexander', 'warm_spiced_apple', 'honey_lemon_soother',
    ],
  },
];

const byOccasion = new Map(OCCASIONS.map((o) => [o.id, new Set(o.ids)]));

export function hasOccasion(recipeId: string, occasion: OccasionId): boolean {
  return byOccasion.get(occasion)?.has(recipeId) ?? false;
}

export function occasionsOf(recipeId: string) {
  return OCCASIONS.filter((o) => byOccasion.get(o.id)!.has(recipeId));
}

/** "Easy" = 3 or fewer required ingredients (garnishes don't count). */
export const EASY_MAX = 3;
export function isEasy(recipe: Recipe): boolean {
  return recipe.ingredients.filter((i) => !i.optional).length <= EASY_MAX;
}
