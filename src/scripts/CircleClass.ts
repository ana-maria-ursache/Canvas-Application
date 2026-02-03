import { IShape } from "./IShape";

export class Circle implements IShape{
    public x: number;
    public y: number;
    private radius: number;
    private color: string;
    
    constructor(x: number, y: number, radius: number = 25, color: string = '#ffa6a6') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    public draw(ctx: CanvasRenderingContext2D ): void {
        ctx.beginPath();
        
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.closePath();
    }

    public isHit(x: number, y: number): boolean {
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy) <= this.radius;
    }
}