const elements = document.getElementsByClassName('number-btn')

Array.from(elements).forEach(element => {
    element.addEventListener("click", () => {
        console.log("Clicked number:", element.textContent);
    });
});