import urllib.request
import os
from concurrent.futures import ThreadPoolExecutor

REMAINING_12_WORKING = {
    'achichuk.jpg': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80', # Salad tomato onion
    'fettuccine-chicken.jpg': 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1000&q=80', # Pasta fettuccine
    'kartofelnoe-pyure.jpg': 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=1000&q=80', # Mashed potatoes
    'kartoshka-domashnyaya.jpg': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80', # Fried rustic potatoes
    'ketchup-iamcook.jpg': 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=1000&q=80', # Tomato sauce / ketchup
    'ketchup.jpg': 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=1000&q=80', # Ketchup
    'mayonnaise.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80', # White sauce / mayo
    'raznosol-pickles.jpg': 'https://images.unsplash.com/photo-1589135233689-d56d10f13f17?auto=format&fit=crop&w=1000&q=80', # Pickles assortment
    'salsa-ostraya.jpg': 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=1000&q=80', # Spicy salsa red sauce
    'smetana.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80', # Sour cream
    'sous-shashlychnyj.jpg': 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=1000&q=80', # Shashlik red sauce
    'sous-tartar.jpg': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80', # Tartar sauce
}

def dl(item):
    fname, url = item
    filepath = os.path.join('public/images', fname)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp, open(filepath, 'wb') as f:
            data = resp.read()
            f.write(data)
        print(f'Done {fname}: {len(data)} bytes')
    except Exception as e:
        print(f'Fail {fname}: {e}')

with ThreadPoolExecutor(max_workers=6) as executor:
    list(executor.map(dl, REMAINING_12_WORKING.items()))

