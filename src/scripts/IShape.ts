export interface IShape {
    x: number;
    y: number;
    draw(ctx: CanvasRenderingContext2D): void; // provides the 2D rendering context for the drawing surface of a <canvas> element
    isHit(x: number, y: number): boolean;
    collidesWith(other: IShape): boolean;
}