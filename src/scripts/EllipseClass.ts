import { Shape } from "./Shape";

export class Ellipse extends Shape {
    public radiusX: number;
    public radiusY: number;

    constructor(x: number, y: number, rx: number, ry: number, color: string) {
        super(x, y, color);
        this.radiusX = rx;
        this.radiusY = ry;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath(); 

        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        ctx.fill();       
         
        ctx.closePath();
    }

    isHit(mouseX: number, mouseY: number): boolean {
        // (x-h)^2/rx^2 + (y-k)^2/ry^2 <= 1
        return (Math.pow(mouseX - this.x, 2) / Math.pow(this.radiusX, 2)) +
               (Math.pow(mouseY - this.y, 2) / Math.pow(this.radiusY, 2)) <= 1;
    }

    collidesWith(other: Shape): boolean {
        return false; 
    }
}