export const StorageManager = {
    loadColors(selector) {
        const colors = JSON.parse(localStorage.getItem("colors")) || {};
        const colorSquares = document.querySelectorAll(selector);
        colorSquares.forEach((square, index) => {
            const color = colors[`color${index + 1}`];
            if (color) {
                square.style.backgroundColor = color;
            }
        });
    },
    saveColors(selector) {
        const colorSquares = document.querySelectorAll(selector);
        const colors = {};
        colorSquares.forEach((square, index) => {
            colors[`color${index + 1}`] = square.style.backgroundColor || "";
        });
        localStorage.setItem("colors", JSON.stringify(colors));
    },
    clearColors(selector) {
        localStorage.removeItem("colors");
        const colorSquares = document.querySelectorAll(selector);
        colorSquares.forEach((square) => {
            square.style.backgroundColor = "";
        });
    },
};
