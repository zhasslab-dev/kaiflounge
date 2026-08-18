import urllib.request
import os

REMAINING = {
    'beer-mix-snacks.jpg': 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1000&q=80',
    'pistachios.jpg': 'https://images.unsplash.com/photo-1527477321055-43615b65171f?auto=format&fit=crop&w=1000&q=80',
    'salted-peanuts.jpg': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
    'kurt-traditional.jpg': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    'water-borjomi.jpg': 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=1000&q=80',
    'promo-lunch.jpg': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    'promo-birthday.jpg': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
    'event-live-music.jpg': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    'event-dj-party.jpg': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
}

headers = {'User-Agent': 'Mozilla/5.0'}
for filename, url in REMAINING.items():
    filepath = os.path.join('public/images', filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp, open(filepath, 'wb') as f:
            f.write(resp.read())
        print(f'Saved {filename}')
    except Exception as e:
        print(f'Error on {filename}: {e}')

# Update promos and events in menuData.ts
with open('src/data/menuData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', '/images/promo-lunch.jpg')
text = text.replace('https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80', '/images/promo-birthday.jpg')
text = text.replace('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', '/images/event-live-music.jpg')
text = text.replace('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', '/images/event-dj-party.jpg')

with open('src/data/menuData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated promos and poster events!')
