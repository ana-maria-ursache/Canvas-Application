import { Square } from "./SquareClass";
import { Circle } from "./CircleClass";
import { Ellipse } from "./EllipseClass";
import { Rectangle } from "./RectangleClass";
import { TelemetryManager } from "./telemetry";
import { Shape } from "./Shape";

export class CanvasEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[]; 
    private telemetry: TelemetryManager;
    private lastUpdateTime: number;
    private currentTimeDiff: number;
    private currentDiff: number;

    private isDragging: boolean = false;
    private selectedShape: Shape | null = null;
    private dragOffset = { x: 0, y: 0 };

    private nrOfSQuares: number = 0;
    private nrOfRect: number = 0;
    private nrOfCircles: number = 0;
    private nrOfEllipse: number = 0;


    constructor(canvasId: string) {
        // const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement; // initil cod, cast without null-check
        // if (!canvasElement) {
        //     throw new Error(`Canvas element with id ${canvasId} not found.`);
        // }
        const canvasElement = this.getRequiredEl<HTMLCanvasElement>(canvasId); // improved code with null-check, with helper function
        this.canvas = canvasElement;

        // guard for the context
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error("Couldn't get the element.");
        }
        this.ctx = context;

        this.shapes = []; 
        
        this.telemetry = new TelemetryManager();
        this.lastUpdateTime = 0;
        this.currentTimeDiff = 0;
        this.currentDiff = 0;

        this.init();
    }

    private getRequiredEl<T extends HTMLElement>(id: string): T {
        const el = document.getElementById(id);
        if (!el) {
            throw new Error(`The element with the id "${id}" wasn't found in DOM.`);
        }
        return el as T;
    }

    private init(): void {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.startLoop();

        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    }

    private handleMouseDown(e: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            if (shape && shape.isHit(mouseX, mouseY)) { 
                this.selectedShape = shape;
                this.isDragging = true;
                this.dragOffset.x = mouseX - shape.x;
                this.dragOffset.y = mouseY - shape.y;
                break;
            }
        }
    }

    private handleMouseMove(e: MouseEvent): void {
        if (this.isDragging && this.selectedShape) {
            const rect = this.canvas.getBoundingClientRect();
            this.selectedShape.x = e.clientX - rect.left - this.dragOffset.x;
            this.selectedShape.y = e.clientY - rect.top - this.dragOffset.y;
        }
    }

    private handleMouseUp(e: MouseEvent): void {
        if (this.isDragging && this.selectedShape) {
            if ((this.selectedShape).color === '#ff0000') {
                return;
            }
        }
        this.isDragging = false;
        this.selectedShape = null;
    }

    private resize(): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    public clearRender(): void {
        this.shapes = [];
        this.nrOfSQuares = 0;
        this.nrOfRect = 0;
        this.nrOfCircles = 0;
        this.nrOfEllipse = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateUI();
    }

    private getScreenSize(): [number, number] {
        return screen.width >= 700 ? [50, 70] : [30, 50];  
    }

    private simpleLog(): void {
        const event = new CustomEvent('entityAdded', { 
            detail: { 
                shapes: [...this.shapes],
                count: this.shapes.length 
            } 
        });
        window.dispatchEvent(event);
    }

    public spawnCircle(x?: number, y?: number): void {
        const [radius] = this.getScreenSize();

        const posX = x ? x : radius + Math.random() * (this.canvas.width - radius * 2);
        const posY = y ? y : radius + Math.random() * (this.canvas.height - radius * 2);

        const newCircle = new Circle(posX, posY, radius);
        this.shapes.push(newCircle);

        this.nrOfCircles++;
        this.updateUI();
        this.simpleLog();
    }

    public spawnSquare(x?: number, y?: number): void {
        const [, size] = this.getScreenSize();

        const posX = x ? x : Math.random() * (this.canvas.width - size);
        const posY = y ? y : Math.random() * (this.canvas.height - size);

        const newSquare = new Square(posX, posY, size);
        this.shapes.push(newSquare);

        this.nrOfSQuares++;
        this.updateUI();
        this.simpleLog();
    }

    public spawnRectangle(x?: number, y?: number): void {
        const [, baseSize] = this.getScreenSize(); 
        
        const width = baseSize * 1.5; 
        const height = baseSize;

        const posX = x ?? Math.random() * (this.canvas.width - width);
        const posY = y ?? Math.random() * (this.canvas.height - height);

        const newRect = new Rectangle(posX, posY, width, height, '#4800ff');
        this.shapes.push(newRect);

        this.nrOfRect++;
        this.updateUI(); 
        this.simpleLog(); 
    }

    public spawnEllipse(x?: number, y?: number): void {
        const [baseRadius] = this.getScreenSize(); 
        
        const rx = baseRadius * 1.5;
        const ry = baseRadius;

        const posX = x ?? rx + Math.random() * (this.canvas.width - rx * 2);
        const posY = y ?? ry + Math.random() * (this.canvas.height - ry * 2);

        const newEllipse = new Ellipse(posX, posY, rx, ry, '#ffd21d');
        this.shapes.push(newEllipse);

        this.nrOfEllipse++;
        this.updateUI(); 
        this.simpleLog(); 
    }

    public getData(): number[]{
        return [this.nrOfSQuares, this.nrOfRect, this.nrOfCircles, this.nrOfEllipse];
    }

    private updateUI(): void {
        const data = this.getData();
        this.telemetry.updateShapesCount(data);
    }

    private startLoop(): void {
        const render = (timestamp: number) => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.shapes.forEach(shape => shape.draw(this.ctx));
        
            this.checkCollisions();

            this.currentDiff = timestamp - this.currentTimeDiff;
            this.currentTimeDiff = timestamp;
            
            if (timestamp - this.lastUpdateTime >= 1000) {
                this.telemetry.updateFPS(this.currentDiff);
                this.lastUpdateTime = timestamp;
            }

            requestAnimationFrame(render); 
        };
        requestAnimationFrame(render);
    }

    private checkCollisions(): void {

        this.shapes.forEach(shape => { // To reset the colors after being red for collision
            if (shape instanceof Circle) {
                (shape ).color = '#ffa6a6';
            } else if (shape instanceof Square) {
                (shape ).color = '#00ffcc';
            } else if (shape instanceof Ellipse) {
                (shape ).color = '#ffd21d';
            } else if (shape instanceof Rectangle) {
                (shape ).color = '#4800ff';
            }
        });

        for (let i = 0; i < this.shapes.length; i++) {
            for (let j = i + 1; j < this.shapes.length; j++) {
                const shape1 = this.shapes[i];
                const shape2 = this.shapes[j];
                
                if (shape1 && shape2 && shape1.collidesWith(shape2)) {
                    this.collidedWith(shape1, shape2);
                }else if (shape1 && shape2) {
                    this.noLongerCollidedWith(shape1, shape2);
                }
            }
        }
    }

    private collidedWith(shape1: Shape, shape2: Shape): void {
        (shape1 ).color = '#ff0000';
        (shape2 ).color = '#ff0000';
        
        const event = new CustomEvent('shapeCollision', {
            detail: {
                shape1,
                shape2,
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(event);
    }

    private noLongerCollidedWith(shape1: Shape, shape2: Shape): void {
        const event = new CustomEvent('shapeCollisionEnd', {
            detail: {
                shape1,
                shape2,
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(event);
    }
}