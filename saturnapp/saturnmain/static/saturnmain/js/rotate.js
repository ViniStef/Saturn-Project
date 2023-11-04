let currentAngle = 0;
let shrinkToFit = true
let reverse = false
const img = document.querySelector("#holder__img");
const imgHolder = document.querySelector(".image__holder");

const checkShrink = () => {
    const shrinkCheckbox = document.querySelector("#shrink__checkbox");

    shrinkCheckbox.addEventListener("click", () => {

        if (shrinkCheckbox.checked) {
            shrinkToFit = false
            img.style.scale = 1.0;
        } else {
            shrinkToFit = true
            shrinkImage()
        }
    })

    return shrinkToFit
}

const checkReverse = () => {
    const reverseCheckbox = document.querySelector("#reverse__checkbox");

    reverseCheckbox.addEventListener("click", () => {
        const btnOptions = document.querySelectorAll("button.angle__option");

        if (reverseCheckbox.checked) {
            reverse = true
            btnOptions.forEach((btn) => {
                const previousTxt = btn.innerText
                btn.innerText = `-${previousTxt}`
            })
        } else {
            reverse = false
            btnOptions.forEach((btn) => {
                const previousTxt = btn.innerText
                btn.innerText = `${previousTxt.replace("-", "")}`
            })
        }
    })

    return reverse
}

const validadeAngInput = () => {
    const angInput = document.querySelector(".custom__angle");
    angInput.addEventListener('input', function () {
        // Remove any non-numeric characters
        angInput.value = angInput.value.replace(/[^0-9]/g, '');
    });
}

const calculateRotatedHeight = (originalWidth, originalHeight, rotationAngleDegrees) => {
    const angleInRadians = (rotationAngleDegrees * Math.PI) / 180;

    // Calculando a altura pós rotação
    const rotatedHeight = Math.abs(
        originalWidth * Math.abs(Math.sin(angleInRadians)) + originalHeight * Math.abs(Math.cos(angleInRadians))
    );

    return rotatedHeight;
}

const calculateScaleFactor = (containerHeight, rotatedHeight, itemWidth, itemHeight) => {
    const itemAspectRatio = itemWidth / itemHeight;

    // Calcula o scaleFactor baseado na altura do container e na altura pós rotação preservando o aspect ratio
    const scaleFactor = containerHeight / rotatedHeight;

    // Ajusta o width e height da imagem baseado no scaleFactor enquanto preserva o aspect ratio
    let scaledWidth = itemWidth * scaleFactor;
    let scaledHeight = itemHeight * scaleFactor;

    if (scaledHeight > containerHeight) {
        // Caso scaleHeight exceda a altura do container, recalcula usando a altura do container
        const maxScaleFactor = containerHeight / itemHeight;
        scaledWidth = itemWidth * maxScaleFactor;
        scaledHeight = itemHeight * maxScaleFactor;
        return { scale: maxScaleFactor, width: scaledWidth, height: scaledHeight };
    }

    return { scale: scaleFactor, width: scaledWidth, height: scaledHeight };
}

const shrinkImage = () => {
    if (shrinkToFit) {
        const originalWidth = img.offsetWidth;
        const originalHeight = img.offsetHeight;
        const containerHeight = imgHolder.offsetHeight;
        const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, currentAngle);
        if (currentAngle === 0) {
            // Caso a imagem não esteja rotacionada
            img.style.scale = 1.0;
        }
        //  else if (rotatedHeight - containerHeight >= 10) {
        //     const scaleFactor = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
        //     console.log("AQUI")
        //     img.style.scale = scaleFactor.scale;
        // }
        else {
            let scaleFactor = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
            // Caso passe de scale 1.0, geralmente ocorre quando clicando nos botões chegava nos angulos >= 350 ou <= 10.
            if (scaleFactor.scale > 1.0) {
                scaleFactor.scale = 1.0;
            }
            img.style.scale = scaleFactor.scale;
        }

    } else {
        img.style.scale = 1.0;
    }
}

const transitionRotate = () => {
    img.style.transition = "rotate .3s";
    const timeoutStyle = setTimeout(() => {
        img.style.transition = ""
    },290)
}

const angleFixer = (chosenAngle) => {
    const roundSlider = $("#circular__range").data('roundSlider');
    if (!reverse) {
        if ((currentAngle + chosenAngle) > 360) {
            currentAngle = (currentAngle + chosenAngle) - 360;
            roundSlider.setValue(currentAngle)
            transitionRotate();
        }else {
            currentAngle += chosenAngle;
            roundSlider.setValue(currentAngle)
            transitionRotate();
        }
    } else {
        if ((currentAngle - chosenAngle) < 0) {
            currentAngle = 360 + (currentAngle - chosenAngle);
            roundSlider.setValue(currentAngle)
            transitionRotate();
        }else {
            currentAngle -= chosenAngle;
            roundSlider.setValue(currentAngle)
            transitionRotate();
        }
    }

}

