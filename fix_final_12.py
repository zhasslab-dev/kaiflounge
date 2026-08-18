import urllib.request
import os
from concurrent.futures import ThreadPoolExecutor

REMAINING_12 = {
    'achichuk.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1000&q=80',
    'fettuccine-chicken.jpg': 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=1000&q=80',
    'kartofelnoe-pyure.jpg': 'https://images.unsplash.com/photo-1518013034458-30b0ee243591?auto=format&fit=crop&w=1000&q=80',
    'kartoshka-domashnyaya.jpg': 'https://images.unsplash.com/photo-1518013034458-30b0ee243591?auto=format&fit=crop&w=1000&q=80',
    'ketchup-iamcook.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1000&q=80',
    'ketchup.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1000&q=80',
    'mayonnaise.jpg': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1000&q=80',
    'raznosol-pickles.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1000&q=80',
    'salsa-ostraya.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1000&q=80',
    'smetana.jpg': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1000&q=80',
    'sous-shashlychnyj.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1000&q=80',
    'sous-tartar.jpg': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1000&q=80',
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
    list(executor.map(dl, REMAINING_12.items()))

