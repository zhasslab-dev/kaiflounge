import urllib.request
import os
import re

os.makedirs('public/images', exist_ok=True)

# Curated high-resolution Unsplash photo IDs for exact dishes and beverages
ITEMS_TO_DOWNLOAD = {
    # Soups & Mains
    'ramen-firmenny.jpg': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    'fettuccine-shrimp.jpg': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    'meat-thai-rice.jpg': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
    'club-sandwich-fries.jpg': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80',
    'french-fries.jpg': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
    'wings-bbq.jpg': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=1000&q=80',
    'steamed-rice.jpg': 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80',

    # Sets & Beer snacks
    'fish-set-fried.jpg': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    'meat-mix-set.jpg': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    'beer-set-2-cheese-wings.jpg': 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1000&q=80',
    'beer-mix-snacks.jpg': 'https://images.unsplash.com/photo-1514944288352-18d8a7c29363?auto=format&fit=crop&w=1000&q=80',
    'pistachios.jpg': 'https://images.unsplash.com/photo-1533604195513-80b6f9f3032b?auto=format&fit=crop&w=1000&q=80',
    'potato-chips.jpg': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=1000&q=80',
    'chechil-cheese.jpg': 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1000&q=80',
    'salted-peanuts.jpg': 'https://images.unsplash.com/photo-1567892328124-7eb382ea08b0?auto=format&fit=crop&w=1000&q=80',
    'kurt-traditional.jpg': 'https://images.unsplash.com/photo-1589135233689-d58b3012e94b?auto=format&fit=crop&w=1000&q=80',

    # Coffee
    'coffee-espresso.jpg': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1000&q=80',
    'coffee-americano.jpg': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    'coffee-cappuccino.jpg': 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=80',
    'coffee-latte.jpg': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=80',
    'coffee-raf.jpg': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80',
    'coffee-flat-white.jpg': 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1000&q=80',
    'coffee-bumble.jpg': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=80',

    # Lemonades
    'lemonade-mango-passion.jpg': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    'lemonade-citrus.jpg': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1000&q=80',
    'lemonade-berry.jpg': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    'lemonade-strawberry-orange.jpg': 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1000&q=80',
    'lemonade-kiwi-lime.jpg': 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=1000&q=80',
    'lemonade-mojito.jpg': 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1000&q=80',
    'lemonade-raspberry-mojito.jpg': 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80',
    'ice-tea-pitcher.jpg': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=80',

    # Teas
    'tea-tashkent.jpg': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    'tea-moroccan.jpg': 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=80',
    'tea-berry.jpg': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1000&q=80',
    'tea-seabuckthorn.jpg': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
    'tea-raspberry-ginger.jpg': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1000&q=80',
    'tea-kazakh-milk.jpg': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    'tea-classic-teapot.jpg': 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1000&q=80',

    # Soft Drinks
    'soda-coca-cola.jpg': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=80',
    'soda-fanta.jpg': 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=1000&q=80',
    'soda-sprite.jpg': 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=1000&q=80',
    'energy-gorilla.jpg': 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1000&q=80',
    'energy-redbull.jpg': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    'water-borjomi.jpg': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1000&q=80',
    'water-tassay.jpg': 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=1000&q=80',
    'juice-piko.jpg': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1000&q=80',

    # Cocktails
    'cocktail-rum-cola.jpg': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    'cocktail-tequila-sunrise.jpg': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1000&q=80',
    'cocktail-mojito.jpg': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    'cocktail-gin-tonic.jpg': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1000&q=80',
    'cocktail-long-island.jpg': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    'cocktail-aperol-spritz.jpg': 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=1000&q=80',
    'cocktail-jager-bomb.jpg': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',

    # Beers
    'beer-draft-praga.jpg': 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=1000&q=80',
    'beer-craft-kaif.jpg': 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1000&q=80',
    'beer-bottle-gus.jpg': 'https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=1000&q=80',
    'beer-miller.jpg': 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=1000&q=80',
    'beer-corona.jpg': 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=1000&q=80',

    # Spirits & Whiskey
    'whiskey-william-lawsons.jpg': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1000&q=80',
    'whiskey-ballantines.jpg': 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1000&q=80',
    'liqueur-jagermeister.jpg': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    'whiskey-jameson.jpg': 'https://images.unsplash.com/photo-1582819509237-d5b75f20ff7a?auto=format&fit=crop&w=1000&q=80',
    'whiskey-chivas-12.jpg': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1000&q=80',
    'whiskey-glenlivet-12.jpg': 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1000&q=80',
    'whiskey-chivas-18.jpg': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1000&q=80',
    'tequila-olmeca.jpg': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    'gin-beefeater.jpg': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1000&q=80',
    'vodka-kyzylzhar.jpg': 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1000&q=80',
    'vodka-absolut.jpg': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    'cognac-kazakhstan.jpg': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1000&q=80',
    'cognac-ararat.jpg': 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1000&q=80',

    # Wine & Hookah
    'wine-collection.jpg': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    'wine-champagne.jpg': 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=1000&q=80',
    'hookah-classic.jpg': 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&w=1000&q=80',
    'hookah-fruit.jpg': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
}

headers = {'User-Agent': 'Mozilla/5.0'}
for filename, url in ITEMS_TO_DOWNLOAD.items():
    filepath = os.path.join('public/images', filename)
    if not os.path.exists(filepath):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp, open(filepath, 'wb') as f:
                f.write(resp.read())
            print(f'Downloaded {filename}')
        except Exception as e:
            print(f'Error downloading {filename}: {e}')
    else:
        print(f'Already exists: {filename}')
