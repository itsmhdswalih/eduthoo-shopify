from PIL import Image

def remove_background_floodfill(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    data = list(img.getdata())
    
    # We will do a flood fill starting from the 4 corners
    # (0,0), (width-1, 0), (0, height-1), (width-1, height-1)
    
    visited = set()
    stack = [(0,0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    def is_bg(r, g, b):
        return r <= tolerance and g <= tolerance and b <= tolerance
        
    while stack:
        x, y = stack.pop()
        if (x, y) in visited:
            continue
        if x < 0 or x >= width or y < 0 or y >= height:
            continue
            
        visited.add((x, y))
        
        idx = y * width + x
        r, g, b, a = data[idx]
        
        if is_bg(r, g, b):
            data[idx] = (255, 255, 255, 0)
            stack.append((x+1, y))
            stack.append((x-1, y))
            stack.append((x, y+1))
            stack.append((x, y-1))
            
    img.putdata(data)
    img.save(output_path, 'PNG')
    print(f"Processed {input_path}")

remove_background_floodfill('assets/floating-1.jpg', 'assets/floating-1.png', 20)
remove_background_floodfill('assets/floating-2.jpg', 'assets/floating-2.png', 20)
remove_background_floodfill('assets/floating-3.jpg', 'assets/floating-3.png', 20)
