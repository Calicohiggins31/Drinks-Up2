/**
 * Longer "About this drink" notes, keyed by recipe id.
 * Origins are the commonly told stories; cocktail history is full of competing claims.
 */
export const ABOUT: Record<string, string> = {
  margarita:
    'Tequila, orange liqueur and lime: sour first, then a little sweet, with salt to make the flavours pop. Several bartenders in Mexico and the US claim to have invented it in the 1930s–40s. A crowd-pleaser for warm evenings and taco nights.',
  daiquiri:
    'Just rum, lime and sugar, so the balance is everything: crisp, tart and clean. It is named after a beach and iron mine near Santiago de Cuba, where it took shape around 1900. Forget the frozen versions; this is the real thing.',
  mojito:
    'Cool mint, zesty lime and gentle sweetness, lengthened with soda. Its roots are in Havana, and it is famously linked to the bar La Bodeguita del Medio. Perfect on a hot afternoon.',
  old_fashioned:
    'Whiskey sweetened just slightly and seasoned with bitters, so the spirit stays front and centre: rich, warming and smooth. It is one of the oldest cocktails, dating to the early 1800s. A slow sipper for the end of the day.',
  negroni:
    'Bitter Campari, herbal sweet vermouth and dry gin in equal measure: bold, bittersweet and orangey. The story goes that Count Camillo Negroni asked a Florence bartender to strengthen his Americano with gin around 1919. Classic before-dinner drink.',
  martini:
    'Cold, crisp and bracing, with gin botanicals softened by a little dry vermouth. Its exact origin is debated, but it became the defining American cocktail in the early 20th century. Stir it until it is ice cold.',
  manhattan:
    'Spicy rye, rich sweet vermouth and aromatic bitters: deep, smooth and a touch sweet. Created in New York in the 1870s or 80s. An elegant evening drink, especially in cooler months.',
  cosmopolitan:
    'Tart cranberry and lime with citrusy orange liqueur: light, fruity and pink. It became a 1990s icon in New York bars and on TV. Easy-drinking and great for a night out.',
  moscow_mule:
    'Spicy ginger beer, clean vodka and lime: fizzy, sharp and refreshing. It was created in the 1940s partly as a way to sell vodka and ginger beer in America, served in its signature copper mug.',
  dark_stormy:
    'Spicy ginger beer with rich, molasses-y dark rum floating on top like a storm cloud. It comes from Bermuda, where it has been sipped by sailors for over a century.',
  gin_tonic:
    "Bitter-sweet tonic lets the gin's botanicals shine: crisp, dry and refreshing. Tonic's quinine was taken against malaria by the British in India, and gin made it tastier. Use plenty of ice.",
  cuba_libre:
    'Rum and cola, with lime to cut the sweetness. The name means "Free Cuba", and it dates to around 1900 after the Spanish–American War. Simple, sweet and great for a party.',
  whiskey_sour:
    'Whiskey, lemon and sugar in balance, with egg white giving a silky foam if you use it. Sours are among the oldest cocktail styles, first written down in the 1860s. Sweet, tangy and warming.',
  tom_collins:
    'A tall, fizzy gin lemonade: light, citrusy and only lightly sweet. It dates to the 1870s and gave its name to the Collins glass. Ideal for long summer afternoons.',
  paloma:
    'Tequila with tart grapefruit, lime and soda: refreshing, a little bitter and salty-sweet. In Mexico it is arguably more popular than the margarita. Great for warm days and backyard gatherings.',
  screwdriver:
    'Vodka disappears into the orange juice, so it tastes like a sweet, juicy OJ with a kick. Legend says oil workers stirred it with screwdrivers. A brunch classic.',
  tequila_sunrise:
    'Orange juice and tequila with grenadine sinking to the bottom for a sunrise effect: sweet and fruity. Made famous by rock stars in the 1970s. Very photogenic.',
  aperol_spritz:
    'Bittersweet orange Aperol with bubbly prosecco and soda: light, low in alcohol and very refreshing. The go-to aperitivo in northern Italy, enjoyed before dinner in the sun.',
  espresso_martini:
    'Rich coffee, a little sweetness and a velvety foam: wakes you up and winds you down at once. It was created in London in the 1980s by bartender Dick Bradsell. A popular after-dinner drink.',
  white_russian:
    "Coffee liqueur and vodka smoothed with cream, like an iced latte with a kick. Its popularity was revived by the film The Big Lebowski. A dessert drink.",
  black_russian:
    'Coffee liqueur and vodka: dark, sweet and strong. It was created around 1949 in Belgium and is the parent of the White Russian. An after-dinner sipper.',
  pina_colada:
    'Creamy coconut and sweet pineapple with rum: a tropical vacation in a glass. It is the national drink of Puerto Rico, where it was popularised in the 1950s. Best blended and poolside.',
  mai_tai:
    'Two rums with lime, orange liqueur and nutty almond orgeat: strong, tart and complex rather than sugary. Created in California by Trader Vic around 1944. The king of tiki drinks.',
  sidecar:
    'Cognac with orange liqueur and lemon: rich, fruity and tart. Born around the end of World War I, credited to bars in Paris or London. An elegant, grown-up sour.',
  bloody_mary:
    'Savoury tomato, lemon and Worcestershire with vodka: spicy, salty and almost a meal. It took shape in Paris and New York in the 1920s–30s. The ultimate brunch drink.',
  gimlet:
    'Gin and lime with a little sugar: sharp, zesty and clean. Its history is tied to British sailors, who drank lime to prevent scurvy. A bright, simple classic.',
  boulevardier:
    'A Negroni with whiskey instead of gin: warmer, rounder and richer, still bittersweet. Created in 1920s Paris for the writer Erskine Gwynne. A perfect autumn drink.',
  americano:
    'Campari and sweet vermouth topped with soda: bittersweet, light and fizzy. It was the precursor to the Negroni and was popular with Americans visiting Italy. A gentle aperitivo.',
  sea_breeze:
    'Vodka with tart cranberry and grapefruit: dry-ish, fruity and refreshing. A 1980s favourite. Light enough for daytime sipping.',
  cape_codder:
    'Vodka and cranberry, named after Cape Cod, where cranberries grow. Tart, simple and easy to drink.',
  rob_roy:
    "Like a Manhattan, but with Scotch: richer, sometimes smoky, still smooth and sweet. Created in New York in 1894 for an operetta about the Scottish folk hero.",
  gold_rush:
    'Bourbon, honey and lemon: a whiskey sour with a mellow, floral sweetness. Created in New York around 2000 and now a modern classic.',
  bees_knees:
    'Gin, honey and lemon: floral, bright and balanced. A Prohibition-era drink; the name was 1920s slang for "the best".',
  french_75:
    'Gin, lemon and sugar topped with sparkling wine: elegant, crisp and celebratory. Named after a French field gun from World War I because it packs a punch.',
  amaretto_sour:
    'Sweet almond amaretto balanced with lemon: sweet, sour and nutty. Popular since the 1970s. Add egg white for a silky texture.',
  whisky_highball:
    'Whisky and very cold soda: light, crisp and refreshing, letting the whisky show itself gently. Hugely popular in Japan, where it is served in tall, ice-packed glasses.',
  ranch_water:
    'Tequila, lime and lots of bubbles: dry, tart and light. A West Texas favourite, ideal on a hot day.',
  mimosa:
    'Sparkling wine and orange juice: light, sweet and bubbly. Said to come from Paris in the 1920s. The classic brunch drink.',
  kamikaze:
    'Vodka, orange liqueur and lime, usually as a shot: tart, sweet and quick. A 1970s–80s party staple.',
  rum_punch:
    'Fruity orange and pineapple with rum and a little grenadine: sweet, tangy and dangerously easy. Punches are among the oldest mixed drinks, from the Caribbean and British colonial trade.',
  lemon_drop:
    'Vodka, lemon and sugar: tastes like a sweet-and-sour lemon candy. Created in San Francisco in the 1970s.',
  long_island:
    'Five spirits with lemon and cola that somehow taste like iced tea, but it is very strong. It came out of Long Island in the 1970s. Sip slowly.',
  virgin_mojito:
    'All the cool mint and lime of a mojito with soda instead of rum: refreshing, light and sweet-tart. Great for everyone at the table.',
  shirley_temple:
    'Lemon-lime soda with grenadine and a cherry: sweet, fizzy and nostalgic. Named after the child film star in the 1930s.',
  lime_rickey:
    'Lime, a little sugar and soda: very tart and refreshing, like homemade lime soda. A soda-fountain classic.',
  virgin_colada:
    'Creamy coconut and pineapple, blended with ice: all the holiday taste, no rum.',
  sunrise_cooler:
    'Orange juice with soda and grenadine sinking into a red sunrise. Sweet, fruity and fun.',
  ginger_fizz:
    'Spicy ginger beer sharpened with fresh lime: zingy, refreshing and alcohol-free.',

  penicillin:
    'Scotch with honey, ginger and lemon: soothing, spicy and gently smoky. Created in New York in 2005, it is a modern classic.',
  paper_plane:
    'Bourbon, Aperol, amaro and lemon in equal parts: bittersweet, citrusy and very balanced. Created in 2007 and named after a pop song.',
  sazerac:
    "Rye with sugar, Peychaud's bitters and an absinthe rinse: aromatic, spicy and strong. One of America's oldest cocktails, it is the official drink of New Orleans.",
  vieux_carre:
    'Rye, cognac, vermouth and Bénédictine: rich, spicy and complex. Named after the French Quarter of New Orleans, where it was created in the 1930s.',
  rusty_nail:
    'Scotch softened with honeyed, herbal Drambuie: warming and smooth. A 1960s favourite and a classic nightcap.',
  irish_coffee:
    'Hot coffee, Irish whiskey and sugar under a layer of cold cream: warming and indulgent. Created at Foynes airport in Ireland in the 1940s to warm travellers.',
  hot_toddy:
    'Whiskey, honey and lemon with hot water: soothing and comforting. People have long reached for it on cold nights or when they feel a cold coming on.',
  mint_julep:
    'Bourbon, mint and sugar over crushed ice: cold, minty and strong. The official drink of the Kentucky Derby.',
  whiskey_smash:
    'Muddled lemon, mint and bourbon: zesty, herbal and refreshing. An old-style drink revived in the 2000s.',
  brown_derby:
    'Bourbon with grapefruit and honey: bright, tart and gently sweet. Named after a famous Los Angeles restaurant shaped like a hat.',
  kentucky_mule:
    'Bourbon, ginger beer and lime: a warmer, richer take on the Moscow Mule.',
  whiskey_ginger:
    'Whiskey and ginger ale with a squeeze of lime: smooth, sweet and easy. A great pub order.',
  godfather:
    'Scotch with a little amaretto: smooth, nutty and warming. Popular in the 1970s, it is said to be linked to the film of the same name.',
  stinger:
    'Cognac with crème de menthe: cool, minty and strong. A classic high-society nightcap from the early 1900s.',
  brandy_alexander:
    'Cognac, chocolate liqueur and cream: rich and dessert-like. Popular since the early 20th century. Grate nutmeg on top.',
  last_word:
    'Gin, Green Chartreuse, maraschino and lime in equal parts: herbal, sweet and sharp. A Prohibition-era drink from Detroit that was rediscovered in the 2000s.',
  bramble:
    'A gin sour over crushed ice with blackberry liqueur drizzled through it: tart, fruity and pretty. Created in London in the 1980s.',
  clover_club:
    'Gin, lemon and raspberry with egg white: silky, tart and fruity. Named after a Philadelphia gentlemen\'s club in the early 1900s.',
  southside:
    'Gin, lime, sugar and mint shaken and served straight up: fresh and herbal. Linked to Prohibition-era Chicago and New York.',
  vesper:
    'Gin, vodka and Lillet: bone-dry, crisp and very strong. James Bond orders it in the 1953 novel Casino Royale.',
  dirty_martini:
    'A martini with olive brine: salty, savoury and bracing. Ask for it "extra dirty" for more brine.',
  corpse_reviver:
    'Gin, Lillet, orange liqueur and lemon with a hint of absinthe: bright and zesty. Originally meant as a "hair of the dog" morning drink.',
  gin_fizz:
    'Gin, lemon and sugar shaken and topped with soda: bubbly, light and tart. Add egg white for a frothy top.',
  gin_basil_smash:
    'Gin, lemon and lots of fresh basil: bright green, herbal and zesty. Created in Hamburg in 2008.',
  gin_rickey:
    'Gin, lime and soda with no sugar: very dry, tart and refreshing. Created in Washington, D.C. in the 1880s.',
  hugo_spritz:
    'Elderflower liqueur, prosecco, soda and mint: floral, light and bubbly. It comes from the Italian Alps around 2005.',
  french_martini:
    'Vodka, raspberry liqueur and pineapple: fruity, smooth and foamy. A 1980s New York creation.',
  pornstar_martini:
    'Vodka, passion fruit and vanilla with a shot of bubbles on the side: tropical and sweet. Created in London in 2002 and now one of the UK\'s most-ordered cocktails.',
  sex_on_the_beach:
    'Vodka, peach schnapps, orange and cranberry: sweet, fruity and easy. A 1980s beach-bar favourite.',
  woo_woo:
    'Vodka, peach schnapps and cranberry: sweet, tart and fun. A 1980s party drink.',
  blue_lagoon:
    'Vodka, blue curaçao and lemonade: electric blue, sweet and citrusy. Created in Paris in the 1960s.',
  mudslide:
    'Vodka, coffee liqueur and Irish cream: creamy, chocolatey and sweet. Originally from a Caribbean beach bar in the 1970s.',
  godmother:
    'Vodka with amaretto: smooth, sweet and nutty.',
  john_daly:
    'An Arnold Palmer (iced tea and lemonade) with vodka: sweet, tart and refreshing. Named after the golfer.',
  caipirinha:
    'Cachaça muddled with lime and sugar: tart, sweet and grassy. It is the national cocktail of Brazil.',
  hemingway_daiquiri:
    'A daiquiri with grapefruit and maraschino and little sugar: tart, dry and complex. Inspired by Ernest Hemingway\'s time in Havana.',
  mary_pickford:
    'Rum, pineapple and a touch of maraschino and grenadine: fruity and pink. Created in Cuba in the 1920s and named after the film star.',
  strawberry_daiquiri:
    'Rum, lime and strawberries blended with ice: sweet, fruity and frosty. A summer favourite.',
  painkiller:
    'Dark rum, pineapple, orange and coconut with nutmeg: creamy and tropical. From a beach bar in the British Virgin Islands.',
  hurricane:
    'Two rums with passion fruit and citrus: fruity, sweet and strong. Famous at Pat O\'Brien\'s bar in New Orleans since the 1940s.',
  jungle_bird:
    'Dark rum, Campari, pineapple and lime: tropical with a bitter edge. Created in Kuala Lumpur in the 1970s.',
  blue_hawaiian:
    'Rum, blue curaçao, pineapple and coconut: a bright blue, tropical piña colada.',
  bay_breeze:
    'Coconut rum, pineapple and cranberry: sweet, fruity and easy.',
  rum_ginger:
    'Spiced rum and ginger: warm vanilla and spice with a fizzy bite.',
  tommys_margarita:
    'A margarita with agave instead of orange liqueur: cleaner and more tequila-forward. Created at Tommy\'s in San Francisco in the 1990s.',
  spicy_margarita:
    'A margarita with fresh jalapeño: tart, sweet and spicy. Adjust the heat with how many slices you use.',
  oaxaca_old_fashioned:
    'Tequila and smoky mezcal with agave and bitters: rich, earthy and smooth. Created in New York in 2007.',
  mezcal_negroni:
    'A Negroni with smoky mezcal instead of gin: bittersweet, earthy and bold.',
  el_diablo:
    'Tequila, blackcurrant, lime and ginger beer: fruity, spicy and fizzy. It first appeared in a Trader Vic\'s book in the 1940s.',
  pisco_sour:
    'Pisco, lime and egg white: tart, silky and frothy. Both Peru and Chile claim it as their national drink.',
  bellini:
    'White peach purée and prosecco: soft, fruity and bubbly. Created at Harry\'s Bar in Venice in the 1940s.',
  kir_royale:
    'Sparkling wine with blackcurrant liqueur: fruity, elegant and festive. A French classic named after a mayor of Dijon.',
  negroni_sbagliato:
    'Campari and vermouth topped with prosecco instead of gin: lighter and bubbly. "Sbagliato" means "mistaken"; legend says a bartender grabbed the wrong bottle.',
  garibaldi:
    'Campari and orange juice: bittersweet and juicy. Whisk the juice first for the fluffy version served in Milan.',
  fuzzy_navel:
    'Peach schnapps and orange juice: sweet and fruity. A 1980s classic.',
  midori_sour:
    'Melon liqueur with vodka and lemon: bright green, sweet and tangy. Popular since the 1980s.',
  japanese_slipper:
    'Melon liqueur, orange liqueur and lemon: sweet, sour and bright green. Created in Melbourne in 1984.',
  grasshopper:
    'Mint and chocolate liqueurs with cream: like a mint-chocolate milkshake. Created in New Orleans.',
  b52:
    'A layered shot of coffee liqueur, Irish cream and orange liqueur. Sweet, creamy and pretty when layered carefully.',
  sangria:
    'Red wine with brandy, orange and fresh fruit: fruity and refreshing. A Spanish party drink, best made ahead in a big jug.',
  kalimotxo:
    'Red wine and cola: surprisingly tasty, sweet and fizzy. It is a staple at Basque festivals.',
  michelada:
    'Beer with lime, hot sauce and salt: tangy, spicy and refreshing. A Mexican favourite on hot days.',
  shandy:
    'Beer and lemonade: light, sweet and refreshing. A British pub classic.',
  arnold_palmer:
    'Iced tea and lemonade: sweet, tart and refreshing. Named after the golfer, who ordered it this way.',
  cucumber_cooler:
    'Cucumber, lime and soda: crisp, cool and refreshing. Great on hot days.',
  strawberry_lemonade:
    'Muddled strawberries with lemonade: sweet, tart and fruity.',
  virgin_mary:
    'Tomato juice with lemon, Worcestershire and spice: savoury and refreshing.',
  cranberry_spritzer:
    'Cranberry juice and soda: tart, fizzy and light.',
  roy_rogers:
    'Cola with grenadine: sweet, fizzy and fun. The cowboy cousin of the Shirley Temple.',
  apple_ginger_fizz:
    'Apple juice and ginger ale: sweet, crisp and gently spicy.',
  passion_fizz:
    'Passion fruit, vanilla and lime topped with soda: tropical and sweet.',
  espresso_tonic:
    'Espresso poured over tonic: bitter, fizzy and refreshing. A modern café favourite from Scandinavia.',
};
