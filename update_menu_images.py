import re

ID_TO_LOCAL_IMAGE = {
    # Soups & Mains
    'soup-3': '/images/ramen-firmenny.jpg',
    'main-6': '/images/fettuccine-shrimp.jpg',
    'main-11': '/images/meat-thai-rice.jpg',
    'ff-4': '/images/club-sandwich-fries.jpg',
    'starter-1': '/images/french-fries.jpg',
    'starter-7': '/images/wings-bbq.jpg',
    'side-2': '/images/steamed-rice.jpg',

    # Sets & Beer snacks
    'set-3': '/images/fish-set-fried.jpg',
    'set-4': '/images/meat-mix-set.jpg',
    'beerset-2': '/images/beer-set-2-cheese-wings.jpg',
    'beersnack-1': '/images/beer-mix-snacks.jpg',
    'beersnack-2': '/images/pistachios.jpg',
    'beersnack-3': '/images/potato-chips.jpg',
    'beersnack-4': '/images/chechil-cheese.jpg',
    'beersnack-5': '/images/salted-peanuts.jpg',
    'beersnack-6': '/images/kurt-traditional.jpg',

    # Coffee
    'coff-1': '/images/coffee-espresso.jpg',
    'coff-2': '/images/coffee-americano.jpg',
    'coff-3': '/images/coffee-cappuccino.jpg',
    'coff-4': '/images/coffee-latte.jpg',
    'coff-5': '/images/coffee-raf.jpg',
    'coff-6': '/images/coffee-flat-white.jpg',
    'coff-7': '/images/coffee-bumble.jpg',

    # Lemonades
    'lem-1': '/images/lemonade-mango-passion.jpg',
    'lem-2': '/images/lemonade-citrus.jpg',
    'lem-3': '/images/lemonade-berry.jpg',
    'lem-4': '/images/lemonade-strawberry-orange.jpg',
    'lem-5': '/images/lemonade-kiwi-lime.jpg',
    'lem-6': '/images/lemonade-mojito.jpg',
    'lem-7': '/images/lemonade-raspberry-mojito.jpg',
    'lem-8': '/images/ice-tea-pitcher.jpg',

    # Teas
    'tea-1': '/images/tea-tashkent.jpg',
    'tea-2': '/images/tea-moroccan.jpg',
    'tea-3': '/images/tea-berry.jpg',
    'tea-4': '/images/tea-seabuckthorn.jpg',
    'tea-5': '/images/tea-raspberry-ginger.jpg',
    'tea-6': '/images/tea-kazakh-milk.jpg',
    'tea-7': '/images/tea-classic-teapot.jpg',

    # Soft Drinks
    'soft-1': '/images/soda-coca-cola.jpg',
    'soft-2': '/images/soda-fanta.jpg',
    'soft-3': '/images/soda-sprite.jpg',
    'soft-4': '/images/energy-gorilla.jpg',
    'soft-5': '/images/energy-redbull.jpg',
    'soft-6': '/images/water-borjomi.jpg',
    'soft-7': '/images/water-tassay.jpg',
    'soft-8': '/images/juice-piko.jpg',

    # Cocktails
    'cock-1': '/images/cocktail-rum-cola.jpg',
    'cock-2': '/images/cocktail-tequila-sunrise.jpg',
    'cock-3': '/images/cocktail-mojito.jpg',
    'cock-4': '/images/cocktail-gin-tonic.jpg',
    'cock-5': '/images/cocktail-long-island.jpg',
    'cock-6': '/images/cocktail-aperol-spritz.jpg',
    'cock-7': '/images/cocktail-jager-bomb.jpg',

    # Beers
    'beer-1': '/images/beer-draft-praga.jpg',
    'beer-2': '/images/beer-craft-kaif.jpg',
    'beer-3': '/images/beer-bottle-gus.jpg',
    'beer-4': '/images/beer-miller.jpg',
    'beer-5': '/images/beer-corona.jpg',

    # Spirits & Whiskey
    'sp-1': '/images/whiskey-william-lawsons.jpg',
    'sp-2': '/images/whiskey-ballantines.jpg',
    'sp-3': '/images/liqueur-jagermeister.jpg',
    'sp-4': '/images/whiskey-jameson.jpg',
    'sp-5': '/images/whiskey-chivas-12.jpg',
    'sp-6': '/images/whiskey-glenlivet-12.jpg',
    'sp-7': '/images/whiskey-chivas-18.jpg',
    'sp-8': '/images/tequila-olmeca.jpg',
    'sp-9': '/images/gin-beefeater.jpg',
    'sp-10': '/images/vodka-kyzylzhar.jpg',
    'sp-11': '/images/vodka-absolut.jpg',
    'sp-12': '/images/cognac-kazakhstan.jpg',
    'sp-13': '/images/cognac-ararat.jpg',

    # Wine & Hookah
    'wine-1': '/images/wine-collection.jpg',
    'wine-2': '/images/wine-champagne.jpg',
    'hk-1': '/images/hookah-classic.jpg',
    'hk-2': '/images/hookah-fruit.jpg',
}

with open('src/data/menuData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

updated = 0
for item_id, local_img in ID_TO_LOCAL_IMAGE.items():
    # Regex to find block for this id and replace imageUrl
    pattern = rf"(id:\s*['\"]{re.escape(item_id)}['\"].*?imageUrl:\s*['\"])([^'\"]+)(['\"])"
    def repl(m):
        global updated
        updated += 1
        return m.group(1) + local_img + m.group(3)
    
    new_content, count = re.subn(pattern, repl, content, flags=re.DOTALL, count=1)
    if count > 0:
        content = new_content
    else:
        print(f'Warning: could not find {item_id}')

with open('src/data/menuData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Successfully updated {updated} menu item images!')
