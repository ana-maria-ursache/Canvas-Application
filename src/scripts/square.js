export class Square {
    constructor(x, y, size = 50, color = '#00ffcc') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillRect(this.x, this.y, this.size, this.size);
        
        ctx.shadowBlur = 0;
        ctx.closePath();
    }
}