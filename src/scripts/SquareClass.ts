
// import { Shape } from "./Shape";

// export class Square implements Shape {
//     public x: number;
//     public y: number;
//     private size: number;
//     private color: string;

//     constructor(x: number, y: number, size: number = 50, color: string = '#00ffcc') {
//         this.x = x;
//         this.y = y;
//         this.size = size;
//         this.color = color;
//     }

//     public draw(ctx: CanvasRenderingContext2D ): void {
//         // Needed so that the clearRect doesn't have side effects
//         ctx.beginPath(); 

//         ctx.fillStyle = this.color;
        
//         ctx.shadowBlur = 15;
//         ctx.shadowColor = this.color;
        
//         ctx.fillRect(this.x, this.y, this.size, this.size);   
//         ctx.closePath();
//     }

//     public isHit(x: number, y: number): boolean {
//         return x >= this.x && x <= this.x + this.size &&
//                y >= this.y && y <= this.y + this.size;
//     }
    
//     public collidesWith(other: Shape): boolean {
//         // is a square
//         if ((other as any).size !== undefined) {
//             return !(this.x + this.size < other.x ||
//                      this.x > other.x + (other as any).size ||
//                      this.y + this.size < other.y ||
//                      this.y > other.y + (other as any).size);
//         }
//         // is a circle
//         if ((other as any).radius !== undefined) {
//             const circle = other as any;
//             const closestX = Math.max(this.x, Math.min(circle.x, this.x + this.size));
//             const closestY = Math.max(this.y, Math.min(circle.y, this.y + this.size));

//             const distX = circle.x - closestX;
//             const distY = circle.y - closestY;
//             return (distX * distX + distY * distY) < (circle.radius * circle.radius);
//         }
//         return false;
//     }   
// }


import { Rectangle } from "./RectangleClass";

export class Square extends Rectangle {
    constructor(x: number, y: number, size: number = 50, color: string = '#00ffcc') {
        super(x, y, size, size, color);
    }
}