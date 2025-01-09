import { ColorUtil } from "./colorUtil.js";
import { StorageManager } from "./storageManager.js";
import { MouseHandler } from "./mouseHandler.js";
import { createGrid, resizeFields } from "./pixelGrid.js";

MouseHandler.initEventListeners();

export const EventHandlers = {
    attachEventListeners() {
        const colorPicker = document.getElementById("color-picker");
        const saveBtn = document.querySelector("#save-btn");
        const clearBtn = document.querySelector("#clear-btn");
        const resetBtn = document.querySelector("#reset-btn");
        const colorSquares = document.querySelectorAll(".js-color-square");
        const fields = document.querySelectorAll(".field");
        const container = document.getElementById("pixel-drawing"); // Assuming the grid is inside this container

        colorSquares.forEach((square) => {
            square.addEventListener("click", () => {
                document.querySelector(".active")?.classList.remove("active");
                document
                    .querySelector(".activeRed")
                    ?.classList.remove("activeRed");
                square.classList.add("active");
                //get the color of the clicked square if its red make border dark red
                const color = EventHandlers.getActiveColor();

                if (color === "rgb(255, 0, 0)") {
                    console.log("includes the color red");
                    // add classList activeRed
                    square.classList.add("activeRed");
                }
            });
        });

        fields.forEach((field) => {
            // Click event to color the field
            field.addEventListener("click", () => {
                const color = EventHandlers.getActiveColor();
                if (color !== "") {
                    field.style.backgroundColor = color;
                } else {
                    this.resetFieldColor(field);
                }
            });

            // Mouseover event to color the field while dragging
            field.addEventListener("mouseover", (event) => {
                if (MouseHandler.isMouseDown()) {
                    event.preventDefault();
                    const color = EventHandlers.getActiveColor();
                    if (color !== "") {
                        field.style.backgroundColor = color;
                    } else {
                        // If no color is selected, reset to original color based on the id split x + y
                        this.resetFieldColor(field);
                    }
                }
            });

            // Prevent scrolling on touchstart while dragging on the field
            field.addEventListener("touchstart", (event) => {
                if (MouseHandler.isMouseDown()) {
                    event.preventDefault(); // Prevent default scrolling on touchstart
                }
            });
        });

        // Global touchmove listener on the container to handle dragging across fields
        container.addEventListener(
            "touchmove",
            (event) => {
                if (MouseHandler.isMouseDown()) {
                    event.preventDefault(); // Prevent scrolling on touchmove
                    const touch = event.touches[0]; // Get the first touch point
                    const touchedField = document.elementFromPoint(
                        touch.clientX,
                        touch.clientY
                    ); // Get the element under the touch point

                    if (
                        touchedField &&
                        touchedField.classList.contains("field")
                    ) {
                        const color = EventHandlers.getActiveColor();
                        if (color !== "") {
                            touchedField.style.backgroundColor = color;
                        } else {
                            this.resetFieldColor(touchedField);
                        }
                    }
                }
            },
            { passive: false }
        );

        saveBtn.addEventListener("click", () => {
            const activeSquare = document.querySelector(".active");
            if (activeSquare?.classList.contains("color-picker")) {
                console.error("You cannot save the color picker directly.");
                return;
            }
            const color = ColorUtil.normalize(colorPicker.value);
            activeSquare.style.backgroundColor = color;
            StorageManager.saveColors(".js-color-square");
        });

        clearBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear all colors?")) {
                StorageManager.clearColors(".js-color-square");
            }
        });

        resetBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset the drawing?")) {
                createGrid("#pixel-drawing", 10, 10);
                resizeFields();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "a") {
                console.log(EventHandlers.getActiveColor());
            }
        });
    },

    // Reset field color based on its coordinates
    resetFieldColor(field) {
        const [x, y] = field.id.split(",");
        if ((parseInt(x) + parseInt(y)) % 2 === 0) {
            field.style.backgroundColor = "white";
        } else {
            field.style.backgroundColor = "rgb(200, 200, 200)";
        }
    },

    // Get active color from either the color-picker or from the active square or return empty string
    getActiveColor() {
        const colorPicker = document.getElementById("color-picker");
        const activeSquare = document.querySelector(".active");
        if (activeSquare?.classList.contains("color-picker")) {
            return ColorUtil.normalize(colorPicker.value);
        } else if (activeSquare) {
            return activeSquare.style.backgroundColor;
        }
        return "";
    },
};
