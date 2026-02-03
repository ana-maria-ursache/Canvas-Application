export interface IShape {
    x: number;
    y: number;
    draw(ctx: CanvasRenderingContext2D): void;
    isHit(x: number, y: number): boolean;
    collidesWith(other: IShape): boolean;
}