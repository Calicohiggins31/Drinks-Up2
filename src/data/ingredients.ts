export type IngredientCategory =
  | 'Spirits'
  | 'Liqueurs & Wine'
  | 'Mixers'
  | 'Juices'
  | 'Syrups & Sweeteners'
  | 'Bitters'
  | 'Fresh & Pantry';

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

  // Liqueurs & wine
  { id: 'triple_sec', name: 'Triple sec / Cointreau', category: 'Liqueurs & Wine' },
  { id: 'sweet_vermouth', name: 'Sweet vermouth', category: 'Liqueurs & Wine' },
  { id: 'dry_vermouth', name: 'Dry vermouth', category: 'Liqueurs & Wine' },
  { id: 'campari', name: 'Campari', category: 'Liqueurs & Wine' },
  { id: 'aperol', name: 'Aperol', category: 'Liqueurs & Wine' },
  { id: 'coffee_liqueur', name: 'Coffee liqueur', category: 'Liqueurs & Wine' },
  { id: 'amaretto', name: 'Amaretto', category: 'Liqueurs & Wine' },
  { id: 'sparkling_wine', name: 'Prosecco / sparkling wine', category: 'Liqueurs & Wine' },

  // Mixers
  { id: 'soda_water', name: 'Soda water', category: 'Mixers' },
  { id: 'tonic', name: 'Tonic water', category: 'Mixers' },
  { id: 'cola', name: 'Cola', category: 'Mixers' },
  { id: 'ginger_beer', name: 'Ginger beer', category: 'Mixers' },
  { id: 'lemon_lime_soda', name: 'Lemon-lime soda', category: 'Mixers' },

  // Juices
  { id: 'lime_juice', name: 'Lime juice', category: 'Juices' },
  { id: 'lemon_juice', name: 'Lemon juice', category: 'Juices' },
  { id: 'orange_juice', name: 'Orange juice', category: 'Juices' },
  { id: 'cranberry_juice', name: 'Cranberry juice', category: 'Juices' },
  { id: 'pineapple_juice', name: 'Pineapple juice', category: 'Juices' },
  { id: 'grapefruit_juice', name: 'Grapefruit juice', category: 'Juices' },
  { id: 'tomato_juice', name: 'Tomato juice', category: 'Juices' },

  // Syrups & sweeteners
  { id: 'simple_syrup', name: 'Simple syrup', category: 'Syrups & Sweeteners' },
  { id: 'sugar', name: 'Sugar', category: 'Syrups & Sweeteners' },
  { id: 'honey', name: 'Honey', category: 'Syrups & Sweeteners' },
  { id: 'grenadine', name: 'Grenadine', category: 'Syrups & Sweeteners' },
  { id: 'orgeat', name: 'Orgeat (almond syrup)', category: 'Syrups & Sweeteners' },

  // Bitters
  { id: 'angostura', name: 'Angostura bitters', category: 'Bitters' },
  { id: 'orange_bitters', name: 'Orange bitters', category: 'Bitters' },

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
];

const byId = new Map(INGREDIENTS.map((i) => [i.id, i]));

export function getIngredient(id: string): Ingredient {
  const found = byId.get(id);
  if (!found) throw new Error(`Unknown ingredient: ${id}`);
  return found;
}

export function ingredientName(id: string): string {
  return getIngredient(id).name;
}

/** One-tap starter kits on the My Bar screen. */
export const STARTER_KITS: { id: string; name: string; emoji: string; ingredients: string[] }[] = [
  {
    id: 'basics',
    name: 'Home bar basics',
    emoji: '🍾',
    ingredients: [
      'vodka', 'gin', 'white_rum', 'tequila', 'bourbon', 'triple_sec',
      'lime_juice', 'lemon_juice', 'simple_syrup', 'soda_water', 'tonic', 'cola', 'angostura',
    ],
  },
  {
    id: 'italian',
    name: 'Aperitivo hour',
    emoji: '🍊',
    ingredients: ['gin', 'campari', 'aperol', 'sweet_vermouth', 'sparkling_wine', 'soda_water', 'orange'],
  },
  {
    id: 'mocktail',
    name: 'Mocktail kit',
    emoji: '🧃',
    ingredients: [
      'lime_juice', 'lemon_juice', 'orange_juice', 'pineapple_juice', 'simple_syrup',
      'grenadine', 'soda_water', 'ginger_beer', 'lemon_lime_soda', 'mint', 'coconut_cream',
    ],
  },
];
