import re

with open('assets/eduthoo-theme.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace document.querySelectorAll('[data-add-button]').forEach
content = content.replace(
    "document.querySelectorAll('[data-add-button]').forEach(btn => {",
    "document.querySelectorAll('[data-add-button], .ed-card-button').forEach(btn => {"
)

with open('assets/eduthoo-theme.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated JS to include .ed-card-button for cart drawer")
