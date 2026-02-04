import { Shape } from "./Shape";
import { Ellipse } from "./EllipseClass";

export class Rectangle extends Shape {
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        super(x, y, color); 
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath(); 

        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillRect(this.x, this.y, this.width, this.height);        
        ctx.closePath();
    }

    isHit(x: number, y: number): boolean {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    }

    

    collidesWith(other: Shape): boolean {
        if (other instanceof Rectangle) {
            return !(this.x + this.width < other.x ||
                     this.x > other.x + other.width ||
                     this.y + this.height < other.y ||
                     this.y > other.y + other.height);
        } else if (other instanceof Ellipse) {
            const closestX = Math.max(this.x, Math.min(other.x, this.x + this.width));
            const closestY = Math.max(this.y, Math.min(other.y, this.y + this.height));
            
            const dx = other.x - closestX;
            const dy = other.y - closestY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const radius = (other.radiusX + other.radiusY) / 2;
            return distance < radius;
        }
        return false; 
    }
}