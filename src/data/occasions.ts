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
      'watermelon_cooler', 'frozen_margarita', 'strawberry_margarita', 'watermelon_margarita', 'pineapple_margarita', 'pineapple_mojito', 'strawberry_mojito', 'coconut_mojito', 'banana_daiquiri', 'frose', 'rose_spritz', 'limoncello_spritz', 'tinto_de_verano', 'orange_crush', 'coconut_rum_pineapple', 'vodka_soda', 'tequila_tonic', 'bourbon_lemonade', 'peach_smash', 'chelada', 'watermelon_agua_fresca', 'coconut_lime_cooler', 'pink_lemonade', 'raspberry_lemonade', 'peach_lemonade', 'cucumber_mint_lemonade', 'pineapple_nojito', 'virgin_strawberry_daiquiri',
      'vodka_pineapple', 'strawberry_vodka_lemonade', 'peach_vodka_lemonade', 'pineapple_mule', 'mango_mule', 'vodka_mojito', 'vodka_coconut_water', 'gin_lemonade', 'gin_soda', 'cucumber_gin_tonic', 'pink_gin_tonic', 'rum_pineapple', 'rum_lemonade', 'frozen_daiquiri', 'mango_daiquiri', 'mango_mojito', 'watermelon_mojito', 'cucumber_mojito', 'raspberry_mojito', 'tequila_lemonade', 'mango_margarita', 'cucumber_margarita', 'skinny_margarita', 'peach_margarita', 'bourbon_sweet_tea', 'bourbon_peach_tea', 'mango_lemonade', 'pineapple_lemonade', 'mango_nojito', 'strawberry_nojito', 'lime_soda',
    ],
  },
  {
    id: 'brunch', label: 'Brunch', emoji: '🥞',
    ids: [
      'mimosa', 'bellini', 'bloody_mary', 'bloody_maria', 'screwdriver', 'french_75', 'aperol_spritz', 'kir_royale',
      'rossini', 'garibaldi', 'michelada', 'brandy_milk_punch', 'espresso_martini', 'irish_coffee', 'poinsettia',
      'virgin_mary', 'virgin_bellini', 'sunrise_cooler', 'espresso_tonic', 'cinderella', 'arnold_palmer',
      'mojito_royale', 'limoncello_spritz', 'chelada', 'vanilla_iced_latte', 'mexican_coffee', 'virgin_sangria', 'creamsicle_fizz',
      'pineapple_mimosa', 'cranberry_mimosa', 'grapefruit_mimosa', 'mango_mimosa', 'apple_cider_mimosa', 'beermosa', 'red_snapper', 'bourbon_milk_punch', 'bourbon_iced_coffee', 'orange_blossom', 'orange_spritzer',
    ],
  },
  {
    id: 'aperitivo', label: 'Before dinner', emoji: '🍽️',
    ids: [
      'negroni', 'americano', 'aperol_spritz', 'campari_spritz', 'negroni_sbagliato', 'martini', 'dirty_martini',
      'vesper', 'gin_tonic', 'kir', 'kir_royale', 'bicicletta', 'lillet_tonic', 'garibaldi', 'boulevardier',
      'french_75', 'martinez', 'bronx', 'champagne_cocktail', 'whisky_highball', 'paloma', 'gimlet',
      'gibson', 'vodka_martini', 'old_pal', 'bitter_soda', 'aperitivo_sour', 'limoncello_spritz', 'rose_spritz', 'no_gin_tonic',
      'fifty_fifty_martini', 'gin_spritz', 'vodka_spritz', 'brandy_highball', 'grapefruit_tonic', 'lemon_lime_bitters',
    ],
  },
  {
    id: 'after_dinner', label: 'After dinner', emoji: '🍰',
    ids: [
      'espresso_martini', 'white_russian', 'black_russian', 'mudslide', 'grasshopper', 'brandy_alexander',
      'chocolate_martini', 'toasted_almond', 'godfather', 'godmother', 'rusty_nail', 'stinger', 'old_fashioned',
      'manhattan', 'sazerac', 'vieux_carre', 'irish_coffee', 'baileys_coffee', 'carajillo', 'amaretto_sour',
      'b52', 'baby_guinness', 'black_manhattan', 'rob_roy',
      'brave_bull', 'french_connection', 'bushwacker', 'mexican_coffee', 'japanese_cocktail', 'irish_cream_hot_chocolate',
      'brandy_manhattan', 'coffee_cream', 'bourbon_hot_chocolate',
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
      'dirty_shirley', 'long_beach', 'tokyo_tea', 'green_tea_shot', 'mind_eraser', 'washington_apple', 'orange_crush', 'frozen_margarita', 'beergarita', 'appletini', 'vodka_bay_breeze', 'raspberry_lemon_drop', 'shirley_ginger', 'pink_lemonade',
      'long_island_lemonade', 'spiced_rum_cola', 'vodka_cola', 'blue_hawaii', 'tequila_shot', 'lemon_drop_shot', 'scooby_snack', 'white_gummy_bear', 'spiked_cherry_limeade', 'holiday_punch', 'cranberry_margarita', 'raspberry_margarita', 'cranberry_orange_punch',
    ],
  },
  {
    id: 'cosy', label: 'Cosy & warm', emoji: '❄️',
    ids: [
      'hot_toddy', 'irish_coffee', 'mulled_wine', 'hot_spiced_cider', 'eggnog', 'rum_flip', 'baileys_coffee',
      'old_fashioned', 'maple_old_fashioned', 'manhattan', 'penicillin', 'rusty_nail', 'godfather', 'boulevardier',
      'white_russian', 'brandy_alexander', 'warm_spiced_apple', 'honey_lemon_soother',
      'irish_cream_hot_chocolate', 'peppermint_hot_chocolate', 'mexican_coffee', 'mulled_cider', 'coquito', 'bourbon_cider', 'cinnamon_apple_highball', 'irish_mule',
      'hot_buttered_rum', 'bourbon_hot_chocolate', 'maple_bourbon_sour', 'cinnamon_whisky_cola', 'apple_cider_mimosa',
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
