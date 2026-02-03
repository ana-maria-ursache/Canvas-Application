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

    clearRender(){
        this.shapes = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    telemetryLog(){
        if(!this.shapes) return; 
        
        const event = new CustomEvent('entityAdded', { 
            detail: { 
                shapes: [...this.shapes],
                count: this.shapes.length 
            } 
        });
        window.dispatchEvent(event);
    }

    spawnCircle() {
        const radius = 50;

        const x = radius + Math.random() * (this.canvas.width - radius * 2);
        const y = radius + Math.random() * (this.canvas.height - radius * 2);

        const newCircle = new Circle(x, y, radius);
        this.shapes.push(newCircle);

        this.telemetryLog();
    }

    spawnSquare() {
        const size = 70;

        const x = Math.random() * (this.canvas.width - size);
        const y = Math.random() * (this.canvas.height - size);

        const newSquare = new Square(x, y, size);
        this.shapes.push(newSquare);

        this.telemetryLog();
    }

    startLoop() {
        const render = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // from the 2d context

            this.shapes.forEach(shape => shape.draw(this.ctx));

            // window function to use render for drawing
            // instead of setInterval, that doesn't stop when changing the tab
            requestAnimationFrame(render); 
        };
        requestAnimationFrame(render);
    }
}