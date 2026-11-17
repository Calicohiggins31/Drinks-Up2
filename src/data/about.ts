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

  martinez:
    "Gin and sweet vermouth with a touch of maraschino: rich, round and slightly sweet. Dating to the 1880s, it's widely seen as the ancestor of the dry Martini.",
  bronx:
    'Gin with both vermouths and fresh orange juice: bright, fruity and gently bitter. Created around 1900 and one of the most popular drinks before Prohibition.',
  gin_sour:
    'The sour formula applied to gin: tart, crisp and botanical, with a silky foam if you add egg white. A simple, refreshing classic.',
  pink_gin:
    'Gin with a few dashes of Angostura bitters, which turn it pale pink and add spice. Associated with the British Royal Navy, where bitters were taken as a stomach remedy.',
  white_lady:
    'Gin, orange liqueur and lemon: zesty, dry and elegant. Linked to Harry MacElhone and the Savoy in London in the 1920s.',
  army_navy:
    'A gin sour sweetened with nutty almond orgeat: tart, smooth and slightly creamy. Named, so the story goes, after the annual Army-Navy football game.',
  gin_gin_mule:
    'Gin, lime, mint and a splash of ginger beer: like a mojito crossed with a Moscow Mule. Created in New York in 2000 and now a modern classic.',
  elderflower_gt:
    'A gin and tonic with a splash of elderflower liqueur: softer, floral and summery. Cucumber makes it extra refreshing.',
  bijou:
    'Equal parts gin, sweet vermouth and green Chartreuse: herbal, sweet and powerful. Its three colours were said to look like gems: diamond, ruby and emerald.',
  twentieth_century:
    'Gin, Lillet, chocolate liqueur and lemon: surprisingly bright, with a hint of cocoa. Named after a famous New York–Chicago train in the 1930s.',
  lillet_tonic:
    'Fruity, floral Lillet with tonic over lots of ice: light, bittersweet and low in alcohol. A popular French aperitif.',
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
    'A spritz made with Campari instead of Aperol: more bitter, deeper red and less sweet. A favourite in Milan.',
  st_germain_cocktail:
    'Elderflower liqueur with sparkling wine and soda: floral, light and refreshing.',
  death_in_the_afternoon:
    "Absinthe topped with champagne, which turns cloudy and opalescent: strong, anise-flavoured and bubbly. Named after Ernest Hemingway's 1932 book, and he is credited with the recipe.",
  kir:
    "Dry white wine with a little blackcurrant liqueur: fruity and light. Named after Félix Kir, a mayor of Dijon who promoted the region's wine and cassis.",
  wine_spritzer:
    'White wine lengthened with soda: light, crisp and low in alcohol. Good for hot afternoons.',
  bicicletta:
    'Campari and white wine with soda: bittersweet, light and fizzy. The name means "bicycle" in Italian, supposedly after older men wobbling home on their bikes.',
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
    'Tequila, Campari, grapefruit and lime: bittersweet, tart and refreshing. Created in New York in 2006.',
  cantarito:
    'Tequila with orange, grapefruit and lime, topped with soda: fruity, salty and refreshing. Traditionally served in a clay pot in Jalisco, Mexico.',
  ward_eight:
    'Rye with lemon, orange and grenadine: tart, fruity and gently spicy. Created in Boston in 1898 and named after a political ward.',
  bobby_burns:
    'Scotch, sweet vermouth and a touch of Bénédictine: rich, herbal and smooth. Named after the Scottish poet Robert Burns.',
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
    'Cognac with Chartreuse, lemon and bitters: herbal, tart and elegant. Named after the famous avenue in Paris.',
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
};
