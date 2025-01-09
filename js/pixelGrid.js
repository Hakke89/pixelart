// pixelGrid.js

import { pixels } from "./main.js";

export function createGrid(containerSelector, rows, columns) {
    const container = document.querySelector(containerSelector);

    if (!container) {
        console.error(`Container "${containerSelector}" not found.`);
        return;
    }

    // Clear existing grid if any
    container.innerHTML = "";

    for (let i = 0; i < rows; i++) {
        const columnDiv = document.createElement("div");
        columnDiv.classList.add("column");
        container.appendChild(columnDiv);

        for (let j = 0; j < columns; j++) {
            const square = document.createElement("div");
            square.classList.add("field");
            square.setAttribute("id", `${i}, ${j}`);
            // Alternate colors
            if ((i + j) % 2 === 0) {
                square.style.backgroundColor = "white";
            } else {
                square.style.backgroundColor = "rgb(200, 200, 200)";
            }

            // Add square to the colomn
            columnDiv.appendChild(square);
        }
    }
}

export function resizeFields() {
    try {
        const padding = 20; // resize for more or less padding css auto adapts
        const fields = document.querySelectorAll(".field");
        const container = document.getElementById("pixel-drawing");

        if (container === null) {
            throw new Error("Could not find #pixel-drawing element!");
        }
        const containerWidth = container.offsetWidth - padding * 2;
        const containerHeight = container.offsetHeight - padding * 2;

        let fieldSize = 0;
        if (containerWidth < containerHeight) {
            // Calculate field size based on container width and height
            fieldSize = containerWidth / pixels;
        } else {
            fieldSize = containerHeight / pixels;
        }

        // Set the calculated width and height to the fields
        fields.forEach((field) => {
            field.style.width = `${fieldSize}px`;
            field.style.height = `${fieldSize}px`;
        });
    } catch (error) {
        console.error("Error in resizeFields:", error);
    }
}
