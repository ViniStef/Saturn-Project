const download = () => {
    const downloadBtn = document.querySelector(".download__link");
    const img = document.querySelector("#holder__img");

    downloadBtn.addEventListener("click", () => {
        // Get the computed style of the img element
        const computedStyle = window.getComputedStyle(img);

        // Access the filter property from the computed style
        const filters = computedStyle.getPropertyValue("filter");
        const scale = computedStyle.getPropertyValue("scale");
        const rotate = computedStyle.getPropertyValue("rotate");

        let filtersArray = filters.split(" ");

        console.log(filters);
        console.log(filtersArray);
    
        const formattedFilters = filtersArray.map(item => {
            const matches = item.match(/([a-zA-Z-]+)\(([^)]+)\)/);
            
            if (matches) {
                const key = matches[1];
                const value = matches[2];
                return { [key]: value };
            } else {
                return null; // or handle invalid format accordingly
            }
        });

        console.log(formattedFilters)

        const postData = {
            filters: formattedFilters,
            scale: scale,
            rotate: rotate,
        };

        // Get CSRF token from the cookie
        const csrftoken = getCookie("csrftoken");

        fetch("download/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch(error => {
            console.log("Error:", error);
        });
    });
};

// Function to get CSRF token from the cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

download();