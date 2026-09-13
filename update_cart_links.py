import re

with open('assets/eduthoo-theme.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Hook up cart links
cart_link_js = r'''
  // Intercept cart links to open drawer
  document.querySelectorAll('a[href="/cart"], a[href*="routes.cart_url"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      fetchCartAndRender();
      openDrawer();
    });
  });
'''

# insert it before "// Override ADD button"
content = content.replace("// Override ADD button", cart_link_js + "\n  // Override ADD button")

with open('assets/eduthoo-theme.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated JS to intercept cart links")
