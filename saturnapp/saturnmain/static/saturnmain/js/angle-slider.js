
function calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees) {
    const angleInRadians = (rotationAngleDegrees * Math.PI) / 180;

    // Calculate the rotated height using a different method
    const rotatedHeight = Math.abs(
        originalWidth * Math.abs(Math.sin(angleInRadians)) + originalHeight * Math.abs(Math.cos(angleInRadians))
    );

    return rotatedHeight;
}

function calculateScaleFactor(container_height, rotated_height, item_width, item_height) {
    const item_aspect_ratio = item_width / item_height;

    // Calculate the scale factor based on the container height and rotated height while preserving aspect ratio
    const scale_factor = container_height / rotated_height;

    // Adjust the item's width and height based on the scale factor while preserving aspect ratio
    const scaled_width = item_width * scale_factor;
    const scaled_height = item_height * scale_factor;

    if (scaled_height > container_height) {
        // If the scaled height exceeds the container height, recalculate using the container height
        const max_scale_factor = container_height / item_height;
        scaled_width = item_width * max_scale_factor;
        scaled_height = item_height * max_scale_factor;
        return { scale: max_scale_factor, width: scaled_width, height: scaled_height };
    }

    return { scale: scale_factor, width: scaled_width, height: scaled_height };
}

document.addEventListener("DOMContentLoaded", () => {
    let img = document.querySelector("#holder__img");

    $("#circular-range").roundSlider({
        radius: 100,
        width: 8,
        handleSize: "+24",
        handleShape: "dot",
        sliderType: "min-range",
        value: 0,
        startAngle: 90,
        max: 360,

        drag: (e) => {
            img.style.rotate = `${e.value}deg`
            const containerHeight = document.querySelector(".image__holder").offsetHeight
            const originalWidth = img.offsetWidth;
            const originalHeight = img.offsetHeight;
            const rotationAngleDegrees = e.value;
            const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees);

            if (rotationAngleDegrees == 0) {
                img.style.scale = 1.0;
            }else if (rotatedHeight - containerHeight >= 10) {
                const result = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
                img.style.scale = result.scale;
            }
        },

        change: (e) => {
            img.style.rotate = `${e.value}deg`
            const containerHeight = document.querySelector(".image__holder").offsetHeight
            const originalWidth = img.offsetWidth;
            const originalHeight = img.offsetHeight;
            const rotationAngleDegrees = e.value;
            const rotatedHeight = calculateRotatedHeight(originalWidth, originalHeight, rotationAngleDegrees);

            if (rotationAngleDegrees == 0) {
                img.style.scale = 1.0;
            }else if (rotatedHeight - containerHeight >= 10) {
                const result = calculateScaleFactor(containerHeight, rotatedHeight, originalWidth, originalHeight)
                img.style.scale = result.scale;
            }
        }
    });
});