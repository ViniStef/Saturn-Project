document.addEventListener("DOMContentLoaded", () => {
    let formUpload = document.querySelector(".upload__form");
    let labelUpload = document.querySelector(".upload__label");
    let inputUpload = document.querySelector("#id_image");
    let imgHolder = document.querySelector("#holder__img")

    inputUpload.addEventListener("change", () => {
        if (inputUpload.value) {
            let formData = new FormData(document.querySelector(".upload__form"));
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "image/");

            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);
                    if (response.url) {
                        imgHolder.src = response.url
                        imgHolder.alt = "Your Image"
                        console.log(response.size)
                    }
                }
            };
            xhr.send(formData);
        }
    });
});

// document.querySelector("#slider").roundSlider({
//     sliderType: "min-range",
//     handleShape: "round",
//     width: 22,
//     radius: 100,
//     value: 45
// });