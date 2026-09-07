import urllib.request
import os

images = {
    # Categories
    "assets/images/categories/everyday.jpg": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "assets/images/categories/smart_finds.jpg": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    "assets/images/categories/gadgets.jpg": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    "assets/images/categories/lifestyle.jpg": "https://images.unsplash.com/photo-1517254793880-056705c3c338?auto=format&fit=crop&w=800&q=80",
    "assets/images/categories/trending.jpg": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "assets/images/categories/more.jpg": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    
    # Products Preview
    "assets/images/products/product_01.jpg": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    "assets/images/products/product_02.jpg": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    "assets/images/products/product_03.jpg": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "assets/images/products/product_04.jpg": "https://images.unsplash.com/photo-1585336261026-6294711843b0?auto=format&fit=crop&w=800&q=80",
    "assets/images/products/product_05.jpg": "https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?auto=format&fit=crop&w=800&q=80",
    "assets/images/products/product_06.jpg": "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=800&q=80",
}

headers = {'User-Agent': 'Mozilla/5.0'}

for path, url in images.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            with open(path, 'wb') as f:
                f.write(response.read())
        print(f"Downloaded: {path}")
    except Exception as e:
        print(f"Error downloading {path}: {e}")
