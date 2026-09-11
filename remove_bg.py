from PIL import Image

def remove_black_background(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Check if the pixel is close to black
        if item[0] < tolerance and item[1] < tolerance and item[2] < tolerance:
            # Change near-black to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_black_background('assets/floating-1.jpg', 'assets/floating-1.png', 45)
remove_black_background('assets/floating-2.jpg', 'assets/floating-2.png', 45)
remove_black_background('assets/floating-3.jpg', 'assets/floating-3.png', 45)
print('Background removal complete!')
