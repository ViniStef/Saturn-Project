from PIL import Image, ImageEnhance, ImageFilter


class ImageEdit:
    def __init__(self, image):
        if not image:
            raise ValueError("Missing Image")
        self.image = image
        self.size = (0, 0)

    def __str__(
        self,
    ) -> str:  # -> is just for documentation purposes. It specifies the return value.
        return f"{self.image}, Size: {self.size[0]}x{self.size[1]}"

    @property
    def image(self):
        return self._image

    @image.setter
    def image(self, image):
        self._image = image

    @classmethod
    def image(cls, image):
        print(
            image,
            "size: ",
        )

    def saturation(self, value):
        # Open the image using Pillow
        img = Image.open(self.image)
        # Convert the image to RGB mode (if it's not already in that mode)
        img = img.convert("RGB")
        # Convert to HSV color space
        img_hsv = img.convert("HSV")
        # Split the channels
        h, s, v = img_hsv.split()
        # Adjust saturation
        s = s.point(lambda p: p * value)
        # Merge the channels back
        img_hsv = Image.merge("HSV", (h, s, v))
        # Convert back to RGB
        img_rgb = img_hsv.convert("RGB")
        img_rgb.show()
        # Save the resulting image
        # img_rgb.save(output_path)

    def brightness(self, value):
        # value 0 to as many
        img = Image.open(self.image)
        brightness = ImageEnhance.Brightness(img)
        brightness.enhance(value).show()

    def blur(self, value):
        # use 20 as the max
        img = Image.open(self.image)
        img.filter(ImageFilter.BoxBlur(value)).show()

    def opacity(self, value):
        # Open the image using Pillow
        img = Image.open(self.image)
        # Convert the image to RGBA mode (if it's not already in that mode)
        img = img.convert("RGBA")
        # Separate the alpha channel
        r, g, b, a = img.split()
        # Adjust the alpha channel (opacity)
        a = a.point(lambda p: int(p * value))
        # Merge the channels back
        img = Image.merge("RGBA", (r, g, b, a))
        img.show()
        # Save the resulting image
        # img.save(output_path)

    def grayscale(self, value):
        # value 0.0 to 1.0
        img = Image.open(self.image)
        grayscale = ImageEnhance.Color(img)
        grayscale.enhance(value).show()

    def contrast(self, value):
        # value 0 to as many
        img = Image.open(self.image)
        contrast = ImageEnhance.Contrast(img)
        contrast.enhance(value).show()

    def hueShift(self, degrees):
        img = Image.open(self.image)
        # Convert the image to RGB mode (if it's not already in that mode)
        img = img.convert("RGB")
        # Convert to HSL color space
        img_hsl = img.convert("HSV")
        # Separate HSL channels
        h, s, v = img_hsl.split()
        # Apply hue rotation
        h = h.point(lambda p: (p + degrees) % 256)
        # Merge the channels back
        img_hsl = Image.merge("HSV", (h, s, v))
        # Convert back to RGB
        img_rgb = img_hsl.convert("RGB")
        img_rgb.show()

# image = ImageEdit(
#     "C:\\Users\\Vinicius\\Desktop\\Codigo\\Saturn\\saturnapp\\media\\image\\triste.png"
# )
# image.contrast(7)
# image.brightness(3)
# image.grayscale(0.2)
# image.blur(20)
# image.hueShift(45)
# image.saturation(1.7)
# image.opacity(0.1)