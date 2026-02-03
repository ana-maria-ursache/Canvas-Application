import { Square } from "./square.js";
import { Circle } from "./circle.js";
import { TelemetryManager } from "./telemetry.js";


export class CanvasEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.shapes = []; 
        
        this.telemetry = new TelemetryManager();
        this.lastUpdateTime = 0;
        this.currentTimeDiff = 0;

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

    getScreenSize(){
        return screen.width >= 700 ? [50, 70]  : [30, 50];  
    }

    simpleLog(){
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
        const radius = this.getScreenSize()[0];

        const x = radius + Math.random() * (this.canvas.width - radius * 2);
        const y = radius + Math.random() * (this.canvas.height - radius * 2);

        const newCircle = new Circle(x, y, radius);
        this.shapes.push(newCircle);

        this.simpleLog();
    }

    spawnSquare() {
        const size = this.getScreenSize()[1];

        const x = Math.random() * (this.canvas.width - size);
        const y = Math.random() * (this.canvas.height - size);

        const newSquare = new Square(x, y, size);
        this.shapes.push(newSquare);

        this.simpleLog();
    }

    startLoop() {
        const render = (timestamp) => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // from the 2d context

            this.shapes.forEach(shape => shape.draw(this.ctx));
        
            this.currentDiff= timestamp - this.currentTimeDiff;
            this.currentTimeDiff = timestamp;
            
            if(timestamp - this.lastUpdateTime >= 1000){
                this.telemetry.updateFPS(this.currentDiff);
                this.lastUpdateTime = timestamp;
            }

            // window function to use render for drawing
            // instead of setInterval, that doesn't stop when changing the tab
            requestAnimationFrame(render); 
        };
        requestAnimationFrame(render);
    }
}