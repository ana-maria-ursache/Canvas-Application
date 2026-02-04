export abstract class Shape {
    x: number;
    y: number;
    color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    abstract draw(ctx: CanvasRenderingContext2D): void; // provides the 2D rendering context for the drawing surface of a <canvas> element
    abstract isHit(x: number, y: number): boolean;
    abstract collidesWith(other: Shape): boolean;
}