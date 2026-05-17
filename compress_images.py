import os
from PIL import Image

def compress_dir(directory):
    print(f"Starting compression for directory: {directory}")
    if not os.path.isdir(directory):
        print(f"Error: Directory '{directory}' does not exist or is not accessible.")
        return

    found_images = False
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)

        # Check if it's a file and an image
        if os.path.isfile(filepath) and filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            found_images = True
            size_mb = os.path.getsize(filepath) / (1024 * 1024)
            print(f"  Found image: {filename}, Size: {size_mb:.2f} MB")

            if size_mb > 0.1:
                print(f"Compressing {filename} (Original: {size_mb:.2f} MB)")
                try:
                    with Image.open(filepath) as img:
                        max_width = 1920
                        if img.width > max_width:
                            ratio = max_width / img.width
                            new_h = int(img.height * ratio)
                            img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
                            print(f"    -> Resized to {max_width}x{new_h}")

                        new_filename = f"{os.path.splitext(filename)[0]}_compressed{os.path.splitext(filename)[1]}"
                        new_filepath = os.path.join(directory, new_filename)

                        if filename.lower().endswith('.png'):
                            if img.mode == 'RGBA':
                                extrema = img.getextrema()
                                if extrema[3][0] == 255: # completely opaque
                                    img = img.convert('RGB')
                            img.save(new_filepath, format="PNG", optimize=True)
                        else:
                            img.save(new_filepath, format="JPEG", quality=80, optimize=True)

                        new_size_mb = os.path.getsize(new_filepath) / (1024 * 1024)
                        print(f"    -> Done. New file: {new_filename}, Size: {new_size_mb:.2f} MB")
                except Exception as e:
                    print(f"    Error processing {filename}: {e}")
            else:
                print(f"  Skipping {filename}: Size {size_mb:.2f} MB is not greater than 0.5 MB.")
        elif os.path.isfile(filepath):
            print(f"  Skipping non-image file: {filename}")
        else:
            print(f"  Skipping directory or other item: {filename}")

    if not found_images:
        print(f"No valid image files found in '{directory}' that meet the criteria.")
    print("Compression process finished.")

if __name__ == '__main__':
    compress_dir('C:\\Users\\milan\\Downloads\\proj_img')
