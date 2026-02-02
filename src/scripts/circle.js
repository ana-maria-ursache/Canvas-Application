export class Circle {
    constructor(x, y, radius = 25, color = '#ffa6a6') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    /**
     * Renders the circle onto the provided context.
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.closePath();
    }
}
