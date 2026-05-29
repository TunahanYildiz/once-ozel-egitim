from PIL import Image

# Load the transparent logo PNG
img = Image.open(r"C:\Users\tunah\.gemini\antigravity\scratch\once-ozel-egitim\public\logo.png")

# Create favicon sizes
favicon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]

# Save as ICO with multiple sizes
imgs = []
for size in favicon_sizes:
    resized = img.resize(size, Image.LANCZOS)
    # Convert to RGBA for ICO
    resized = resized.convert("RGBA")
    imgs.append(resized)

# Save as ICO
imgs[0].save(
    r"C:\Users\tunah\.gemini\antigravity\scratch\once-ozel-egitim\src\app\favicon.ico",
    format="ICO",
    sizes=favicon_sizes,
    append_images=imgs[1:]
)
print("Favicon saved!")

# Also save a small PNG version for apple-touch-icon etc
apple_icon = img.resize((180, 180), Image.LANCZOS).convert("RGBA")
# Add white background for apple-touch-icon
bg = Image.new("RGBA", (180, 180), (255, 255, 255, 255))
bg.paste(apple_icon, mask=apple_icon)
bg.convert("RGB").save(
    r"C:\Users\tunah\.gemini\antigravity\scratch\once-ozel-egitim\public\apple-icon.png",
    "PNG"
)
print("Apple icon saved!")