const angleClickOptions = () => {
    const options = document.querySelectorAll(".angle__option");
    // const slider = document.querySelector("#circular__range")
    const roundSlider = $("#circular__range").data('roundSlider');
    const customAngle = document.querySelector(".custom__angle")

    options.forEach((option) => {
        option.addEventListener("click", () => {
            if (option.classList.contains("angle__button--90")) {
                angleFixer(90);
            } else if (option.classList.contains("angle__button--180")) {
                angleFixer(180);
            } else if (option.classList.contains("angle__button--270")) {
                angleFixer(270);
            } else if (option.classList.contains("custom__angle")) {
                // currentAngle = parseInt(document.querySelector(".custom__angle").value);
                if (document.querySelector(".custom__angle").value) {
                } else {
                    document.querySelector(".custom__angle").placeholder = "";
                }
            }

            if (shrinkToFit) {
                const originalWidth = img.offsetWidth;
                const originalHeight = img.offsetHeight;
                const containerHeight = imgHolder.offsetHeight;
                const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, currentAngle);
                if (currentAngle === 0) {
                    // Caso a imagem não esteja rotacionada
                    img.style.scale = 1.0;
                }
                //  else if (rotatedHeight - containerHeight >= 10) {
                //     const scaleFactor = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
                //     console.log("AQUI")
                //     img.style.scale = scaleFactor.scale;
                // }
                else {
                    let scaleFactor = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
                    // Caso passe de scale 1.0, geralmente ocorre quando clicando nos botões chegava nos angulos >= 350 ou <= 10.
                    if (scaleFactor.scale > 1.0) {
                        scaleFactor.scale = 1.0;
                    }
                    img.style.scale = scaleFactor.scale;
                }

            } else {
                img.style.scale = 1.0;
            }
            img.style.rotate = `${currentAngle}deg`;
            console.log(currentAngle);
        })

    })
    let typingTimer;
    const doneTypingInterval = 200;

    customAngle.addEventListener('input', function () {
        
        const inputValue = customAngle.value;
        const cleanedValue = inputValue.replace(/[^0-9°]/g, '');
        customAngle.value = cleanedValue + '°';

        if (customAngle.value.endsWith('°') && customAngle.value.length > 1) {
            const length = customAngle.value.length - 1;
            customAngle.setSelectionRange(length, length);
          } else {
            customAngle.value = "";
            customAngle.placeholder = "";
          }
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function () {
            // This code will run when the user has finished typing
            const inputValue = parseInt(customAngle.value);
            if (!isNaN(inputValue)) {
                if (inputValue > 360) {
                    customAngle.value = 360 + '°';
                    currentAngle = 360
                    roundSlider.setValue(currentAngle)
                } else {
                    currentAngle = inputValue;
                    roundSlider.setValue(currentAngle)
                    console.log(`You typed: ${inputValue}`);
                }

            }
            if (shrinkToFit) {
                const originalWidth = img.offsetWidth;
                const originalHeight = img.offsetHeight;
                const containerHeight = imgHolder.offsetHeight;
                const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, currentAngle);
                if (currentAngle === 0) {
                    // Caso a imagem não esteja rotacionada
                    img.style.scale = 1.0;
                }
                //  else if (rotatedHeight - containerHeight >= 10) {
                //     const scaleFactor = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
                //     console.log("AQUI")
                //     img.style.scale = scaleFactor.scale;
                // }
                else {
                    let scaleFactor = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
                    // Caso passe de scale 1.0, geralmente ocorre quando clicando nos botões chegava nos angulos >= 350 ou <= 10.
                    if (scaleFactor.scale > 1.0) {
                        scaleFactor.scale = 1.0;
                    }
                    img.style.scale = scaleFactor.scale;
                }

            } else {
                img.style.scale = 1.0;
            }
            img.style.rotate = `${currentAngle}deg`;
            transitionRotate();
            console.log(currentAngle);
        }, doneTypingInterval);
    });

    customAngle.addEventListener("blur", () => {
        document.querySelector(".custom__angle").placeholder = "0°";
    })
}

const manageRoundSlider = () => {
    const roundSliderOptions = {
        radius: 85,
        width: 7,
        handleSize: "+20",
        handleShape: "dot",
        sliderType: "min-range",
        value: 0,
        startAngle: 90,
        max: 360,
        mouseScrollAction: true,
        editableTooltip: false,
        tooltipFormat: "angleIndicator"
    }

    function angleIndicator(args) {
        return args.value + "°";
    }

    function rotateImage(e) {
        const rotationAngleDegrees = e.value;
        img.style.rotate = `${rotationAngleDegrees}deg`;
        currentAngle = e.value;
        console.log(currentAngle)

        if (shrinkToFit) {
            const originalWidth = img.offsetWidth;
            const originalHeight = img.offsetHeight;
            const containerHeight = imgHolder.offsetHeight;
            const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees);

            if (rotationAngleDegrees === 0) {
                // Caso a imagem não esteja rotacionada
                img.style.scale = 1.0;
            } else if (rotatedHeight - containerHeight >= -5) {
                const scaleFactor = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
                // Caso passe de scale 1.0, geralmente ocorre quando clicando nos botões chegava nos angulos >= 350 ou <= 10.
                if (scaleFactor.scale > 1.0) {
                    scaleFactor.scale = 1.0;
                }
                img.style.scale = scaleFactor.scale;
            }
        } else {
            img.style.scale = 1.0;
        }



    }


    $("#circular__range").roundSlider({
        ...roundSliderOptions,
        // Quando o usuário estiver arrastando o slider
        drag: rotateImage,
        // Quando o usuário solta o mouse do slider ou se inserir manualmente um valor no slider
        change: rotateImage,
        tooltipFormat: angleIndicator,
    })
}

const resetSlider = () => {
    const roundSlider = $("#circular__range").data('roundSlider');
    roundSlider.setValue(0);
    roundSlider.destroy();
    manageRoundSlider();
}

const getSliderAngle = () => {
    const roundSlider = $("#circular__range").data('roundSlider');
    return roundSlider.getValue();
}

const changeSliderAngle = (angle) => {
    const roundSlider = $("#circular__range").data('roundSlider');
    roundSlider.setValue(angle);
}

checkShrink();
checkReverse();
manageRoundSlider();
validadeAngInput();
angleClickOptions();
