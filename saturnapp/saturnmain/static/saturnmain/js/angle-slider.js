export 
class RoundSlider {
    constructor(shrink = false, reverse = false, angle = 0) {
        this.shrink = shrink;
        this.reverse = reverse;
        this.angle = angle;
    }

    reset() {
        const roundSlider = $("#circular__range").data('roundSlider');
        roundSlider.setValue(0);
        roundSlider.destroy();
        this.manageRoundSlider();
    }

    getAngle() {
        const roundSlider = $("#circular__range").data('roundSlider');
        return roundSlider.getValue();
    }

    changeAngle(angle) {
        const roundSlider = $("#circular__range").data('roundSlider');
        roundSlider.setValue(angle);
    }

    manageRoundSlider() {
        const img = document.querySelector("#holder__img");
        const imgHolder = document.querySelector(".image__holder");
    
        const roundSliderOptions = {
            radius: 100,
            width: 8,
            handleSize: "+24",
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
            console.log("test")
            function calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees) {
                const angleInRadians = (rotationAngleDegrees * Math.PI) / 180;

                // Calculando a altura pós rotação
                const rotatedHeight = Math.abs(
                    originalWidth * Math.abs(Math.sin(angleInRadians)) + originalHeight * Math.abs(Math.cos(angleInRadians))
                );
        
                return rotatedHeight;
            }

            function calculateScaleFactor(containerHeight, rotatedHeight, itemWidth, itemHeight) {
                const itemAspectRatio = itemWidth / itemHeight;
        
                // Calcula o scaleFactor baseado na altura do container e na altura pós rotação preservando o aspect ratio
                const scaleFactor = containerHeight / rotatedHeight;

                // Ajusta o width e height da imagem baseado no scaleFactor enquanto preserva o aspect ratio
                const scaledWidth = itemWidth * scaleFactor;
                const scaledHeight = itemHeight * scaleFactor;
        
                if (scaledHeight > containerHeight) {
                    // Caso scaleHeight exceda a altura do container, recalcula usando a altura do container
                    const maxScaleFactor = containerHeight / itemHeight;
                    scaledWidth = itemWidth * maxScaleFactor;
                    scaledHeight = itemHeight * maxScaleFactor;
                    return { scale: maxScaleFactor, width: scaledWidth, height: scaledHeight };
                }
        
                return { scale: scaleFactor, width: scaledWidth, height: scaledHeight };
            }


            const rotationAngleDegrees = e.value;
            img.style.rotate = `${rotationAngleDegrees}deg`
            
    
            const originalWidth = img.offsetWidth;
            const originalHeight = img.offsetHeight;
            const containerHeight = imgHolder.offsetHeight;
            const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees);
    
            if (rotationAngleDegrees === 0) {
                // Caso a imagem não esteja rotacionada
                img.style.scale = 1.0;
            } else if (rotatedHeight - containerHeight >= 10) {
                const scaleFactor = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
                img.style.scale = scaleFactor.scale;
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

}

// function calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees) {
//     const angleInRadians = (rotationAngleDegrees * Math.PI) / 180;

//     // Calculate the rotated height using a different method
//     const rotatedHeight = Math.abs(
//         originalWidth * Math.abs(Math.sin(angleInRadians)) + originalHeight * Math.abs(Math.cos(angleInRadians))
//     );

//     return rotatedHeight;
// }

// function calculateScaleFactor(containerHeight, rotatedHeight, itemWidth, itemHeight) {
//     const item_aspect_ratio = itemWidth / itemHeight;

//     // Calculate the scale factor based on the container height and rotated height while preserving aspect ratio
//     const scaleFactor = containerHeight / rotatedHeight;

//     // Adjust the item's width and height based on the scale factor while preserving aspect ratio
//     const scaledWidth = itemWidth * scaleFactor;
//     const scaledHeight = itemHeight * scaleFactor;

//     if (scaledHeight > containerHeight) {
//         // If the scaled height exceeds the container height, recalculate using the container height
//         const maxScaleFactor = containerHeight / itemHeight;
//         scaledWidth = itemWidth * maxScaleFactor;
//         scaledHeight = itemHeight * maxScaleFactor;
//         return { scale: maxScaleFactor, width: scaledWidth, height: scaledHeight };
//     }

//     return { scale: scaleFactor, width: scaledWidth, height: scaledHeight };
// }

// document.addEventListener("DOMContentLoaded", () => {


    // $("#circular-range").roundSlider({
    //     radius: 100,
    //     width: 8,
    //     handleSize: "+24",
    //     handleShape: "dot",
    //     sliderType: "min-range",
    //     value: 0,
    //     startAngle: 90,
    //     max: 360,

    //     drag: (e) => {
    //         img.style.rotate = `${e.value}deg`
    //         const containerHeight = document.querySelector(".image__holder").offsetHeight
    //         const originalWidth = img.offsetWidth;
    //         const originalHeight = img.offsetHeight;
    //         const rotationAngleDegrees = e.value;
    //         const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees);

    //         if (rotationAngleDegrees == 0) {
    //             img.style.scale = 1.0;
    //         } else if (rotatedHeight - containerHeight >= 10) {
    //             const result = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
    //             img.style.scale = result.scale;
    //         }
    //     },

    //     change: (e) => {
    //         img.style.rotate = `${e.value}deg`
    //         const containerHeight = document.querySelector(".image__holder").offsetHeight
    //         const originalWidth = img.offsetWidth;
    //         const originalHeight = img.offsetHeight;
    //         const rotationAngleDegrees = e.value;
    //         const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees);

    //         if (rotationAngleDegrees == 0) {
    //             img.style.scale = 1.0;
    //         } else if (rotatedHeight - containerHeight >= 10) {
    //             const result = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
    //             img.style.scale = result.scale;
    //         }
    //     }
    // });
// });