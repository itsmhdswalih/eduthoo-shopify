from rembg import remove
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    input_image = Image.open(input_path)
    # The user provided dark images on a black background, which rembg is great at separating
    output_image = remove(input_image)
    output_image.save(output_path, 'PNG')
    print(f"Saved {output_path}")

process_image('assets/floating-1.jpg', 'assets/floating-1.png')
process_image('assets/floating-2.jpg', 'assets/floating-2.png')
process_image('assets/floating-3.jpg', 'assets/floating-3.png')
