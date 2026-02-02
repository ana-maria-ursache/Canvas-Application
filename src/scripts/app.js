import {CanvasEngine} from "./canvasEngine.js";


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