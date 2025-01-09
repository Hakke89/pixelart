export const ColorUtil = {
    rgbToHex(rgb) {
        const result = rgb
            .match(/\d+/g)
            .map(Number)
            .map((num) => num.toString(16).padStart(2, "0"));
        return `#${result.join("")}`;
    },
    hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    },
    normalize(color) {
        if (color.startsWith("rgb")) {
            return this.rgbToHex(color);
        }
        return color;
    },
};
