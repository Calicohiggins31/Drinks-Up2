export type IngredientCategory =
  | 'Spirits'
  | 'Liqueurs & Wine'
  | 'Mixers'
  | 'Juices'
  | 'Syrups & Sweeteners'
  | 'Bitters'
  | 'Fresh & Pantry'
  | 'Your own';

export type Ingredient = {
  id: string;
  name: string;
  category: IngredientCategory;
};

export const CATEGORIES: IngredientCategory[] = [
  'Spirits',
  'Liqueurs & Wine',
  'Mixers',
  'Juices',
  'Syrups & Sweeteners',
  'Bitters',
  'Fresh & Pantry',
  'Your own',
];

export const INGREDIENTS: Ingredient[] = [
  // Spirits
  { id: 'vodka', name: 'Vodka', category: 'Spirits' },
  { id: 'gin', name: 'Gin', category: 'Spirits' },
  { id: 'white_rum', name: 'White rum', category: 'Spirits' },
  { id: 'dark_rum', name: 'Dark rum', category: 'Spirits' },
  { id: 'tequila', name: 'Tequila', category: 'Spirits' },
  { id: 'bourbon', name: 'Bourbon', category: 'Spirits' },
  { id: 'rye', name: 'Rye whiskey', category: 'Spirits' },
  { id: 'scotch', name: 'Scotch', category: 'Spirits' },
  { id: 'cognac', name: 'Cognac / brandy', category: 'Spirits' },
  { id: 'mezcal', name: 'Mezcal', category: 'Spirits' },
  { id: 'cachaca', name: 'Cachaça', category: 'Spirits' },
  { id: 'pisco', name: 'Pisco', category: 'Spirits' },
  { id: 'spiced_rum', name: 'Spiced rum', category: 'Spirits' },
  { id: 'irish_whiskey', name: 'Irish whiskey', category: 'Spirits' },
  { id: 'absinthe', name: 'Absinthe / pastis', category: 'Spirits' },

  // Liqueurs & wine
  { id: 'triple_sec', name: 'Triple sec (orange liqueur)', category: 'Liqueurs & Wine' },
  { id: 'sweet_vermouth', name: 'Sweet vermouth', category: 'Liqueurs & Wine' },
  { id: 'dry_vermouth', name: 'Dry vermouth', category: 'Liqueurs & Wine' },
  { id: 'campari', name: 'Red bitter aperitivo', category: 'Liqueurs & Wine' },
  { id: 'aperol', name: 'Orange aperitivo', category: 'Liqueurs & Wine' },
  { id: 'coffee_liqueur', name: 'Coffee liqueur', category: 'Liqueurs & Wine' },
  { id: 'amaretto', name: 'Amaretto', category: 'Liqueurs & Wine' },
  { id: 'sparkling_wine', name: 'Prosecco / sparkling wine', category: 'Liqueurs & Wine' },
  { id: 'red_wine', name: 'Red wine', category: 'Liqueurs & Wine' },
  { id: 'white_wine', name: 'White wine', category: 'Liqueurs & Wine' },
  { id: 'beer', name: 'Beer / lager', category: 'Liqueurs & Wine' },
  { id: 'elderflower_liqueur', name: 'Elderflower liqueur', category: 'Liqueurs & Wine' },
  { id: 'irish_cream', name: 'Irish cream liqueur', category: 'Liqueurs & Wine' },
  { id: 'maraschino', name: 'Maraschino liqueur', category: 'Liqueurs & Wine' },
  { id: 'green_chartreuse', name: 'Green herbal liqueur', category: 'Liqueurs & Wine' },
  { id: 'benedictine', name: 'Herbal honey liqueur', category: 'Liqueurs & Wine' },
  { id: 'drambuie', name: 'Scotch honey liqueur', category: 'Liqueurs & Wine' },
  { id: 'amaro', name: 'Amaro (Italian bitter liqueur)', category: 'Liqueurs & Wine' },
  { id: 'lillet_blanc', name: 'Blanc aperitif wine', category: 'Liqueurs & Wine' },
  { id: 'blue_curacao', name: 'Blue curaçao', category: 'Liqueurs & Wine' },
  { id: 'peach_schnapps', name: 'Peach schnapps', category: 'Liqueurs & Wine' },
  { id: 'melon_liqueur', name: 'Melon liqueur', category: 'Liqueurs & Wine' },
  { id: 'coconut_rum', name: 'Coconut rum', category: 'Liqueurs & Wine' },
  { id: 'berry_liqueur', name: 'Berry liqueur (raspberry or blackberry)', category: 'Liqueurs & Wine' },
  { id: 'creme_de_cassis', name: 'Crème de cassis', category: 'Liqueurs & Wine' },
  { id: 'creme_de_menthe', name: 'Crème de menthe', category: 'Liqueurs & Wine' },
  { id: 'creme_de_cacao', name: 'Crème de cacao', category: 'Liqueurs & Wine' },

  // Mixers
  { id: 'soda_water', name: 'Soda water', category: 'Mixers' },
  { id: 'tonic', name: 'Tonic water', category: 'Mixers' },
  { id: 'cola', name: 'Cola', category: 'Mixers' },
  { id: 'ginger_beer', name: 'Ginger beer', category: 'Mixers' },
  { id: 'lemon_lime_soda', name: 'Lemon-lime soda', category: 'Mixers' },
  { id: 'ginger_ale', name: 'Ginger ale', category: 'Mixers' },
  { id: 'lemonade', name: 'Lemonade', category: 'Mixers' },
  { id: 'iced_tea', name: 'Iced tea', category: 'Mixers' },
  { id: 'coffee', name: 'Hot coffee', category: 'Mixers' },

  // Juices
  { id: 'lime_juice', name: 'Lime juice', category: 'Juices' },
  { id: 'lemon_juice', name: 'Lemon juice', category: 'Juices' },
  { id: 'orange_juice', name: 'Orange juice', category: 'Juices' },
  { id: 'cranberry_juice', name: 'Cranberry juice', category: 'Juices' },
  { id: 'pineapple_juice', name: 'Pineapple juice', category: 'Juices' },
  { id: 'grapefruit_juice', name: 'Grapefruit juice', category: 'Juices' },
  { id: 'tomato_juice', name: 'Tomato juice', category: 'Juices' },
  { id: 'apple_juice', name: 'Apple juice / cider', category: 'Juices' },
  { id: 'passion_fruit', name: 'Passion fruit purée', category: 'Juices' },
  { id: 'peach_puree', name: 'Peach purée', category: 'Juices' },

  // Syrups & sweeteners
  { id: 'simple_syrup', name: 'Simple syrup', category: 'Syrups & Sweeteners' },
  { id: 'sugar', name: 'Sugar', category: 'Syrups & Sweeteners' },
  { id: 'honey', name: 'Honey', category: 'Syrups & Sweeteners' },
  { id: 'grenadine', name: 'Grenadine', category: 'Syrups & Sweeteners' },
  { id: 'orgeat', name: 'Orgeat (almond syrup)', category: 'Syrups & Sweeteners' },
  { id: 'agave_syrup', name: 'Agave syrup', category: 'Syrups & Sweeteners' },
  { id: 'maple_syrup', name: 'Maple syrup', category: 'Syrups & Sweeteners' },
  { id: 'ginger_syrup', name: 'Ginger syrup', category: 'Syrups & Sweeteners' },
  { id: 'vanilla_syrup', name: 'Vanilla syrup', category: 'Syrups & Sweeteners' },
  { id: 'raspberry_syrup', name: 'Raspberry syrup', category: 'Syrups & Sweeteners' },

  // Bitters
  { id: 'angostura', name: 'Aromatic bitters', category: 'Bitters' },
  { id: 'orange_bitters', name: 'Orange bitters', category: 'Bitters' },
  { id: 'peychauds', name: 'Creole bitters (anise-style)', category: 'Bitters' },

  // Fresh & pantry
  { id: 'mint', name: 'Fresh mint', category: 'Fresh & Pantry' },
  { id: 'lime', name: 'Limes (wedges)', category: 'Fresh & Pantry' },
  { id: 'orange', name: 'Oranges (peel)', category: 'Fresh & Pantry' },
  { id: 'cherry', name: 'Cocktail cherries', category: 'Fresh & Pantry' },
  { id: 'egg_white', name: 'Egg white', category: 'Fresh & Pantry' },
  { id: 'cream', name: 'Cream', category: 'Fresh & Pantry' },
  { id: 'coconut_cream', name: 'Coconut cream', category: 'Fresh & Pantry' },
  { id: 'espresso', name: 'Espresso', category: 'Fresh & Pantry' },
  { id: 'worcestershire', name: 'Worcestershire sauce', category: 'Fresh & Pantry' },
  { id: 'salt', name: 'Salt', category: 'Fresh & Pantry' },
  { id: 'lemon', name: 'Lemons (wedges / peel)', category: 'Fresh & Pantry' },
  { id: 'cucumber', name: 'Cucumber', category: 'Fresh & Pantry' },
  { id: 'strawberries', name: 'Strawberries', category: 'Fresh & Pantry' },
  { id: 'basil', name: 'Fresh basil', category: 'Fresh & Pantry' },
  { id: 'jalapeno', name: 'Jalapeño', category: 'Fresh & Pantry' },
  { id: 'olives', name: 'Olives (and brine)', category: 'Fresh & Pantry' },
  { id: 'milk', name: 'Milk', category: 'Fresh & Pantry' },
  { id: 'nutmeg', name: 'Nutmeg', category: 'Fresh & Pantry' },
  { id: 'cinnamon', name: 'Cinnamon', category: 'Fresh & Pantry' },
  { id: 'whole_egg', name: 'Egg (whole)', category: 'Fresh & Pantry' },
  { id: 'hot_sauce', name: 'Hot sauce', category: 'Fresh & Pantry' },
];

const byId = new Map(INGREDIENTS.map((i) => [i.id, i]));

/** Ingredients the user added themselves. Kept in sync by BarProvider. */
let customById = new Map<string, Ingredient>();

export function setCustomIngredients(list: Ingredient[]) {
  customById = new Map(list.map((i) => [i.id, i]));
}

export function getIngredient(id: string): Ingredient {
  // Fall back to a readable name so a deleted custom ingredient can never crash a screen.
  return byId.get(id) ?? customById.get(id) ?? { id, name: id.replace(/^custom_(ing_)?/, '').replace(/_[a-z0-9]+$/, '').replace(/_/g, ' '), category: 'Your own' };
}

export function ingredientName(id: string): string {
  return getIngredient(id).name;
}
