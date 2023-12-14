import json
import os
import re
import sys
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from PIL import Image
from .forms import ImageForm
from .Image_Edit import ImageEdit

# Create your views here.

def index(response):
    return render(response, "saturnmain/main.html", {})

def upload_handle(request):
    filename = ""
    if request.method == "POST":
        file = request.FILES["file"]
        im = Image.open(file)
        filename = im.filename()
    return render(request, "saturnmain/main.html", {"image": filename})


def image(request):
    if request.method == "POST":
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            # Delete all existing images in the 'image/' folder
            folder_path = os.path.join(settings.MEDIA_ROOT, 'image/')
            for filename in os.listdir(folder_path):
                file_path = os.path.join(folder_path, filename)
                if os.path.isfile(file_path):
                    os.remove(file_path)

            img = form.save()
            # imgSize = img.Image.size()
            uploaded_img_url = img.image.url
            # print(img.get_image_size())
            imgSize = img.get_image_size()
            # resizedImg = img.resized_image()
            # resizedImg.save(f"C:/Users/Vinicius/Desktop/Codigo/Saturn/saturnapp/media/image/img-Copy.png")
            # print(resizedImg)
            # print("testttt: ",resizedImg.url())
            return JsonResponse({"url": uploaded_img_url, "size": imgSize})
        else:
            ...
            # Handle form validation errors here
    else:
        form = ImageForm()
    return render(request, 'saturnmain/main.html', {"form": form})

def get_image_path(folder_path):
    try:
        image_file = next(f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')))
        return os.path.join(folder_path, image_file)
    except (StopIteration, FileNotFoundError):
        raise ValueError("No image files found in the directory.")
    except ValueError:
        raise ValueError("More than one image file found in the directory.")


def download(request):
    folder_path = 'C:/Users/Vinicius/Desktop/Codigo/Saturn/saturnapp/media/image'
    # print(get_image_path(folder_path))  
    if request.method == 'POST':
        img = ImageEdit(get_image_path(folder_path))
        # Assuming the request body contains JSON data
        data = json.loads(request.body.decode('utf-8'))
        filters = data['filters']
        for filter_item in filters:
            try:
                if "saturate" in filter_item:
                    print("Applying Saturation")
                    img.saturation(float(filter_item["saturate"]))
                elif "brightness" in filter_item:
                    print("Applying Brightness")
                    img.brightness(float(filter_item["brightness"]))
                elif "blur" in filter_item:
                    print("Applying Blur")
                    img.blur(float(filter_item["blur"].split("px")[0]))
                elif "opacity" in filter_item:
                    print("Applying Opacity")
                    img.opacity(float(filter_item["opacity"]))
                # elif "grayscale" in filter_item:
                #     print("Applying Grayscale")
                #     print(filter_item)
                #     img.grayscale(float(filter_item["grayscale"]))
                elif "contrast" in filter_item:
                    print("Applying Contrast")
                    img.contrast(float(filter_item["contrast"]))
                elif "hue-rotate" in filter_item:
                    print("Applying Hue Shift")
                    img.hue_shift(float(filter_item["hue-rotate"].split("deg")[0]))
                else:
                    print("Error: Unrecognized filter.")
            except Exception as e:
                print(f"Error applying filter: {e}")

        resulting_image = img.get_resulting_image()
        resulting_image.save(get_image_path(folder_path))
        print(filters)
        rotate = data['rotate']
        scale = data['scale']
        # print(filters)
        # Process the data as needed
        
        # img.hueShift(30)

        # Return a JSON response
        return JsonResponse({'message': 'Success'})
    else:
        return JsonResponse({'message': 'Invalid request method'})
    