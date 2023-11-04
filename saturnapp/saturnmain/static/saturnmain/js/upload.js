import { RoundSlider } from './angle-slider.js';

document.addEventListener("DOMContentLoaded", () => {
    const sliderInstance = new RoundSlider();
    // sliderInstance.manageRoundSlider();
    const formUpload = document.querySelector(".upload__form");
    const labelUpload = document.querySelector(".upload__label");
    const inputUpload = document.querySelector("#id_image");
    const imgHolder = document.querySelector("#holder__img");

    inputUpload.addEventListener("change", () => {
        // Aguarda até a imagem carregar para depois reverter o css e ir para a posição inicial
        imgHolder.addEventListener("load", () => {
            imgHolder.style = "";
        })
        
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
            // sliderInstance.reset();
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