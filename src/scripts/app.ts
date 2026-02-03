import {CanvasEngine} from "./canvasEngine.js";

const app = new CanvasEngine('canvas');

document.getElementById('addCircle')?.addEventListener('click', () => {
    app.spawnCircle();
});

document.getElementById('addSquare')?.addEventListener('click', () => {
    app.spawnSquare();
});

document.getElementById('clear')?.addEventListener('click', () =>{
    app.clearRender();
});

interface EntityAddedEvent extends Event{
    detail: {
        count: number;
        shapes: any[];
    }
}

// for the CustomEvent
window.addEventListener('entityAdded', (e: Event) => {
    const customEvent = e as EntityAddedEvent;

    console.clear();
    console.log(`Total shapes on canvas: ${customEvent.detail.count}`);
    console.table(customEvent.detail.shapes);
});