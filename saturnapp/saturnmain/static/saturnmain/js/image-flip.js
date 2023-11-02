verticalBtn = document.querySelector(".flip__button--vertical")
horizontalBtn = document.querySelector(".flip__button--horizontal")
image = document.querySelector("#holder__img")

verticalBtn.addEventListener("click", (e) => { 
    // image.style.transform = "scaleY(-1)";
    // image.style.transform = 'scaleY(-1)';
    if (image.style.transform.includes("scaleX(-1)")) {
        image.style.transform = "scale(-1, -1)";
    } else if (image.style.transform.includes("scaleY(-1)")) {
        image.style.transform = "";
    }
     else if (image.style.transform.includes("scale(-1, -1)")) {
        image.style.transform = "scaleX(-1)";
    } else {
        image.style.transform = "scaleY(-1)";
    }
    // if (image.classList.contains("flip--horizontal")) {
    //     image.classList.toggle("flip--vertical")
    //     image.classList.toggle("flip--both")
    // } else {
    //     image.classList.toggle("flip--vertical")
    // }
    console.log(image.style.transform)

})

horizontalBtn.addEventListener("click", (e) => { 
    if (image.style.transform.includes("scaleY(-1)")) {
        image.style.transform = "scale(-1, -1)";
    } else if (image.style.transform.includes("scaleX(-1)")) {
        image.style.transform = "";
    }
    else if (image.style.transform.includes("scale(-1, -1)")) {
        image.style.transform = "scaleY(-1)";
    } else {
        image.style.transform = "scaleX(-1)";
    }

    // if (image.classList.contains("flip--vertical")) {
    //     image.classList.toggle("flip--horizontal")
    //     image.classList.toggle("flip--both")
    // }else {
    //     image.classList.toggle("flip--horizontal")
    // }
    // image.style.transform = 'scaleX(-1)';
    
})