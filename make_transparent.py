from PIL import Image
import numpy as np

# Load the JPG
img = Image.open(r"C:\Users\tunah\.gemini\antigravity\brain\706c9ddb-011d-4fe3-8c8e-af5a3d696811\media__1780089427268.jpg")

# Convert to RGBA
img = img.convert("RGBA")
data = np.array(img)

# Get RGB channels
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# White/near-white pixels: R>200, G>200, B>200
# Make them transparent
white_mask = (r > 200) & (g > 200) & (b > 200)
data[white_mask, 3] = 0  # Set alpha to 0 (transparent)

# Create new image from modified array
result = Image.fromarray(data)

# Save as PNG to public folder
result.save(r"C:\Users\tunah\.gemini\antigravity\scratch\once-ozel-egitim\public\logo.png", "PNG")
print("Logo saved successfully!")

# Also check: how many pixels were made transparent?
print(f"Total pixels: {white_mask.size}")
print(f"Transparent pixels: {white_mask.sum()}")
print(f"Logo dimensions: {result.size}")
