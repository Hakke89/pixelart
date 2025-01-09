// main.js

import { StorageManager } from "./storageManager.js";
import { EventHandlers } from "./eventHandlers.js";
import { createGrid, resizeFields } from "./pixelGrid.js";

// Disable dragging for all elements
document.addEventListener("dragstart", (event) => {
    event.preventDefault();
});

// Load colors on page load
document.addEventListener("DOMContentLoaded", () => {
    StorageManager.loadColors(".js-color-square");
    EventHandlers.attachEventListeners();
});

// make a grid of emty squares in the container
createGrid("#pixel-drawing", 10, 10);

window.addEventListener("resize", resizeFields);
window.addEventListener("DOMContentLoaded", resizeFields);
