import json
import os
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
        # Assuming the request body contains JSON data
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        # Process the data as needed
        img = ImageEdit(get_image_path(folder_path))
        # img.hueShift(30)

        # Return a JSON response
        return JsonResponse({'message': 'Success'})
    else:
        return JsonResponse({'message': 'Invalid request method'})
    