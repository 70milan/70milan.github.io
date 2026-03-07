import os
from PIL import Image

def compress_dir(directory):
    for filename in os.listdir(directory):
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue
            
        filepath = os.path.join(directory, filename)
        size_mb = os.path.getsize(filepath) / (1024 * 1024)
        
        # Only compress files larger than 1 MB
        if size_mb > 1.0:
            print(f"Compressing {filename} (Original: {size_mb:.2f} MB)")
            try:
                with Image.open(filepath) as img:
                    # Convert to RGB if it's RGBA but we want to save efficiently
                    # Actually for PNG we keep RGBA
                    
                    # Resize if width > 1920
                    max_width = 1920
                    if img.width > max_width:
                        ratio = max_width / img.width
                        new_h = int(img.height * ratio)
                        img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
                        print(f"  -> Resized to {max_width}x{new_h}")
                    
                    if filename.lower().endswith('.png'):
                        # If image has no alpha, convert to RGB to save space, but keeping PNG
                        if img.mode == 'RGBA':
                            # Check if alpha is actually used
                            extrema = img.getextrema()
                            if extrema[3][0] == 255: # completely opaque
                                img = img.convert('RGB')
                        img.save(filepath, format="PNG", optimize=True)
                    else:
                        img.save(filepath, format="JPEG", quality=80, optimize=True)
                    
                new_size_mb = os.path.getsize(filepath) / (1024 * 1024)
                print(f"  -> Done. New size: {new_size_mb:.2f} MB")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == '__main__':
    compress_dir('c:\\Data Engineering\\70milan.github.io\\images')
