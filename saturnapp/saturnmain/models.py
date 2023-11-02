import os
from django.db import models
from PIL import Image as PILImage


# Create your models here.
class Image(models.Model):
    image = models.ImageField(upload_to="image/")

    def get_image_size(self):
        # Open the image using Pillow (PIL) and get its size
        img = PILImage.open(self.image.path)
        width, height = img.size
        img.close()  # Close the image to release resources
        return width, height

    def resized_image(self):
        img = PILImage.open(self.image.path)
        # num_key_frames = 24
        
        width, height = img.size
        # These values are from the css.
        # if width >= 898:
        #     width_scale = 898 / width
        #     height_scale = 556 / height
        #     scale_factor = min(width_scale, height_scale)
        #     new_width = int(width * scale_factor)
        #     new_height = int(height * scale_factor)
        #     resized_image = img.resize((new_width, new_height), PILImage.Resampling.LANCZOS)
        #     return resized_image
        



        img.close()  # Close the image to release resources
