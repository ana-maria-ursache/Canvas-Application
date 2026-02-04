import { CanvasEngine } from "./canvasEngine";

const app = new CanvasEngine('canvas');

document.getElementById('addCircle')?.addEventListener('click', () => {
    app.spawnCircle();
});

document.getElementById('addSquare')?.addEventListener('click', () => {
    app.spawnSquare();
});

document.getElementById('addEllipses')?.addEventListener('click', () => {
    app.spawnEllipse();
});

document.getElementById('addRectangle')?.addEventListener('click', () => {
    app.spawnRectangle();
});

const buttons = ['addSquare', 'addCircle'];
buttons.forEach(id => {
    const btn = document.getElementById(id);
    btn?.addEventListener('dragstart', (e) => {
        e.dataTransfer?.setData('shapeType', id);
    });
});

const canvasElement = document.getElementById('canvas');
canvasElement?.addEventListener('dragover', (e) => e.preventDefault()); // Permite drop-ul

canvasElement?.addEventListener('drop', (e) => {
    e.preventDefault();
    const shapeType = e.dataTransfer?.getData('shapeType');
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (shapeType === 'addSquare') app.spawnSquare(x, y);
    if (shapeType === 'addCircle') app.spawnCircle(x, y);
});

document.getElementById('clear')?.addEventListener('click', () =>{
    app.clearRender();
});

interface EntityAddedEvent extends Event{
    detail: {
        count: number;
        shapes: unknown[];
    }
}

// for the CustomEvent
window.addEventListener('entityAdded', (e: Event) => {
    const customEvent = e as EntityAddedEvent;

    console.clear();
    console.log(`Total shapes on canvas: ${customEvent.detail.count}`);
    console.table(customEvent.detail.shapes);
});
