export class Square {
    constructor(x, y, size = 50, color = '#00ffcc') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw(ctx) {
        // Needed so that the clearRect doesn't have side effects
        ctx.beginPath(); 

        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillRect(this.x, this.y, this.size, this.size);   
        ctx.closePath();
    }
}