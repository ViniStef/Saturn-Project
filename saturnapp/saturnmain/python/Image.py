from PIL import Image

class Image:
    def __init__(self, image):
        if not image:
            raise ValueError("Missing Image")
        self.image = image
        self.size = (0,0)

    def __str__(self) -> str: # -> is just for documentation purposes. It specifies the return value.
        return f"{self.image}, Size: {self.size[0]}x{self.size[1]}"

    @property
    def image(self):
        return self._image
    
    @image.setter
    def image(self, image):
        self._image = image

    @classmethod
    def image(cls, image):
        print(image, "size: ",)

