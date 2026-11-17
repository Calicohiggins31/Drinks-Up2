import type { Recipe, RecipeIngredient, Unit } from './recipes';

// Short helpers to keep the recipe list readable.
const oz = (id: string, amount: number, extra: Partial<RecipeIngredient> = {}): RecipeIngredient => ({
  id, amount, unit: 'oz', ...extra,
});
const u = (id: string, unit: Unit, amount?: number, extra: Partial<RecipeIngredient> = {}): RecipeIngredient => ({
  id, unit, amount, ...extra,
});
const opt = (i: RecipeIngredient): RecipeIngredient => ({ ...i, optional: true });
const SYRUP = ['sugar'];
const WHISKEY = ['rye', 'scotch', 'irish_whiskey'];

export const MORE_RECIPES: Recipe[] = [
  // Whiskey & brandy
  {
    id: 'penicillin', name: 'Penicillin', emoji: '🍯', color: '#D9A13B', glass: 'Rocks', method: 'Shake', strength: 'Medium',
    description: 'Smoky Scotch with honey, ginger and lemon.',
    ingredients: [oz('scotch', 2), oz('lemon_juice', 0.75), oz('honey', 0.5), oz('ginger_syrup', 0.25)],
    steps: ['Loosen the honey with a splash of warm water.', 'Shake everything with ice.', 'Strain over a large cube.'],
  },
  {
    id: 'paper_plane', name: 'Paper Plane', emoji: '✈️', color: '#F08A4B', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'Four equal parts, bitter-sweet and bright.',
    ingredients: [oz('bourbon', 0.75), oz('aperol', 0.75), oz('amaro', 0.75), oz('lemon_juice', 0.75)],
    steps: ['Shake everything with ice.', 'Strain into a chilled coupe.'],
  },
  {
    id: 'sazerac', name: 'Sazerac', emoji: '🎷', color: '#A63D40', glass: 'Rocks', method: 'Stir', strength: 'Strong',
    description: 'New Orleans rye with anise and bitters.',
    ingredients: [
      oz('rye', 2, { alternatives: ['cognac'] }), u('sugar', 'cube', 1, { alternatives: ['simple_syrup'] }),
      u('peychauds', 'dash', 3), u('absinthe', 'tsp', 0.25), opt(u('lemon', 'peel')),
    ],
    steps: [
      'Rinse a chilled rocks glass with absinthe and pour out the excess.',
      'In a mixing glass, dissolve the sugar with the bitters, add rye and ice, and stir.',
      'Strain into the glass (no ice) and express a lemon peel over the top.',
    ],
  },
  {
    id: 'vieux_carre', name: 'Vieux Carré', emoji: '⚜️', color: '#8B4A2B', glass: 'Rocks', method: 'Stir', strength: 'Strong',
    description: 'Rye, cognac and vermouth, rich and spiced.',
    ingredients: [
      oz('rye', 0.75), oz('cognac', 0.75), oz('sweet_vermouth', 0.75), u('benedictine', 'tsp', 1),
      u('peychauds', 'dash', 2), u('angostura', 'dash', 2),
    ],
    steps: ['Stir everything with ice.', 'Strain over a large cube.'],
  },
  {
    id: 'rusty_nail', name: 'Rusty Nail', emoji: '🔩', color: '#B5651D', glass: 'Rocks', method: 'Build', strength: 'Strong',
    description: 'Scotch softened with a honeyed whisky liqueur.',
    ingredients: [oz('scotch', 1.5), oz('drambuie', 0.75)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'irish_coffee', name: 'Irish Coffee', emoji: '☕', color: '#5B3A29', glass: 'Mug', method: 'Build', strength: 'Light',
    description: 'Hot coffee, whiskey and a cap of cream.',
    ingredients: [
      oz('irish_whiskey', 1.5, { alternatives: ['bourbon', 'scotch'] }), oz('coffee', 4),
      u('sugar', 'tsp', 2, { alternatives: ['simple_syrup', 'maple_syrup'] }), oz('cream', 1),
    ],
    steps: [
      'Warm a mug with hot water, then empty it.',
      'Add sugar and coffee and stir to dissolve, then add whiskey.',
      'Lightly whip the cream and float it on top. Don\'t stir.',
    ],
  },
  {
    id: 'hot_toddy', name: 'Hot Toddy', emoji: '🫖', color: '#C98B4B', glass: 'Mug', method: 'Build', strength: 'Light',
    description: 'Warm whiskey, honey and lemon.',
    ingredients: [oz('bourbon', 1.5, { alternatives: [...WHISKEY, 'cognac'] }), oz('honey', 0.5), oz('lemon_juice', 0.5)],
    steps: ['Add whiskey, honey and lemon to a mug.', 'Top with about 4 oz of hot water and stir.'],
  },
  {
    id: 'mint_julep', name: 'Mint Julep', emoji: '🌿', color: '#74A57F', glass: 'Julep cup', method: 'Muddle', strength: 'Strong',
    description: 'Bourbon over crushed ice with fresh mint.',
    ingredients: [oz('bourbon', 2), oz('simple_syrup', 0.5, { alternatives: SYRUP }), u('mint', 'leaves', 8)],
    steps: ['Gently press the mint with the syrup.', 'Add bourbon and pack with crushed ice.', 'Stir until frosty and top with more ice.'],
  },
  {
    id: 'whiskey_smash', name: 'Whiskey Smash', emoji: '🍋', color: '#C9A227', glass: 'Rocks', method: 'Muddle', strength: 'Medium',
    description: 'Muddled lemon, mint and bourbon.',
    ingredients: [oz('bourbon', 2, { alternatives: ['rye'] }), u('lemon', 'wedge', 3), oz('simple_syrup', 0.75, { alternatives: SYRUP }), u('mint', 'leaves', 6)],
    steps: ['Muddle the lemon wedges with the syrup.', 'Add mint, bourbon and ice and shake.', 'Strain over crushed ice.'],
  },
  {
    id: 'brown_derby', name: 'Brown Derby', emoji: '🎩', color: '#E39B5B', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'Bourbon, grapefruit and honey.',
    ingredients: [oz('bourbon', 1.5), oz('grapefruit_juice', 1), oz('honey', 0.5)],
    steps: ['Loosen the honey with a splash of warm water.', 'Shake with ice and strain into a coupe.'],
  },
  {
    id: 'kentucky_mule', name: 'Kentucky Mule', emoji: '🐴', color: '#B7853F', glass: 'Copper mug', method: 'Build', strength: 'Light',
    description: 'A Moscow Mule made with bourbon.',
    ingredients: [oz('bourbon', 2), oz('ginger_beer', 4), oz('lime_juice', 0.5), opt(u('mint', 'leaves'))],
    steps: ['Fill a mug with ice.', 'Add bourbon and lime, top with ginger beer.'],
  },
  {
    id: 'whiskey_ginger', name: 'Whiskey Ginger', emoji: '🫚', color: '#D4A24C', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'The easiest whiskey highball.',
    ingredients: [oz('irish_whiskey', 2, { alternatives: ['bourbon', 'rye', 'scotch'] }), oz('ginger_ale', 4), opt(u('lime', 'wedge'))],
    steps: ['Build over ice and squeeze in a lime wedge.'],
  },
  {
    id: 'godfather', name: 'Godfather', emoji: '🕴️', color: '#8C5A2B', glass: 'Rocks', method: 'Build', strength: 'Strong',
    description: 'Scotch sweetened with amaretto.',
    ingredients: [oz('scotch', 1.5, { alternatives: ['bourbon'] }), oz('amaretto', 0.5)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'stinger', name: 'Stinger', emoji: '🐝', color: '#A8D5BA', glass: 'Rocks', method: 'Shake', strength: 'Strong',
    description: 'Cognac and crème de menthe: a minty nightcap.',
    ingredients: [oz('cognac', 2), oz('creme_de_menthe', 0.75)],
    steps: ['Shake with ice.', 'Strain over crushed ice.'],
  },
  {
    id: 'brandy_alexander', name: 'Brandy Alexander', emoji: '🍫', color: '#C8A27C', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'Creamy chocolate dessert in a glass.',
    ingredients: [oz('cognac', 1.5), oz('creme_de_cacao', 1), oz('cream', 1), opt(u('nutmeg', 'pinch'))],
    steps: ['Shake hard with ice.', 'Strain into a coupe and grate nutmeg on top.'],
  },

  // Gin
  {
    id: 'last_word', name: 'Last Word', emoji: '🗝️', color: '#9CC069', glass: 'Coupe', method: 'Shake', strength: 'Strong',
    description: 'Equal parts gin, green herbal liqueur, maraschino and lime.',
    ingredients: [oz('gin', 0.75), oz('green_chartreuse', 0.75), oz('maraschino', 0.75), oz('lime_juice', 0.75)],
    steps: ['Shake everything with ice.', 'Strain into a chilled coupe.'],
  },
  {
    id: 'bramble', name: 'Bramble', emoji: '🫐', color: '#6A2C70', glass: 'Rocks', method: 'Build', strength: 'Medium',
    description: 'Gin sour with a blackberry drizzle.',
    ingredients: [oz('gin', 2), oz('lemon_juice', 0.75), oz('simple_syrup', 0.5, { alternatives: SYRUP }), oz('berry_liqueur', 0.5)],
    steps: ['Shake gin, lemon and syrup with ice.', 'Strain over crushed ice.', 'Drizzle the berry liqueur over the top.'],
  },
  {
    id: 'clover_club', name: 'Clover Club', emoji: '🍓', color: '#E5677D', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'Pink, silky gin and raspberry sour.',
    ingredients: [oz('gin', 1.5), oz('lemon_juice', 0.5), oz('raspberry_syrup', 0.5), u('egg_white', 'whole', 1)],
    steps: ['Shake everything without ice.', 'Add ice and shake again hard.', 'Strain into a chilled coupe.'],
  },
  {
    id: 'southside', name: 'Southside', emoji: '🌿', color: '#7BC47F', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'A gin mojito served straight up.',
    ingredients: [oz('gin', 2), oz('lime_juice', 0.75), oz('simple_syrup', 0.75, { alternatives: SYRUP }), u('mint', 'leaves', 6)],
    steps: ['Shake everything with ice.', 'Double strain into a chilled coupe.'],
  },
  {
    id: 'vesper', name: 'Vesper', emoji: '🕶️', color: '#C9D6DF', glass: 'Martini', method: 'Stir', strength: 'Strong',
    description: 'Gin, vodka and blanc aperitif wine. Very strong.',
    ingredients: [oz('gin', 2), oz('vodka', 0.5), oz('lillet_blanc', 0.5), opt(u('lemon', 'peel'))],
    steps: ['Stir with ice until very cold.', 'Strain and garnish with a lemon peel.'],
  },
  {
    id: 'dirty_martini', name: 'Dirty Martini', emoji: '🫒', color: '#8F9D6A', glass: 'Martini', method: 'Stir', strength: 'Strong',
    description: 'A briny martini with olive juice.',
    ingredients: [oz('gin', 2.5, { alternatives: ['vodka'] }), oz('dry_vermouth', 0.5), oz('olives', 0.5)],
    steps: ['Stir gin, vermouth and olive brine with ice.', 'Strain and garnish with olives.'],
  },
  {
    id: 'corpse_reviver', name: 'Corpse Reviver No. 2', emoji: '💀', color: '#E6D690', glass: 'Coupe', method: 'Shake', strength: 'Strong',
    description: 'Equal parts, bright and dangerously drinkable.',
    ingredients: [oz('gin', 0.75), oz('lillet_blanc', 0.75), oz('triple_sec', 0.75), oz('lemon_juice', 0.75), opt(u('absinthe', 'dash', 1))],
    steps: ['Rinse a coupe with absinthe if you have it.', 'Shake the rest with ice and strain.'],
  },
  {
    id: 'gin_fizz', name: 'Gin Fizz', emoji: '🫧', color: '#EFE9C9', glass: 'Highball', method: 'Shake', strength: 'Light',
    description: 'Frothy, sparkling gin lemonade.',
    ingredients: [
      oz('gin', 2), oz('lemon_juice', 1), oz('simple_syrup', 0.75, { alternatives: SYRUP }),
      u('soda_water', 'top'), opt(u('egg_white', 'whole', 1)),
    ],
    steps: ['Shake everything except soda (dry shake first if using egg).', 'Strain into a glass without ice.', 'Top with soda.'],
  },
  {
    id: 'gin_basil_smash', name: 'Gin Basil Smash', emoji: '🌱', color: '#5DAE5B', glass: 'Rocks', method: 'Muddle', strength: 'Medium',
    description: 'Bright green, herbal and zesty.',
    ingredients: [oz('gin', 2), oz('lemon_juice', 0.75), oz('simple_syrup', 0.75, { alternatives: SYRUP }), u('basil', 'leaves', 10)],
    steps: ['Muddle the basil with lemon juice.', 'Add gin, syrup and ice and shake hard.', 'Double strain over fresh ice.'],
  },
  {
    id: 'gin_rickey', name: 'Gin Rickey', emoji: '🍈', color: '#B9D88C', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Gin, lime and soda, with no sugar at all.',
    ingredients: [oz('gin', 2), oz('lime_juice', 0.75), oz('soda_water', 4)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'hugo_spritz', name: 'Hugo Spritz', emoji: '🌼', color: '#D7E8A7', glass: 'Wine glass', method: 'Build', strength: 'Light',
    description: 'Elderflower, prosecco and mint.',
    ingredients: [oz('elderflower_liqueur', 1), oz('sparkling_wine', 3), oz('soda_water', 1), u('mint', 'leaves', 6), opt(u('lime', 'wedge'))],
    steps: ['Lightly clap the mint and add to an iced wine glass.', 'Add elderflower, prosecco and soda and stir gently.'],
  },

  // Vodka
  {
    id: 'french_martini', name: 'French Martini', emoji: '🇫🇷', color: '#C2185B', glass: 'Martini', method: 'Shake', strength: 'Medium',
    description: 'Vodka, pineapple and raspberry, with foam.',
    ingredients: [oz('vodka', 1.5), oz('berry_liqueur', 0.5), oz('pineapple_juice', 1.5)],
    steps: ['Shake hard with ice to build foam.', 'Strain into a chilled martini glass.'],
  },
  {
    id: 'pornstar_martini', name: 'Passion Fruit Martini', emoji: '💛', color: '#F7B32B', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'Also called a Pornstar Martini. Passion fruit, vanilla and bubbles.',
    ingredients: [
      oz('vodka', 1.5), oz('passion_fruit', 1), oz('vanilla_syrup', 0.5), oz('lime_juice', 0.5),
      opt(oz('sparkling_wine', 2)),
    ],
    steps: ['Shake vodka, passion fruit, vanilla and lime with ice.', 'Strain into a coupe.', 'Serve with a shot of sparkling wine on the side.'],
  },
  {
    id: 'sex_on_the_beach', name: 'Sex on the Beach', emoji: '🏖️', color: '#FF7B54', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Fruity peach, orange and cranberry.',
    ingredients: [oz('vodka', 1.5), oz('peach_schnapps', 0.5), oz('orange_juice', 2), oz('cranberry_juice', 2)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'woo_woo', name: 'Woo Woo', emoji: '🎉', color: '#E63946', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Peach and cranberry party drink.',
    ingredients: [oz('vodka', 1.5), oz('peach_schnapps', 0.75), oz('cranberry_juice', 3)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'blue_lagoon', name: 'Blue Lagoon', emoji: '💙', color: '#1E90FF', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Electric blue lemonade.',
    ingredients: [oz('vodka', 1.5), oz('blue_curacao', 1), oz('lemonade', 4)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'mudslide', name: 'Mudslide', emoji: '🍦', color: '#7B5E46', glass: 'Rocks', method: 'Shake', strength: 'Medium',
    description: 'Coffee, Irish cream and vodka.',
    ingredients: [oz('vodka', 1), oz('coffee_liqueur', 1), oz('irish_cream', 1), oz('cream', 1, { alternatives: ['milk'] })],
    steps: ['Shake with ice.', 'Strain over fresh ice.'],
  },
  {
    id: 'godmother', name: 'Godmother', emoji: '👑', color: '#E0B589', glass: 'Rocks', method: 'Build', strength: 'Strong',
    description: 'Vodka and amaretto on the rocks.',
    ingredients: [oz('vodka', 1.5), oz('amaretto', 0.75)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'john_daly', name: 'John Daly', emoji: '⛳', color: '#E9C46A', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'A spiked Arnold Palmer.',
    ingredients: [oz('vodka', 1.5), oz('iced_tea', 3), oz('lemonade', 3)],
    steps: ['Build over ice and stir.'],
  },

  // Rum & cachaça
  {
    id: 'caipirinha', name: 'Caipirinha', emoji: '🇧🇷', color: '#8BC34A', glass: 'Rocks', method: 'Muddle', strength: 'Strong',
    description: "Brazil's national cocktail: cachaça, lime and sugar.",
    ingredients: [oz('cachaca', 2), u('lime', 'wedge', 4), u('sugar', 'tsp', 2, { alternatives: ['simple_syrup'] })],
    steps: ['Muddle the lime wedges with sugar in the glass.', 'Fill with ice, add cachaça and stir.'],
  },
  {
    id: 'hemingway_daiquiri', name: 'Hemingway Daiquiri', emoji: '📚', color: '#F4A6A6', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'A dry daiquiri with grapefruit and maraschino.',
    ingredients: [oz('white_rum', 2), oz('lime_juice', 0.75), oz('grapefruit_juice', 0.5), oz('maraschino', 0.5)],
    steps: ['Shake with ice.', 'Double strain into a chilled coupe.'],
  },
  {
    id: 'mary_pickford', name: 'Mary Pickford', emoji: '🎬', color: '#F9A8A8', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'Rum, pineapple and a touch of cherry.',
    ingredients: [oz('white_rum', 1.5), oz('pineapple_juice', 1.5), u('maraschino', 'tsp', 1), u('grenadine', 'tsp', 1)],
    steps: ['Shake with ice.', 'Strain into a chilled coupe.'],
  },
  {
    id: 'strawberry_daiquiri', name: 'Strawberry Daiquiri', emoji: '🍓', color: '#E63946', glass: 'Hurricane', method: 'Blend', strength: 'Light',
    description: 'Frozen strawberries, rum and lime.',
    ingredients: [oz('white_rum', 2), oz('lime_juice', 1), oz('simple_syrup', 0.5, { alternatives: SYRUP }), u('strawberries', 'whole', 5)],
    steps: ['Blend everything with a cup of ice until smooth.'],
  },
  {
    id: 'painkiller', name: 'Painkiller', emoji: '🥥', color: '#F2C57C', glass: 'Hurricane', method: 'Shake', strength: 'Medium',
    description: 'Rum, pineapple, orange and coconut.',
    ingredients: [oz('dark_rum', 2), oz('pineapple_juice', 4), oz('orange_juice', 1), oz('coconut_cream', 1), opt(u('nutmeg', 'pinch'))],
    steps: ['Shake with ice.', 'Pour into a tall glass and grate nutmeg on top.'],
  },
  {
    id: 'hurricane', name: 'Hurricane', emoji: '🌀', color: '#F25C54', glass: 'Hurricane', method: 'Shake', strength: 'Strong',
    description: 'Big, fruity New Orleans rum punch.',
    ingredients: [
      oz('white_rum', 1), oz('dark_rum', 1), oz('passion_fruit', 1), oz('orange_juice', 1),
      oz('lime_juice', 0.5), oz('simple_syrup', 0.5, { alternatives: SYRUP }), u('grenadine', 'tsp', 1),
    ],
    steps: ['Shake everything with ice.', 'Strain into a tall glass over fresh ice.'],
  },
  {
    id: 'jungle_bird', name: 'Jungle Bird', emoji: '🦜', color: '#E76F51', glass: 'Rocks', method: 'Shake', strength: 'Medium',
    description: 'Tiki with a bitter aperitivo twist.',
    ingredients: [oz('dark_rum', 1.5), oz('campari', 0.75), oz('pineapple_juice', 1.5), oz('lime_juice', 0.5), oz('simple_syrup', 0.5, { alternatives: SYRUP })],
    steps: ['Shake with ice.', 'Strain over fresh ice.'],
  },
  {
    id: 'blue_hawaiian', name: 'Blue Hawaiian', emoji: '🌺', color: '#3FA7D6', glass: 'Hurricane', method: 'Blend', strength: 'Light',
    description: 'Bright blue piña colada.',
    ingredients: [oz('white_rum', 1), oz('blue_curacao', 1), oz('pineapple_juice', 2), oz('coconut_cream', 1)],
    steps: ['Blend with a cup of ice, or shake hard and pour over ice.'],
  },
  {
    id: 'bay_breeze', name: 'Coconut Bay Breeze', emoji: '🌴', color: '#F48498', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Coconut rum, pineapple and cranberry.',
    ingredients: [oz('coconut_rum', 1.5), oz('pineapple_juice', 2), oz('cranberry_juice', 2)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'rum_ginger', name: 'Spiced Rum & Ginger', emoji: '🫚', color: '#B5752F', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Warm spice and ginger fizz.',
    ingredients: [oz('spiced_rum', 2), oz('ginger_ale', 4, { alternatives: ['ginger_beer'] }), opt(u('lime', 'wedge'))],
    steps: ['Build over ice and squeeze in a lime wedge.'],
  },

  // Agave
  {
    id: 'tommys_margarita', name: "Tommy's Margarita", emoji: '🌵', color: '#A3C45A', glass: 'Rocks', method: 'Shake', strength: 'Medium',
    description: 'Margarita made with agave instead of orange liqueur.',
    ingredients: [oz('tequila', 2), oz('lime_juice', 1), oz('agave_syrup', 0.5), opt(u('salt', 'pinch'))],
    steps: ['Shake with ice.', 'Strain over fresh ice in a salt-rimmed glass if you like.'],
  },
  {
    id: 'spicy_margarita', name: 'Spicy Margarita', emoji: '🌶️', color: '#7FB800', glass: 'Rocks', method: 'Muddle', strength: 'Medium',
    description: 'Tequila, lime and fresh jalapeño heat.',
    ingredients: [oz('tequila', 2), oz('lime_juice', 1), oz('agave_syrup', 0.75, { alternatives: ['simple_syrup'] }), u('jalapeno', 'slice', 2), opt(u('salt', 'pinch'))],
    steps: ['Muddle the jalapeño slices with the agave.', 'Add tequila, lime and ice and shake.', 'Strain over fresh ice.'],
  },
  {
    id: 'oaxaca_old_fashioned', name: 'Oaxaca Old Fashioned', emoji: '🔥', color: '#A0522D', glass: 'Rocks', method: 'Stir', strength: 'Strong',
    description: 'Smoky agave twist on the Old Fashioned.',
    ingredients: [oz('tequila', 1.5), oz('mezcal', 0.5), u('agave_syrup', 'tsp', 1), u('angostura', 'dash', 2), opt(u('orange', 'peel'))],
    steps: ['Stir with ice.', 'Strain over a large cube and flame or express an orange peel.'],
  },
  {
    id: 'mezcal_negroni', name: 'Mezcal Negroni', emoji: '🔥', color: '#B22222', glass: 'Rocks', method: 'Stir', strength: 'Strong',
    description: 'A smoky Negroni.',
    ingredients: [oz('mezcal', 1), oz('campari', 1), oz('sweet_vermouth', 1), opt(u('orange', 'peel'))],
    steps: ['Stir with ice.', 'Strain over a large cube.'],
  },
  {
    id: 'el_diablo', name: 'El Diablo', emoji: '😈', color: '#8E2C48', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Tequila, blackcurrant and ginger beer.',
    ingredients: [oz('tequila', 1.5), oz('creme_de_cassis', 0.5), oz('lime_juice', 0.5), oz('ginger_beer', 3)],
    steps: ['Shake tequila, cassis and lime with ice.', 'Strain into an iced glass and top with ginger beer.'],
  },
  {
    id: 'pisco_sour', name: 'Pisco Sour', emoji: '🇵🇪', color: '#F1E6B2', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'Silky pisco, lime and egg white.',
    ingredients: [oz('pisco', 2), oz('lime_juice', 1), oz('simple_syrup', 0.75, { alternatives: SYRUP }), u('egg_white', 'whole', 1), opt(u('angostura', 'dash', 3))],
    steps: ['Shake without ice, then with ice.', 'Strain into a coupe and dot bitters on the foam.'],
  },

  // Liqueurs, wine & beer
  {
    id: 'bellini', name: 'Bellini', emoji: '🍑', color: '#FFB38A', glass: 'Flute', method: 'Build', strength: 'Light',
    description: 'White peach and prosecco.',
    ingredients: [oz('peach_puree', 2), oz('sparkling_wine', 4)],
    steps: ['Add peach purée to a flute.', 'Slowly top with prosecco and stir gently.'],
  },
  {
    id: 'kir_royale', name: 'Kir Royale', emoji: '🍇', color: '#7B2D52', glass: 'Flute', method: 'Build', strength: 'Light',
    description: 'Sparkling wine with blackcurrant.',
    ingredients: [oz('creme_de_cassis', 0.5), oz('sparkling_wine', 4)],
    steps: ['Add cassis to a flute and top with sparkling wine.'],
  },
  {
    id: 'negroni_sbagliato', name: 'Negroni Sbagliato', emoji: '🥂', color: '#D1495B', glass: 'Rocks', method: 'Build', strength: 'Light',
    description: 'The "mistaken" Negroni, with prosecco instead of gin.',
    ingredients: [oz('campari', 1), oz('sweet_vermouth', 1), oz('sparkling_wine', 1.5), opt(u('orange', 'peel'))],
    steps: ['Build red bitter aperitivo and vermouth over ice.', 'Top with prosecco and stir gently.'],
  },
  {
    id: 'garibaldi', name: 'Garibaldi', emoji: '🍊', color: '#F3722C', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Red bitter aperitivo and orange juice.',
    ingredients: [oz('campari', 1.5), oz('orange_juice', 4)],
    steps: ['Build over ice. Whisk or blend the juice first for a fluffy texture.'],
  },
  {
    id: 'fuzzy_navel', name: 'Fuzzy Navel', emoji: '🍑', color: '#FFA45B', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Peach schnapps and orange juice.',
    ingredients: [oz('peach_schnapps', 2), oz('orange_juice', 4)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'midori_sour', name: 'Melon Sour', emoji: '🍈', color: '#7DDE5B', glass: 'Rocks', method: 'Shake', strength: 'Light',
    description: 'Bright green melon sour.',
    ingredients: [oz('melon_liqueur', 1.5), oz('vodka', 0.5), oz('lemon_juice', 0.75), opt(u('soda_water', 'top'))],
    steps: ['Shake melon liqueur, vodka and lemon with ice.', 'Strain over ice and top with a splash of soda.'],
  },
  {
    id: 'japanese_slipper', name: 'Japanese Slipper', emoji: '🥿', color: '#9BE564', glass: 'Coupe', method: 'Shake', strength: 'Medium',
    description: 'Equal parts melon, orange liqueur and lemon.',
    ingredients: [oz('melon_liqueur', 0.75), oz('triple_sec', 0.75), oz('lemon_juice', 0.75)],
    steps: ['Shake with ice.', 'Strain into a chilled coupe.'],
  },
  {
    id: 'grasshopper', name: 'Grasshopper', emoji: '🦗', color: '#9ED8A4', glass: 'Coupe', method: 'Shake', strength: 'Light',
    description: 'Mint-chocolate milkshake for grown-ups.',
    ingredients: [oz('creme_de_menthe', 0.75), oz('creme_de_cacao', 0.75), oz('cream', 0.75)],
    steps: ['Shake hard with ice.', 'Strain into a chilled coupe.'],
  },
  {
    id: 'b52', name: 'B-52', emoji: '🛩️', color: '#A47148', glass: 'Shot', method: 'Build', strength: 'Medium',
    description: 'A layered shot of coffee, cream and orange.',
    ingredients: [oz('coffee_liqueur', 0.5), oz('irish_cream', 0.5), oz('triple_sec', 0.5)],
    steps: ['Pour coffee liqueur into a shot glass.', 'Slowly layer Irish cream, then triple sec, over the back of a spoon.'],
  },
  {
    id: 'sangria', name: 'Sangria', emoji: '🍷', color: '#8E1B3A', glass: 'Wine glass', method: 'Build', strength: 'Light',
    description: 'Red wine punch with fruit (makes one glass).',
    ingredients: [
      oz('red_wine', 4), oz('cognac', 0.5), oz('triple_sec', 0.5), oz('orange_juice', 1),
      opt(u('orange', 'slice', 1)), opt(u('strawberries', 'whole', 2)),
    ],
    steps: ['Stir everything together with sliced fruit.', 'Rest in the fridge if you have time, then serve over ice.'],
  },
  {
    id: 'kalimotxo', name: 'Kalimotxo', emoji: '🥤', color: '#6D1A36', glass: 'Highball', method: 'Build', strength: 'Light',
    description: 'Red wine and cola. Trust the Basques.',
    ingredients: [oz('red_wine', 3), oz('cola', 3), opt(u('lemon', 'wedge'))],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'michelada', name: 'Michelada', emoji: '🍺', color: '#D35400', glass: 'Pint', method: 'Build', strength: 'Light',
    description: 'Spicy, salty, limey beer.',
    ingredients: [
      u('beer', 'top'), oz('lime_juice', 1), u('hot_sauce', 'dash', 3), u('worcestershire', 'dash', 2),
      opt(u('salt', 'pinch')), opt(oz('tomato_juice', 2)),
    ],
    steps: ['Rim a glass with salt and fill with ice.', 'Add lime, hot sauce, Worcestershire (and tomato if using).', 'Top with cold beer.'],
  },
  {
    id: 'shandy', name: 'Shandy', emoji: '🍺', color: '#F4D35E', glass: 'Pint', method: 'Build', strength: 'Light',
    description: 'Half beer, half lemonade.',
    ingredients: [oz('beer', 6), oz('lemonade', 6, { alternatives: ['lemon_lime_soda'] })],
    steps: ['Pour the beer, then top with lemonade.'],
  },

  // Mocktails
  {
    id: 'arnold_palmer', name: 'Arnold Palmer', emoji: '⛳', color: '#D4A35A', glass: 'Highball', method: 'Build', strength: 'None',
    description: 'Half iced tea, half lemonade.',
    ingredients: [oz('iced_tea', 4), oz('lemonade', 4)],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'cucumber_cooler', name: 'Cucumber Cooler', emoji: '🥒', color: '#A8D5A2', glass: 'Highball', method: 'Muddle', strength: 'None',
    description: 'Crisp cucumber, lime and soda.',
    ingredients: [u('cucumber', 'slice', 4), oz('lime_juice', 0.75), oz('simple_syrup', 0.5, { alternatives: SYRUP }), oz('soda_water', 4), opt(u('mint', 'leaves'))],
    steps: ['Muddle the cucumber with the syrup.', 'Add lime and ice, top with soda.'],
  },
  {
    id: 'strawberry_lemonade', name: 'Strawberry Lemonade', emoji: '🍓', color: '#F28B95', glass: 'Highball', method: 'Muddle', strength: 'None',
    description: 'Fresh strawberries crushed into lemonade.',
    ingredients: [u('strawberries', 'whole', 4), oz('lemonade', 6), opt(u('basil', 'leaves', 3))],
    steps: ['Muddle the strawberries in the glass.', 'Add ice and top with lemonade.'],
  },
  {
    id: 'virgin_mary', name: 'Virgin Mary', emoji: '🍅', color: '#C0392B', glass: 'Highball', method: 'Build', strength: 'None',
    description: 'All the Bloody Mary flavour, no vodka.',
    ingredients: [oz('tomato_juice', 5), oz('lemon_juice', 0.5), u('worcestershire', 'dash', 2), opt(u('hot_sauce', 'dash', 2)), opt(u('salt', 'pinch'))],
    steps: ['Stir everything with ice.', 'Pour into a tall glass.'],
  },
  {
    id: 'cranberry_spritzer', name: 'Cranberry Spritzer', emoji: '🫐', color: '#C1121F', glass: 'Wine glass', method: 'Build', strength: 'None',
    description: 'Tart cranberry with bubbles.',
    ingredients: [oz('cranberry_juice', 3), oz('soda_water', 3), opt(u('lime', 'wedge'))],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'roy_rogers', name: 'Roy Rogers', emoji: '🤠', color: '#7A2E1F', glass: 'Highball', method: 'Build', strength: 'None',
    description: 'Cola with grenadine and a cherry.',
    ingredients: [oz('cola', 6), oz('grenadine', 0.5), opt(u('cherry', 'whole'))],
    steps: ['Build over ice and top with a cherry.'],
  },
  {
    id: 'apple_ginger_fizz', name: 'Apple Ginger Fizz', emoji: '🍏', color: '#B5D99C', glass: 'Highball', method: 'Build', strength: 'None',
    description: 'Apple juice and ginger ale.',
    ingredients: [oz('apple_juice', 3), oz('ginger_ale', 3, { alternatives: ['ginger_beer'] }), opt(u('lemon', 'wedge'))],
    steps: ['Build over ice and stir.'],
  },
  {
    id: 'passion_fizz', name: 'Passion Fruit Fizz', emoji: '💛', color: '#F9C74F', glass: 'Highball', method: 'Shake', strength: 'None',
    description: 'Tropical passion fruit and vanilla soda.',
    ingredients: [oz('passion_fruit', 1.5), oz('vanilla_syrup', 0.5), oz('lime_juice', 0.5), oz('soda_water', 3)],
    steps: ['Shake passion fruit, vanilla and lime with ice.', 'Strain over fresh ice and top with soda.'],
  },
  {
    id: 'espresso_tonic', name: 'Espresso Tonic', emoji: '☕', color: '#6F4E37', glass: 'Highball', method: 'Build', strength: 'None',
    description: 'Bitter, fizzy and refreshing coffee.',
    ingredients: [oz('tonic', 4), oz('espresso', 1.5), opt(u('orange', 'peel'))],
    steps: ['Fill a glass with ice and tonic.', 'Slowly pour the espresso on top.'],
  },
];
