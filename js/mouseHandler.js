// State variable
let isMouseDown = false;

// Initialize event listeners for mouse and touch actions
function initEventListeners() {
    // Mouse event listeners
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Touch event listeners
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);
}

// Handle mouse down event
function onMouseDown() {
    isMouseDown = true;
}

// Handle mouse up event
function onMouseUp() {
    isMouseDown = false;
}

// Handle touch start event (simulating mousedown for touch)
function onTouchStart() {
    isMouseDown = true;
}

// Handle touch end event (simulating mouseup for touch)
function onTouchEnd() {
    isMouseDown = false;
}

// Export the MouseHandler functionality
export const MouseHandler = {
    initEventListeners,
    isMouseDown: () => isMouseDown, // Getter for the state
};
