import { Square } from "./SquareClass";
import { Circle } from "./CircleClass";
import { TelemetryManager } from "./telemetry";
import { IShape } from "./IShape";

export class CanvasEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: IShape[]; 
    private telemetry: TelemetryManager;
    private lastUpdateTime: number;
    private currentTimeDiff: number;
    private currentDiff: number;

    private isDragging: boolean = false;
    private selectedShape: IShape | null = null;
    private dragOffset = { x: 0, y: 0 };

    constructor(canvasId: string) {
        const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvasElement) {
            throw new Error(`Canvas element with id ${canvasId} not found.`);
        }
        
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.shapes = []; 
        
        this.telemetry = new TelemetryManager();
        this.lastUpdateTime = 0;
        this.currentTimeDiff = 0;
        this.currentDiff = 0;

        this.init();
    }

    private init(): void {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.startLoop();

        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseup', () => this.isDragging = false);
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

    private resize(): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    public clearRender(): void {
        this.shapes = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

        this.simpleLog();
    }

    public spawnSquare(x?: number, y?: number): void {
        const [, size] = this.getScreenSize();

        const posX = x ? x : Math.random() * (this.canvas.width - size);
        const posY = y ? y : Math.random() * (this.canvas.height - size);

        const newSquare = new Square(posX, posY, size);
        this.shapes.push(newSquare);

        this.simpleLog();
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
                (shape as any).color = '#ffa6a6';
            } else if (shape instanceof Square) {
                (shape as any).color = '#00ffcc';
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

    private collidedWith(shape1: IShape, shape2: IShape): void {
        (shape1 as any).color = '#ff0000';
        (shape2 as any).color = '#ff0000';
        
        // Dispatch collision event
        const event = new CustomEvent('shapeCollision', {
            detail: {
                shape1,
                shape2,
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(event);
    }

    private noLongerCollidedWith(shape1: IShape, shape2: IShape): void {
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