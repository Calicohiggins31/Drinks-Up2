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
    'Red bitter aperitivo, herbal sweet vermouth and dry gin in equal measure: bold, bittersweet and orangey. The story goes that Count Camillo Negroni asked a Florence bartender to strengthen his Americano with gin around 1919. Classic before-dinner drink.',
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
    'Bittersweet orange aperitivo with bubbly prosecco and soda: light, low in alcohol and very refreshing. The go-to aperitivo in northern Italy, enjoyed before dinner in the sun.',
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
    'Red bitter aperitivo and sweet vermouth topped with soda: bittersweet, light and fizzy. It was the precursor to the Negroni and was popular with Americans visiting Italy. A gentle aperitivo.',
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
    'Bourbon, orange aperitivo, amaro and lemon in equal parts: bittersweet, citrusy and very balanced. Created in 2007 and named after a pop song.',
  sazerac:
    "Rye with sugar, Creole-style bitters and an absinthe rinse: aromatic, spicy and strong. One of America's oldest cocktails, it is the official drink of New Orleans.",
  vieux_carre:
    'Rye, cognac, vermouth and herbal honey liqueur: rich, spicy and complex. Named after the French Quarter of New Orleans, where it was created in the 1930s.',
  rusty_nail:
    'Scotch softened with a honeyed, herbal whisky liqueur: warming and smooth. A 1960s favourite and a classic nightcap.',
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
    'Gin, green herbal liqueur, maraschino and lime in equal parts: herbal, sweet and sharp. A Prohibition-era drink from Detroit that was rediscovered in the 2000s.',
  bramble:
    'A gin sour over crushed ice with blackberry liqueur drizzled through it: tart, fruity and pretty. Created in London in the 1980s.',
  clover_club:
    'Gin, lemon and raspberry with egg white: silky, tart and fruity. Named after a Philadelphia gentlemen\'s club in the early 1900s.',
  southside:
    'Gin, lime, sugar and mint shaken and served straight up: fresh and herbal. Linked to Prohibition-era Chicago and New York.',
  vesper:
    'Gin, vodka and blanc aperitif wine: bone-dry, crisp and very strong. James Bond orders it in the 1953 novel Casino Royale.',
  dirty_martini:
    'A martini with olive brine: salty, savoury and bracing. Ask for it "extra dirty" for more brine.',
  corpse_reviver:
    'Gin, blanc aperitif wine, orange liqueur and lemon with a hint of absinthe: bright and zesty. Originally meant as a "hair of the dog" morning drink.',
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
    'Dark rum, red bitter aperitivo, pineapple and lime: tropical with a bitter edge. Created in Kuala Lumpur in the 1970s.',
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
    'Red bitter aperitivo and vermouth topped with prosecco instead of gin: lighter and bubbly. "Sbagliato" means "mistaken"; legend says a bartender grabbed the wrong bottle.',
  garibaldi:
    'Red bitter aperitivo and orange juice: bittersweet and juicy. Whisk the juice first for the fluffy version served in Milan.',
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

  martinez:
    "Gin and sweet vermouth with a touch of maraschino: rich, round and slightly sweet. Dating to the 1880s, it's widely seen as the ancestor of the dry Martini.",
  bronx:
    'Gin with both vermouths and fresh orange juice: bright, fruity and gently bitter. Created around 1900 and one of the most popular drinks before Prohibition.',
  gin_sour:
    'The sour formula applied to gin: tart, crisp and botanical, with a silky foam if you add egg white. A simple, refreshing classic.',
  pink_gin:
    'Gin with a few dashes of aromatic bitters, which turn it pale pink and add spice. Associated with the British Royal Navy, where bitters were taken as a stomach remedy.',
  white_lady:
    'Gin, orange liqueur and lemon: zesty, dry and elegant. Linked to Harry MacElhone and the Savoy in London in the 1920s.',
  army_navy:
    'A gin sour sweetened with nutty almond orgeat: tart, smooth and slightly creamy. Named, so the story goes, after the annual Army-Navy football game.',
  gin_gin_mule:
    'Gin, lime, mint and a splash of ginger beer: like a mojito crossed with a Moscow Mule. Created in New York in 2000 and now a modern classic.',
  elderflower_gt:
    'A gin and tonic with a splash of elderflower liqueur: softer, floral and summery. Cucumber makes it extra refreshing.',
  bijou:
    'Equal parts gin, sweet vermouth and green herbal liqueur: herbal, sweet and powerful. Its three colours were said to look like gems: diamond, ruby and emerald.',
  twentieth_century:
    'Gin, blanc aperitif wine, chocolate liqueur and lemon: surprisingly bright, with a hint of cocoa. Named after a famous New York–Chicago train in the 1930s.',
  lillet_tonic:
    'Fruity, floral blanc aperitif wine with tonic over lots of ice: light, bittersweet and low in alcohol. A popular French aperitif.',
  gin_and_juice:
    'Gin with orange and grapefruit juice: easy, fruity and refreshing. Made famous by the 1990s hip-hop song.',
  greyhound:
    'Vodka and grapefruit juice: tart, slightly bitter and refreshing. Known since the 1930s.',
  salty_dog:
    "A Greyhound served in a salt-rimmed glass. The salt softens the grapefruit's bitterness and makes it pop.",
  madras:
    'Vodka with cranberry and orange juice: fruity, tart and sweet. Named after the colourful plaid fabric from India.',
  vodka_gimlet:
    'Vodka, lime and sugar: clean, sharp and simple. A cleaner, less botanical take on the gin original.',
  apple_martini:
    'Vodka with apple juice and a little lemon: crisp, sweet and fruity. This fresh version is less sugary than the neon-green 1990s appletini.',
  chocolate_martini:
    'Vodka, chocolate liqueur and Irish cream: smooth, rich and sweet. A dessert drink.',
  electric_lemonade:
    'Vodka and blue curaçao with lemon and lemon-lime soda: bright blue, sweet and sour. A fun party drink.',
  melon_ball:
    'Melon liqueur, vodka and pineapple: sweet, fruity and bright green. A 1980s favourite.',
  caipiroska:
    'A caipirinha made with vodka instead of cachaça: tart, sweet and clean. Popular in Brazil and across Europe.',
  rossini:
    'Fresh strawberry purée topped with prosecco: sweet, fruity and bubbly. A strawberry cousin of the Bellini, named after the Italian composer.',
  poinsettia:
    'Cranberry, orange liqueur and sparkling wine: tart, bright red and festive. Popular at holiday parties.',
  champagne_cocktail:
    'A sugar cube soaked in bitters, topped with bubbles: dry, spiced and elegant. One of the oldest recorded cocktails, from the mid-1800s.',
  campari_spritz:
    'A spritz made with red bitter aperitivo instead of orange aperitivo: more bitter, deeper red and less sweet. A favourite in Milan.',
  st_germain_cocktail:
    'Elderflower liqueur with sparkling wine and soda: floral, light and refreshing.',
  death_in_the_afternoon:
    "Absinthe topped with champagne, which turns cloudy and opalescent: strong, anise-flavoured and bubbly. Named after Ernest Hemingway's 1932 book, and he is credited with the recipe.",
  kir:
    "Dry white wine with a little blackcurrant liqueur: fruity and light. Named after Félix Kir, a mayor of Dijon who promoted the region's wine and cassis.",
  wine_spritzer:
    'White wine lengthened with soda: light, crisp and low in alcohol. Good for hot afternoons.',
  bicicletta:
    'Red bitter aperitivo and white wine with soda: bittersweet, light and fizzy. The name means "bicycle" in Italian, supposedly after older men wobbling home on their bikes.',
  white_sangria:
    'White wine with peach, apple and fresh fruit: light, fruity and refreshing. Make a big jug ahead for a party.',
  mulled_wine:
    'Red wine gently heated with honey, cinnamon and orange: warming and spiced. A winter tradition across Europe, especially at Christmas markets.',
  rum_old_fashioned:
    'Dark rum with sugar and bitters: rich, molasses-y and smooth. A great way to show off a good aged rum.',
  rum_swizzle:
    'Two rums with pineapple, orange, grenadine and bitters: fruity and strong. Often called the national drink of Bermuda.',
  planters_punch:
    'Dark rum, lime, sugar and bitters: tangy, fruity and warming. A Jamaican classic going back to the 1800s.',
  bahama_mama:
    'Dark and coconut rum with pineapple, orange and grenadine: sweet and tropical. A beach-bar favourite.',
  el_presidente:
    'White rum, dry vermouth, orange liqueur and grenadine: elegant, fruity and smooth. Created in Havana in the 1920s and named after a Cuban president.',
  air_mail:
    'Rum, honey and lime topped with sparkling wine: bright, honeyed and bubbly. It first appeared in print in the 1940s.',
  queens_park_swizzle:
    "Dark rum with lime, mint and sugar over crushed ice, topped with bitters: minty, strong and refreshing. Created at the Queen's Park Hotel in Trinidad in the 1920s.",
  canchanchara:
    "Rum, honey and lime: simple, tart and honeyed. One of Cuba's oldest drinks, from the city of Trinidad.",
  hot_spiced_cider:
    'Warm apple cider with cinnamon and spiced rum: cosy, sweet and spiced. Perfect for cold evenings.',
  batanga:
    'Tequila, lime and cola in a salt-rimmed glass: sweet, salty and refreshing. Created at La Capilla bar in Tequila, Mexico.',
  matador:
    'Tequila with pineapple and lime: fruity, tart and easy. A simple crowd-pleaser.',
  bloody_maria:
    'A Bloody Mary made with tequila: savoury, spicy and earthier than the vodka version.',
  mezcal_mule:
    'Smoky mezcal with lime and ginger beer: spicy, smoky and refreshing. A modern favourite.',
  siesta:
    'Tequila, red bitter aperitivo, grapefruit and lime: bittersweet, tart and refreshing. Created in New York in 2006.',
  cantarito:
    'Tequila with orange, grapefruit and lime, topped with soda: fruity, salty and refreshing. Traditionally served in a clay pot in Jalisco, Mexico.',
  ward_eight:
    'Rye with lemon, orange and grenadine: tart, fruity and gently spicy. Created in Boston in 1898 and named after a political ward.',
  bobby_burns:
    'Scotch, sweet vermouth and a touch of herbal honey liqueur: rich, herbal and smooth. Named after the Scottish poet Robert Burns.',
  black_manhattan:
    'A Manhattan made with amaro instead of vermouth: darker, more bitter and complex. Created in San Francisco in the 2000s.',
  perfect_manhattan:
    'A Manhattan with equal parts sweet and dry vermouth: drier and lighter than the classic. "Perfect" means the vermouth is split in two.',
  presbyterian:
    'Scotch topped with ginger ale and soda: light, gingery and refreshing. A simple, old-fashioned highball.',
  horses_neck:
    'Brandy and ginger ale with bitters and a long lemon peel: gingery and refreshing. It began as an alcohol-free drink in the 1890s; the brandy came later.',
  new_york_sour:
    'A whiskey sour with a float of red wine: tart, sweet and fruity, with a striking two-tone look. Dates to the 1880s.',
  boilermaker:
    "A shot of whiskey with a beer, either sipped side by side or dropped in. A classic working-man's drink.",
  maple_old_fashioned:
    'An Old Fashioned sweetened with maple syrup: rich, cosy and autumnal.',
  between_the_sheets:
    'Cognac, rum, orange liqueur and lemon: strong, citrusy and smooth. A cousin of the Sidecar from the 1920s.',
  champs_elysees:
    'Cognac with green herbal liqueur, lemon and bitters: herbal, tart and elegant. Named after the famous avenue in Paris.',
  brandy_old_fashioned:
    'Brandy with muddled orange, cherry, sugar and bitters, topped with soda: sweet, fruity and easy. It is the signature drink of Wisconsin.',
  chilcano:
    'Pisco with lime and ginger ale: light, gingery and refreshing. A favourite highball in Peru.',
  carajillo:
    'Hot espresso with brandy over ice: strong, bitter and warming. A Spanish after-dinner tradition.',
  brandy_milk_punch:
    'Brandy with milk, vanilla and sugar: creamy, smooth and comforting. A New Orleans brunch favourite.',
  toasted_almond:
    'Coffee liqueur, amaretto and cream: nutty, sweet and creamy. Like a dessert in a glass.',
  baby_guinness:
    'Coffee liqueur topped with a little Irish cream so it looks like a tiny pint of stout. A popular party shot.',
  absinthe_frappe:
    'Absinthe shaken with sugar and crushed ice: cold, strong and anise-flavoured. A New Orleans drink from the 1870s.',
  baileys_coffee:
    'Hot coffee with Irish cream: creamy, sweet and warming. A cosy after-dinner drink.',
  eggnog:
    'Whiskey or rum with milk, cream, sugar and egg: rich, creamy and festive. A holiday tradition with roots in old English possets. Uses raw egg, so use fresh, pasteurised eggs if you can.',
  rum_flip:
    'Rum shaken with sugar and a whole egg: rich, silky and warming. Flips date back to colonial times. Uses raw egg, so use fresh, pasteurised eggs if you can.',
  virgin_margarita:
    'Lime and orange with agave in a salt-rimmed glass: tart, sweet and salty. All the margarita flavour without the tequila.',
  virgin_paloma:
    'Grapefruit, lime and soda with a salty rim: tart, bitter-sweet and refreshing.',
  cinderella:
    'Orange, pineapple and lemon with a splash of grenadine: fruity, sweet and colourful. A classic alcohol-free party drink.',
  tropical_punch:
    'Pineapple, orange and passion fruit with lime and grenadine: sweet, tangy and tropical.',
  basil_lemon_smash:
    'Fresh basil with lemon and soda: herbal, zesty and refreshing.',
  mint_lemonade:
    'Lemonade with fresh mint: cool, sweet and tart. Popular across the Middle East.',
  peach_iced_tea:
    'Iced tea sweetened with peach: fruity, smooth and refreshing. A Southern US favourite.',
  cherry_limeade:
    'Lime and grenadine with lemon-lime soda: sweet, tart and fizzy. A soda-fountain classic.',
  cranberry_mule_mocktail:
    'Cranberry, lime and ginger beer: tart, spicy and festive.',
  virgin_bellini:
    'Peach purée with fizzy soda: sweet, fruity and bubbly.',
  warm_spiced_apple:
    'Hot apple cider with cinnamon: cosy, sweet and spiced.',
  honey_lemon_soother:
    "Warm honey and lemon: soothing and comforting. A favourite when you're feeling under the weather.",

  vodka_tonic:
    'Vodka and tonic with a squeeze of lime: crisp, clean and lightly bitter. One of the most ordered drinks at any bar.',
  vodka_soda:
    'Vodka, soda and lime: about as light and simple as a mixed drink gets. A favourite for people who want something low in sugar.',
  vodka_martini:
    'A martini made with vodka instead of gin: smoother and cleaner, with just a hint of vermouth. Shaken or stirred, it should be ice cold.',
  vodka_lemonade:
    'Vodka topped with lemonade: sweet, tart and easy. A go-to for barbecues and big batches.',
  vodka_sour:
    'Vodka, lemon and sugar, with egg white for a silky foam if you like: bright and tart, letting the citrus shine.',
  appletini:
    'Vodka with sour apple schnapps and a little lemon: sweet, tangy and bright green. A 1990s icon that\'s still a crowd-pleaser.',
  watermelon_cooler:
    'Fresh watermelon, vodka and lime topped with soda: juicy, light and made for hot days.',
  cucumber_smash:
    'Muddled cucumber with vodka, lime and a little sugar: cool, crisp and garden-fresh.',
  raspberry_lemon_drop:
    'A Lemon Drop sweetened with raspberry: pink, sweet-tart and dangerously easy to drink.',
  cranberry_mule:
    'A Moscow Mule with a splash of cranberry: spicy, tart and festive. Popular around the holidays.',
  vodka_collins:
    'A Tom Collins made with vodka: a tall, fizzy, lightly sweet lemonade with a clean kick.',
  hairy_navel:
    'A Fuzzy Navel with a shot of vodka: peachy, juicy and a little stronger.',
  vodka_bay_breeze:
    'Vodka with pineapple and cranberry: fruity, pink and refreshing. A close cousin of the Sea Breeze.',
  gibson:
    'A gin martini garnished with a cocktail onion instead of an olive or twist: crisp, dry and slightly savoury. It dates to the early 1900s.',
  gin_buck:
    'Gin, lime and ginger ale: a \'buck\' is an old name for a spirit with ginger and citrus. Light, zesty and easy.',
  gin_daisy:
    'Gin, lemon and grenadine served over crushed ice: tart, fruity and pink. Daisies were a popular style in the late 1800s.',
  ramos_gin_fizz:
    'Gin, citrus, cream and egg white shaken long and hard, then topped with soda so a tall foam rises: light, creamy and citrusy. Created in New Orleans in 1888. The classic recipe also uses a few drops of orange flower water.',
  cucumber_gimlet:
    'A gimlet with muddled cucumber: sharp lime softened by cool, fresh cucumber.',
  strawberry_gin_smash:
    'Muddled strawberries with gin, lemon and a touch of basil: fruity, bright and summery.',
  gin_sling:
    'Gin, lemon and sugar lengthened with soda: one of the oldest styles of mixed drink, simple and refreshing.',
  fitzgerald:
    'A gin sour with a couple of dashes of bitters: tart, crisp and a little spiced. A modern classic from the 1990s.',
  elderflower_collins:
    'A Tom Collins with elderflower liqueur: floral, fizzy and light.',
  banana_daiquiri:
    'Rum, lime and banana blended with ice: creamy, fruity and frosty. A beach-bar favourite.',
  rum_sour:
    'Rum, lemon and sugar, with egg white for foam if you like: rounder and sweeter than most sours.',
  pineapple_mojito:
    'A mojito with pineapple juice: minty, limey and tropical.',
  strawberry_mojito:
    'A mojito with muddled strawberries: sweet, minty and pink. Popular in summer.',
  coconut_mojito:
    'A mojito made with coconut rum: minty and limey with a tropical, creamy edge.',
  rum_collins:
    'A Collins made with rum: tall, lemony and sparkling.',
  bushwacker:
    'Rum, coffee liqueur, chocolate liqueur, coconut and milk blended with ice: a boozy milkshake from the Virgin Islands, later famous on Florida\'s Gulf Coast.',
  mojito_royale:
    'A mojito topped with sparkling wine instead of soda: minty, limey and celebratory.',
  ti_punch:
    'Rum with a squeeze of lime and a little cane sugar: strong and simple. It\'s the everyday drink of Martinique and Guadeloupe, where it\'s made with rhum agricole.',
  coquito:
    'Rum with coconut, milk, sugar and cinnamon: a rich, creamy Puerto Rican holiday drink, often called Puerto Rican eggnog. Traditional recipes use condensed and evaporated milk; this is a simpler version.',
  coconut_rum_pineapple:
    'Coconut rum and pineapple juice over ice: sweet, tropical and as easy as it gets.',
  frozen_margarita:
    'Tequila, orange liqueur and lime blended with ice: slushy, tart and refreshing. The frozen margarita machine was invented in Dallas in 1971.',
  strawberry_margarita:
    'A margarita with fresh strawberries: sweet, tart and pink. Blend it frozen or shake it on the rocks.',
  watermelon_margarita:
    'A margarita with fresh watermelon: juicy, light and perfect for summer.',
  pineapple_margarita:
    'A margarita with pineapple juice: tropical, sweet and tart.',
  blue_margarita:
    'A margarita made with blue curaçao instead of triple sec: the same tangy taste in electric blue.',
  mexican_mule:
    'A mule made with tequila: spicy ginger beer, lime and agave.',
  mezcal_margarita:
    'A margarita made with mezcal: tart and bright with a smoky finish.',
  tequila_sour:
    'Tequila, lime and sugar, with egg white if you like: tart, earthy and smooth.',
  spicy_paloma:
    'A Paloma with fresh jalapeño: grapefruit, lime and a little heat.',
  tequila_tonic:
    'Tequila topped with tonic and lime: earthy, bitter-sweet and crisp.',
  mezcal_paloma:
    'A Paloma made with mezcal: grapefruit, lime and soda with a smoky edge.',
  whiskey_cola:
    'Whiskey and cola over ice: sweet, smooth and simple. One of the most common bar orders anywhere.',
  irish_mule:
    'A mule made with Irish whiskey: smooth whiskey, spicy ginger beer and lime.',
  old_pal:
    'Rye, red bitter aperitivo and dry vermouth in equal parts: drier and sharper than a Boulevardier. Recorded in Paris in the 1920s.',
  scofflaw:
    'Rye, dry vermouth, lemon and grenadine: tart, fruity and spicy. Created in Paris in 1924 and named after the slang for people who flouted Prohibition.',
  bourbon_lemonade:
    'Bourbon with lemonade and a little mint: sweet, tart and made for a summer porch.',
  peach_smash:
    'Bourbon with peach, lemon and mint over crushed ice: juicy, fresh and Southern.',
  john_collins:
    'A Collins made with bourbon: tall, lemony and sparkling, with a warmer flavour than gin.',
  algonquin:
    'Rye, dry vermouth and pineapple: a little tropical, a little spicy. Named after New York\'s Algonquin Hotel.',
  mamie_taylor:
    'Scotch, lime and ginger beer: a forerunner of the Moscow Mule, popular around 1900.',
  cinnamon_apple_highball:
    'Cinnamon whisky with apple cider: like apple pie in a glass. A fall party favourite.',
  bourbon_cider:
    'Bourbon topped with hard cider: crisp apple and warm vanilla. Great in autumn.',
  brandy_sour:
    'Brandy, lemon and sugar: rich, fruity and tart. Hugely popular in Cyprus, where it\'s a national favourite.',
  japanese_cocktail:
    'Brandy with almond syrup and bitters: nutty, smooth and aromatic. It appeared in the first bartending book, from 1862.',
  pisco_punch:
    'Pisco with pineapple and lime: fruity and dangerously smooth. It was famous in San Francisco in the late 1800s.',
  brandy_smash:
    'Brandy with muddled lemon and mint over crushed ice: fresh, bright and warming at the same time.',
  french_connection:
    'Cognac with a little amaretto: smooth, nutty and warming. A cousin of the Godfather.',
  frose:
    'Frozen rosé blended with strawberries and lemon: a slushy, pink summer drink that became a hit in 2016.',
  rose_spritz:
    'Rosé lengthened with soda, and a splash of elderflower if you like: light, fruity and refreshing.',
  black_velvet:
    'Stout and sparkling wine layered in a flute: rich and dry. Created in London in 1861 to mourn Prince Albert.',
  snakebite:
    'Half lager, half hard cider: crisp, sweet and fizzy. A British pub favourite.',
  beergarita:
    'A margarita topped with cold beer: tart, salty and fizzy. A backyard party favourite.',
  limoncello_spritz:
    'Limoncello with prosecco and soda: sunny, sweet and lemony. The Italian lemon liqueur at its most refreshing.',
  chelada:
    'Beer with lime juice and a salted rim: crisp, tart and refreshing. A simpler cousin of the Michelada.',
  mulled_cider:
    'Hard cider gently warmed with cinnamon, honey and orange: cosy and spiced.',
  tinto_de_verano:
    'Red wine with lemon-lime soda over ice: \'summer red wine\', what many Spaniards actually drink instead of sangria.',
  aperitivo_sour:
    'Orange aperitivo shaken with lemon and sugar: bittersweet, tart and silky with egg white. Low in alcohol.',
  bitter_soda:
    'Red bitter aperitivo topped with soda: bright red, bitter and refreshing. A classic before-dinner drink in Milan.',
  washington_apple:
    'Whisky, sour apple schnapps and cranberry: sweet, tart and fruity. Often served as a shot.',
  green_tea_shot:
    'Irish whiskey, peach schnapps and sweet-and-sour, topped with a splash of soda: it tastes like sweet iced tea, though it contains no tea. A popular party shot.',
  mind_eraser:
    'Coffee liqueur, vodka and soda layered over ice and drunk quickly through a straw: sweet, strong and fizzy.',
  amaretto_stone_sour:
    'Amaretto, lemon and orange juice: a fruitier, softer Amaretto Sour.',
  irish_cream_hot_chocolate:
    'Hot chocolate with Irish cream liqueur: rich, creamy and cosy.',
  peppermint_hot_chocolate:
    'Hot chocolate with mint liqueur: like a chocolate-mint candy in a mug.',
  mexican_coffee:
    'Hot coffee with tequila and coffee liqueur, topped with cream: warming and smooth.',
  brave_bull:
    'Tequila with coffee liqueur: a tequila twist on the Black Russian, strong and sweet.',
  dirty_shirley:
    'A Shirley Temple with vodka: lemon-lime soda, grenadine and a cherry. Sweet, fizzy and nostalgic, it\'s had a big comeback.',
  long_beach:
    'A Long Island Iced Tea topped with cranberry instead of cola: fruity, pink and strong.',
  tokyo_tea:
    'A Long Island Iced Tea made with melon liqueur and lemon-lime soda: bright green, sweet and strong.',
  orange_crush:
    'Fresh orange juice, vodka and orange liqueur with a splash of soda: juicy and fizzy. The signature drink of Ocean City, Maryland.',
  watermelon_agua_fresca:
    'Blended watermelon with lime and a little sugar: light, fresh and hydrating. Agua fresca means \'fresh water\' in Spanish.',
  coconut_lime_cooler:
    'Coconut water with lime and mint: light, hydrating and refreshing.',
  pineapple_ginger_fizz:
    'Pineapple juice with spicy ginger beer and lime: tropical with a kick.',
  raspberry_lemonade:
    'Lemonade with raspberry syrup: pink, sweet and tart.',
  virgin_strawberry_daiquiri:
    'Strawberries, lime and sugar blended with ice: all the frosty fun, no rum.',
  virgin_sangria:
    'Cranberry, orange and apple juice with fruit and soda: fruity and festive, with no alcohol.',
  ginger_mint_lemonade:
    'Lemonade with ginger syrup and fresh mint: zingy and refreshing.',
  creamsicle_fizz:
    'Orange juice, vanilla and cream topped with soda: like an orange creamsicle in a glass.',
  cucumber_mint_lemonade:
    'Lemonade with muddled cucumber and mint: cool and spa-like.',
  pink_lemonade:
    'Lemonade tinted pink with grenadine or cranberry: sweet, tart and a summer fair classic.',
  no_gin_tonic:
    'Tonic with lime and cucumber over lots of ice: crisp and bitter, the G&T ritual without the gin.',
  pineapple_nojito:
    'An alcohol-free pineapple mojito: mint, lime and pineapple topped with soda.',
  shirley_ginger:
    'A Shirley Temple made with ginger ale and a squeeze of lime: sweet, spicy and fizzy.',
  passion_fruit_lemonade:
    'Lemonade with passion fruit: tropical, tart and fragrant.',
  peach_lemonade:
    'Lemonade with peach purée: sweet, fruity and summery.',
  strawberry_basil_soda:
    'Muddled strawberries and basil with lemon and soda: sweet, herbal and refreshing.',
  vanilla_iced_latte:
    'Espresso with vanilla and milk over ice: smooth, sweet café-style coffee with no alcohol.',

  vodka_ginger:
    'Vodka with ginger ale and a squeeze of lime: smooth, lightly spicy and easy. A simple bar staple.',
  vodka_lemon_lime:
    'Vodka topped with lemon-lime soda: sweet, citrusy and fizzy. About as easy as mixed drinks get.',
  vodka_pineapple:
    'Vodka and pineapple juice: sweet, tropical and smooth. A quick crowd-pleaser.',
  vodka_cola:
    'Vodka and cola with lime: sweet and bubbly, letting the cola do the talking.',
  spiked_sweet_tea:
    'Sweet iced tea with vodka and lemon: a Southern porch favourite that\'s dangerously easy to sip.',
  strawberry_vodka_lemonade:
    'Muddled strawberries with vodka and lemonade: sweet, tart and pink. Perfect for summer.',
  peach_vodka_lemonade:
    'Peach purée, vodka and lemonade: fruity, sweet and refreshing.',
  pineapple_mule:
    'A Moscow Mule with pineapple juice: spicy ginger, sharp lime and tropical sweetness.',
  mango_mule:
    'A Moscow Mule with mango: fruity, spicy and refreshing.',
  vodka_mojito:
    'A mojito made with vodka instead of rum: cleaner and crisper, with all the mint and lime.',
  vodka_sunrise:
    'Vodka, orange juice and grenadine sinking to the bottom: sweet, fruity and pretty.',
  vodka_coconut_water:
    'Vodka with coconut water and lime: light, hydrating and lower in sugar than most mixers.',
  vodka_spritz:
    'Vodka with lemon, a little sugar, sparkling wine and soda: light, bright and bubbly.',
  raspberry_vodka_soda:
    'Vodka and soda with raspberry and lime: lightly sweet, fruity and fizzy.',
  spiked_cherry_limeade:
    'Lime, grenadine and lemon-lime soda with vodka: sweet, tart and nostalgic.',
  holiday_punch:
    'Vodka with cranberry and orange juice, topped with sparkling wine: festive, fruity and bubbly. Easy to scale up for a party bowl.',
  long_island_lemonade:
    'A Long Island Iced Tea topped with lemon-lime soda instead of cola: brighter, lemony and just as strong.',
  gin_soda:
    'Gin, soda and lime: crisp, dry and light, letting the gin\'s botanicals show.',
  gin_lemonade:
    'Gin topped with lemonade: sweet, tart and herbal. A summer garden favourite.',
  gin_ginger:
    'Gin with ginger ale and lemon: gently spicy, herbal and refreshing.',
  gin_grapefruit:
    'Gin with fresh grapefruit juice: tart, bitter-sweet and refreshing.',
  gin_cranberry:
    'Gin with cranberry and lime: tart, fruity and herbal.',
  gin_lemon_lime:
    'Gin topped with lemon-lime soda: sweet, citrusy and easy.',
  pink_gin_tonic:
    'A gin and tonic with a touch of raspberry: fruity, pink and refreshing.',
  cucumber_gin_tonic:
    'A gin and tonic with fresh cucumber: extra cool and crisp. A popular way to serve G&Ts in Spain and the UK.',
  gin_mule:
    'A Moscow Mule made with gin: herbal gin, spicy ginger beer and lime.',
  gin_spritz:
    'Gin with sparkling wine and soda: light, crisp and celebratory.',
  orange_blossom:
    'Gin and fresh orange juice with a little sugar: bright and fruity. A popular Prohibition-era drink, when fresh juice helped hide rough gin.',
  fifty_fifty_martini:
    'Equal parts gin and dry vermouth: softer, lighter and more aromatic than a dry martini. A classic from the early 1900s, loved by bartenders.',
  red_snapper:
    'A Bloody Mary made with gin: savoury and spicy with a herbal edge. Some say it predates the vodka version.',
  rum_pineapple:
    'Rum with pineapple juice: sweet, tropical and simple. Try it with dark or spiced rum too.',
  rum_orange:
    'Rum with orange juice: sweet, sunny and easy.',
  rum_cranberry:
    'Rum with cranberry and lime: tart, fruity and refreshing.',
  rum_lemonade:
    'Rum topped with lemonade: sweet, tangy and easy. Spiced rum makes it warmer.',
  spiced_rum_cola:
    'Spiced rum and cola with lime: vanilla, spice and fizz. One of the most popular bar orders.',
  coconut_rum_cranberry:
    'Coconut rum with cranberry juice: sweet, tart and tropical.',
  coconut_rum_cola:
    'Coconut rum with cola and lime: like a coconut cola.',
  rum_rickey:
    'Rum, lime and soda with no sugar: tart, dry and refreshing.',
  rum_sunrise:
    'Rum, orange juice and grenadine: fruity, sweet and colourful.',
  frozen_daiquiri:
    'Rum, lime and sugar blended with ice: tart, slushy and refreshing. A Havana favourite famously enjoyed at El Floridita bar.',
  mango_daiquiri:
    'Rum, lime and mango blended with ice: tropical, sweet and frosty.',
  coconut_daiquiri:
    'Rum, lime and coconut cream: creamy, tart and tropical.',
  mango_mojito:
    'A mojito with mango: minty, limey and tropical.',
  raspberry_mojito:
    'A mojito sweetened with raspberry: minty, tart and pink.',
  watermelon_mojito:
    'A mojito with fresh watermelon: juicy, minty and summery.',
  cucumber_mojito:
    'A mojito with muddled cucumber: extra cool and refreshing.',
  hot_buttered_rum:
    'Dark rum, butter, sugar and spices topped with hot water: rich and warming. A New England winter classic from colonial times.',
  blue_hawaii:
    'Vodka, rum and blue curaçao with pineapple and sweet-and-sour: bright blue and tropical. Created in Hawaii in 1957. Not to be confused with the creamy Blue Hawaiian.',
  tequila_lemon_lime:
    'Tequila topped with lemon-lime soda and lime: sweet, citrusy and easy.',
  tequila_cranberry:
    'Tequila with cranberry and lime: tart, fruity and earthy.',
  tequila_lemonade:
    'Tequila topped with lemonade: sweet, tart and refreshing.',
  tequila_mojito:
    'A mojito made with tequila and agave: minty, limey and earthy.',
  tequila_old_fashioned:
    'Tequila stirred with agave and bitters: smooth and warming. Reposado or añejo tequila works best.',
  mango_margarita:
    'A margarita with mango: sweet, tart and tropical. Great frozen or on the rocks.',
  coconut_margarita:
    'A margarita with coconut cream: creamy, tart and tropical.',
  cranberry_margarita:
    'A margarita with cranberry juice: tart, festive and pink.',
  skinny_margarita:
    'Tequila, lime, a splash of orange juice and a little agave: lighter and less sweet than a classic margarita.',
  cucumber_margarita:
    'A margarita with muddled cucumber: cool, crisp and tart.',
  grapefruit_margarita:
    'A margarita with grapefruit: tart, slightly bitter and refreshing.',
  raspberry_margarita:
    'A margarita with raspberry: tart, fruity and pink.',
  peach_margarita:
    'A margarita with peach: sweet, juicy and summery.',
  mexican_martini:
    'A margarita shaken hard and served up with olive brine and olives: tart, salty and strong. A famous Austin, Texas favourite.',
  bourbon_sweet_tea:
    'Sweet iced tea with bourbon and lemon: smooth and Southern.',
  bourbon_peach_tea:
    'Peach iced tea with bourbon: fruity, smooth and refreshing.',
  bourbon_cranberry:
    'Bourbon with cranberry and lime: tart, fruity and warming.',
  maple_bourbon_sour:
    'A whiskey sour sweetened with maple syrup: rich, tart and cosy.',
  bourbon_iced_coffee:
    'Chilled coffee with bourbon, a little sugar and milk: smooth and energising.',
  bourbon_hot_chocolate:
    'Hot chocolate with bourbon: rich, warming and indulgent.',
  bourbon_milk_punch:
    'Bourbon, milk, vanilla and sugar with nutmeg: creamy and smooth. A New Orleans brunch classic.',
  cinnamon_whisky_cola:
    'Cinnamon whisky and cola: sweet and spicy, like a cinnamon cola.',
  cherry_whiskey_cola:
    'Whiskey and cola with a splash of grenadine and a cherry: sweet, fizzy and nostalgic.',
  brandy_manhattan:
    'A Manhattan made with brandy: fruity, rich and smooth. Especially popular in Wisconsin.',
  brandy_highball:
    'Brandy and soda with lemon: light, fruity and refreshing.',
  amaretto_cola:
    'Amaretto and cola: sweet and nutty, and many people say it tastes like cherry cola.',
  coffee_cream:
    'Coffee liqueur with milk or cream over ice: sweet, creamy and simple.',
  pineapple_mimosa:
    'Sparkling wine with pineapple juice: a tropical twist on the brunch classic.',
  cranberry_mimosa:
    'Sparkling wine with cranberry juice: tart, red and festive.',
  grapefruit_mimosa:
    'Sparkling wine with grapefruit juice: tart, pink and less sweet than a classic mimosa.',
  mango_mimosa:
    'Sparkling wine with mango: tropical, sweet and bubbly.',
  apple_cider_mimosa:
    'Sparkling wine with apple cider: crisp and autumnal.',
  beermosa:
    'Beer topped with orange juice: light, fruity and easy. A tailgate brunch favourite.',
  lemon_drop_shot:
    'Vodka, lemon and sugar in a sugar-rimmed shot glass: sweet-sour and smooth.',
  tequila_shot:
    'The classic: lick the salt, drink the tequila, bite the lime. The salt and lime soften the tequila\'s bite.',
  scooby_snack:
    'Coconut rum, melon liqueur, pineapple and cream: a sweet, creamy, green party shot.',
  white_gummy_bear:
    'Vodka and peach schnapps with a splash of lemon-lime soda: tastes like peach gummy candy.',
  mango_lemonade:
    'Lemonade with mango: sweet, tart and tropical.',
  pineapple_lemonade:
    'Lemonade with pineapple juice: sweet, tangy and tropical.',
  mango_nojito:
    'An alcohol-free mango mojito: mint, lime and mango topped with soda.',
  strawberry_nojito:
    'An alcohol-free strawberry mojito: mint, lime and berries topped with soda.',
  virgin_mango_margarita:
    'Mango, lime and orange blended with ice: all the margarita fun, no tequila.',
  virgin_mango_colada:
    'Mango, pineapple and coconut blended with ice: creamy and tropical.',
  virgin_cosmo:
    'Cranberry, orange and lime: pink and tart, the Cosmopolitan without the vodka.',
  virgin_mai_tai:
    'Orange, pineapple, lime, almond and grenadine: tiki flavour with no rum.',
  cranberry_orange_punch:
    'Cranberry and orange juice with lemon-lime soda: fruity and fizzy. Easy to make by the jug.',
  orange_spritzer:
    'Orange juice lengthened with soda: lighter, fizzier and less sweet.',
  cranberry_ginger_ale:
    'Cranberry juice and ginger ale: tart, spicy and festive.',
  grapefruit_tonic:
    'Grapefruit juice and tonic: bitter, tart and grown-up.',
  lime_soda:
    'Fresh lime with sugar, a pinch of salt and soda: sweet, salty and tart. A beloved street drink across India.',
  lemon_lime_bitters:
    'Lemon-lime soda with lime and a few dashes of aromatic bitters: tart and refreshing. Australia\'s classic pub soft drink. Bitters contain a trace of alcohol, but it\'s served as a soft drink.',
  raspberry_iced_tea:
    'Iced tea with raspberry and lemon: fruity and refreshing.',
};
