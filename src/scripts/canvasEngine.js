import { Square } from "./square.js";
import { Circle } from "./circle.js";

export class CanvasEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.shapes = []; 
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.startLoop();
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    spawnCircle() {
        const radius = 25;
        // Calculation: Canvas Dimension - (Radius * 2) to stay inside borders
        const x = radius + Math.random() * (this.canvas.width - radius * 2);
        const y = radius + Math.random() * (this.canvas.height - radius * 2);

        const newCircle = new Circle(x, y, radius);
        this.shapes.push(newCircle);

        const event = new CustomEvent('entityAdded', { 
            detail: { count: this.shapes.length } 
        });
        window.dispatchEvent(event);
    }

    spawnSquare() {
    const size = 50;
    // Calculation: Stay inside borders 
    const x = Math.random() * (this.canvas.width - size);
    const y = Math.random() * (this.canvas.height - size);

    const newSquare = new Square(x, y, size);
    this.shapes.push(newSquare);
}

    startLoop() {
        const render = (timestamp) => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.shapes.forEach(shape => shape.draw(this.ctx));

            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }
}