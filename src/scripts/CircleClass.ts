import { IShape } from "./IShape";

export class Circle implements IShape{
    private x: number | 0;
    private y: number | 0;
    private radius: number | 0;
    private color: string | "white";
    
    constructor(x: number, y: number, radius: number = 25, color: string = '#ffa6a6') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D ): void {
        ctx.beginPath();
        
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.closePath();
    }
}
