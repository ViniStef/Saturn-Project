from PIL import Image

class Image():
    def __init__(self, url) -> None:
        self.image_url = url
        self.size = (0,0)

    @property
    def size(self):
        return self._size
    
    @size.setter
    def size(self):
        ...
