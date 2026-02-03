import { IShape } from "./IShape";

export class Square implements IShape {
    public x: number;
    public y: number;
    private size: number;
    private color: string;

    constructor(x: number, y: number, size: number = 50, color: string = '#00ffcc') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    public draw(ctx: CanvasRenderingContext2D ): void {
        // Needed so that the clearRect doesn't have side effects
        ctx.beginPath(); 

        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillRect(this.x, this.y, this.size, this.size);   
        ctx.closePath();
    }

    public isHit(x: number, y: number): boolean {
        return x >= this.x && x <= this.x + this.size &&
               y >= this.y && y <= this.y + this.size;
    }
}