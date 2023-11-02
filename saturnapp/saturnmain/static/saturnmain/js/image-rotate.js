class Rotate {
    constructor(shrink, reverse) {
        this.shrink = shrink;
        this.reverse = reverse;
    }

    rotateImg(angle) {
        const image = document.querySelector("#holder__img");
        if (image.classList.contains("flip--horizontal")) {
            let element = document.querySelector(".flip--horizontal")
            let currentStyle = element.style.transform
            element.style.transform = `scaleX(-1) rotate(-${angle}deg)`
        }else if (image.classList.contains("flip--vertical")) {
            let element = document.querySelector(".flip--vertical")
            let currentStyle = element.style.transform
            element.style.transform = `scaleY(-1) rotate(-${angle}deg)`
        }else if( image.classList.contains("flip--both")) {
            let element = document.querySelector(".flip--both")
            let currentStyle = element.style.transform
            element.style.transform = `scale(-1,-1) rotate(-${angle}deg)`

        }else {
            image.style.transform = `rotate(${angle}deg)`;
        }
        // image.style.transform = `rotate(${angle}deg)`;
    }
}

angleBtns = document.querySelectorAll(".angle__option");

angleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log("Test")
        let rotate = new Rotate(false,false)
        rotate.rotateImg(90)
    })
})
