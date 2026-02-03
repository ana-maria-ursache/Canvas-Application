import {CanvasEngine} from "./canvasEngine.js";

const app = new CanvasEngine('canvas');

document.getElementById('addCircle').addEventListener('click', () => {
    app.spawnCircle();
});

document.getElementById('addSquare').addEventListener('click', () => {
    app.spawnSquare();
});

document.getElementById('clear').addEventListener('click', () =>{
    app.clearRender();
});

// for the CustomEvent
window.addEventListener('entityAdded', (e) => {
    console.clear();
    console.log(`Total shapes on canvas: ${e.detail.count}`);
    console.table(e.detail.shapes);
});