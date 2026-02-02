import {CanvasEngine} from "./canvasEngine.js";
import {spawnCircle} from "./circle.js";
import {spawnSquare} from "./square.js";

const app = new CanvasEngine('canvas');

document.getElementById('addCircle').addEventListener('click', () => {
    app.spawnCircle();
});

document.getElementById('addSquare').addEventListener('click', () => {
    app.spawnSquare();
});

window.addEventListener('entityAdded', (e) => {
    console.log(`Total shapes on canvas: ${e.detail.count}`);
});