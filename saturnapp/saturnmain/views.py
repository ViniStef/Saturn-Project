import os
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from PIL import Image
from .forms import ImageForm

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