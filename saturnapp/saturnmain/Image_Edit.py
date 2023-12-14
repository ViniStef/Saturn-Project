import colorsys
from PIL import Image, ImageEnhance, ImageFilter,ImageOps


class ImageEdit:
    def __init__(self, image_path):
        if not image_path:
            raise ValueError("Missing Image")
        try:
            self.image = Image.open(image_path).convert("RGBA")
        except Exception as e:
            print(f"Error opening image: {e}")
            self.image = None
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
        if self.image:
            # Convert the image to RGB mode (if it's not already in that mode)
            img_rgb = self.image.convert("RGB")
            # Convert to HSV color space
            img_hsv = img_rgb.convert("HSV")
            # Split the channels
            h, s, v = img_hsv.split()
            # Adjust saturation
            s = s.point(lambda p: p * value)
            # Merge the channels back
            img_hsv = Image.merge("HSV", (h, s, v))
            # Convert back to RGB
            self.image = img_hsv.convert("RGB").convert("RGBA")
            self.image.show()
        else:
            print("something went wrong saturation")

    def brightness(self, value):
        if self.image:
            # value 0 to as many
            brightness = ImageEnhance.Brightness(self.image)
            self.image = brightness.enhance(value)
            self.image.show()
        else:
            print("something went wrong brightness")

    def blur(self, value):
        if self.image:
            # use 20 as the max
            self.image = self.image.filter(ImageFilter.GaussianBlur(value))
            self.image.show()
        else:
            print("something went wrong blur")

    def opacity(self, value):
        if self.image:
            # Separate the alpha channel
            r, g, b, a = self.image.split()
            # Adjust the alpha channel (opacity)
            a = a.point(lambda p: int(p * value))
            # Merge the channels back
            self.image = Image.merge("RGBA", (r, g, b, a))
            # Save the resulting image
            # img.save(output_path)
            self.image.show()
        else:
            print("something went wrong opacity")

    # def grayscale(self, value):
    #     if self.image:
    #         # value 0.0 to 1.0
    #         grayscale = ImageEnhance.Color(self.image)
    #         self.image = grayscale.enhance(value)
    #         self.image.show()
    #     else:
    #         print("something went wrong grayscale")

    def contrast(self, value):
        if self.image:
            # value 0 to as many
            contrast = ImageEnhance.Contrast(self.image)
            self.image = contrast.enhance(value)
            brightness = ImageEnhance.Brightness(self.image)
            # self.image = brightness.enhance(value - 1)
            self.image.show()
        else:
            print("something went wrong contrast")

    def apply_hue_shift(self, img, degrees):
            img = img.convert("RGBA")
            data = img.getdata()
            new_data = []
            for item in data:
                r, g, b, a = item
                h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
                h = (h + (degrees) / 360.0) % 1.0
                r, g, b = colorsys.hsv_to_rgb(h, s, v)
                new_data.append((int(r * 255.0), int(g * 255.0), int(b * 255.0), a))
            img.putdata(new_data)
            return img

    def hue_shift(self, degrees):
            if self.image:
                # Apply the hue shift
                self.image = self.apply_hue_shift(self.image, degrees)
                self.image.show()
            else:
                print("Something went wrong with hue shift")



    # Previous code, not working as expected on all images, can shift it up.
    # def hueShift(self, degrees):
    #     if self.image:
    #         # Convert the image to RGB mode (if it's not already in that mode)
    #         img_rgb = self.image.convert("RGB")
    #         # Convert to HSL color space
    #         img_hsl = img_rgb.convert("HSV")
    #         h, s, v = img_hsl.split()
    #         # Apply hue rotation
    #         h = h.point(lambda p: (p + (degrees * .75)) % 360)
    #         # Separate HSL channels
    #         img_hsl = Image.merge("HSV", (h, s, v))
    #         # Merge the channels back
    #         self.image = img_hsl.convert("RGB").convert("RGBA")
    #         self.image.show()
    #     else:
    #         print("something went wrong hueshift")

    def get_resulting_image(self):
        return self.image

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