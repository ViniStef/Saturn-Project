const rangeInputs = document.querySelectorAll(".range__input");
const img = document.querySelector("#holder__img");

rangeInputs.forEach((input) => {
    input.addEventListener("input", () => {
        let currentFilter = img.style.filter;
        console.log(currentFilter)
        if (input.id === "saturation") {
            const filterValue = parseInt(input.value);
            console.log((filterValue / 100) * 2)
            const regexStr = "saturate\\([0-9.*]+\\)"
            const regex = new RegExp(regexStr, "g");
            if (currentFilter.includes("saturate")) {
                currentFilter = currentFilter.replace(regex, ` saturate(${(filterValue / 100) * 2}) `)
                img.style.filter = currentFilter
            } else {
                img.style.filter = ` ${currentFilter} saturate(${(filterValue / 100) * 2}) `;
            }
        }
        else if (input.id === "brightness") {
            const filterValue = parseInt(input.value);
            console.log((filterValue / 100) * 2)
            const regexStr = "brightness\\([0-9.*]+\\)"
            const regex = new RegExp(regexStr, "g");
            if (currentFilter.includes("brightness")) {
                currentFilter = currentFilter.replace(regex, ` brightness(${(filterValue / 100) * 2}) `)
                img.style.filter = currentFilter
            } else {
                img.style.filter = ` ${currentFilter} brightness(${(filterValue / 100) * 2 }) `;
            }
            
        } else if (input.id === "blur") {
            const filterValue = parseInt(input.value);
            console.log(filterValue)
            const regexStr = "blur\\([0-9.*]+px\\)"
            const regex = new RegExp(regexStr, "g");
            let blurExpression = 0
            if (filterValue > 50) {
                blurExpression = filterValue - 50
            } else {
                blurExpression =  50 - filterValue 
            }
            if (currentFilter.includes("blur")) {
                currentFilter = currentFilter.replace(regex, ` blur(${blurExpression / 5}px) `)
                img.style.filter = currentFilter
            } else {
                img.style.filter = ` ${currentFilter} blur(${blurExpression / 5}px) `;
                console.log(img.style.filter)
            }
        } else if (input.id === "opacity") {
            const filterValue = parseInt(input.value);
            console.log(filterValue)
            const regexStr = "opacity\\([0-9.*]+\\)"
            const regex = new RegExp(regexStr, "g");
            let opacityExpression = 0
            if (filterValue > 50) {
                opacityExpression = (100 - filterValue) * 2
            } else {
                opacityExpression =  filterValue * 2
            }
            console.log(opacityExpression / 100)
            if (currentFilter.includes("opacity")) {
                currentFilter = currentFilter.replace(regex, ` opacity(${opacityExpression / 100}) `)
                img.style.filter = currentFilter
            } else {
                img.style.filter = ` ${currentFilter} opacity(${opacityExpression / 100}) `;
                console.log(img.style.filter)
            }
        } else if (input.id === "grayscale") {
            const filterValue = parseInt(input.value);
            console.log(filterValue)
            const regexStr = "grayscale\\([0-9.*]+%\\)"
            const regex = new RegExp(regexStr, "g");
            let grayscaleExpression = 0
            if (filterValue > 50) {
                grayscaleExpression = (filterValue - 50) * 2
            } else {
                grayscaleExpression =  (50 - filterValue) * 2
            }
            if (currentFilter.includes("grayscale")) {
                currentFilter = currentFilter.replace(regex, ` grayscale(${grayscaleExpression}%) `)
                img.style.filter = currentFilter
            } else {
                img.style.filter = ` ${currentFilter} grayscale(${grayscaleExpression}%) `;
                console.log(img.style.filter)
            }
        } else if (input.id === "contrast") {
            const filterValue = parseInt(input.value);
            console.log((filterValue / 100) * 2)
            const regexStr = "contrast\\([0-9.*]+\\)"
            const regex = new RegExp(regexStr, "g");
            if (currentFilter.includes("contrast")) {
                currentFilter = currentFilter.replace(regex, ` contrast(${(filterValue / 100) * 2}) `)
                img.style.filter = currentFilter
            } else {
                img.style.filter = ` ${currentFilter} contrast(${(filterValue / 100) * 2 }) `;
            }
            
        }else if (input.id === "hueshift") {
            const filterValue = parseInt(input.value);
            console.log(filterValue)
            const regexStr = "hue-rotate\\(-*[0-9.*]+deg\\)"
            const regex = new RegExp(regexStr, "g");
            let hueshiftExpression = 0
            if (filterValue > 50) {
                hueshiftExpression = (filterValue - 50) * 7.2
            } else {
                hueshiftExpression =  - ((50 - filterValue) * 7.2)
            }
            if (currentFilter.includes("hue-rotate")) {
                currentFilter = currentFilter.replace(regex, ` hue-rotate(${hueshiftExpression}deg) `)
                img.style.filter = currentFilter
            } else {
                img.style.filter = ` ${currentFilter} hue-rotate(${hueshiftExpression}deg) `;
                console.log(img.style.filter)
            }
        }
    })

})