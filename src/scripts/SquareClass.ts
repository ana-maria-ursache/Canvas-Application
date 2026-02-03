import { Shape } from "./IShape";

export class Square implements Shape {
    private x: number | 0;
    private y: number | 0;
    private size: number | 0;
    private color: string | "white";

    constructor(x: number, y: number, size: number = 50, color: string = '#00ffcc') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D ): void {
        // Needed so that the clearRect doesn't have side effects
        ctx.beginPath(); 

        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillRect(this.x, this.y, this.size, this.size);   
        ctx.closePath();
    }
}