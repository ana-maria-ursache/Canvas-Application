// import { Shape } from "./Shape";

// export class Circle implements Shape{
//     public x: number;
//     public y: number;
//     private radius: number;
//     private color: string;
    
//     constructor(x: number, y: number, radius: number = 25, color: string = '#ffa6a6') {
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.color = color;
//     }

//     public draw(ctx: CanvasRenderingContext2D ): void {
//         ctx.beginPath();
        
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
//         ctx.shadowBlur = 15;
//         ctx.shadowColor = this.color;
        
//         ctx.fillStyle = this.color;
//         ctx.fill();
        
//         ctx.closePath();
//     }

//     public isHit(x: number, y: number): boolean {
//         const dx = x - this.x;
//         const dy = y - this.y;
//         return Math.sqrt(dx * dx + dy * dy) <= this.radius;
//     }

//     public collidesWith(other: Shape): boolean {
//         const dx = other.x - this.x;
//         const dy = other.y - this.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
        
//         // is a circle
//         if ((other as any).radius !== undefined) {
//             return distance < this.radius + (other as any).radius;
//         }
//         // is a square
//         if ((other as any).size !== undefined) {
//             const size = (other as any).size;

//             const closestX = Math.max(other.x, Math.min(this.x, other.x + size));
//             const closestY = Math.max(other.y, Math.min(this.y, other.y + size));

//             const distX = this.x - closestX;
//             const distY = this.y - closestY;
//             return (distX * distX + distY * distY) < (this.radius * this.radius);
//         }
//         return false;
//     }
// }

import { Ellipse } from "./EllipseClass";

export class Circle extends Ellipse {
    constructor(x: number, y: number, radius: number = 25, color: string = '#ffa6a6') {
        super(x, y, radius, radius, color);
    }

    // get radius(): number {
    //     return this.radiusX;
    // }
}