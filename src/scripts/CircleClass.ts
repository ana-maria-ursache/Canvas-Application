import { Ellipse } from "./EllipseClass";

export class Circle extends Ellipse {
    constructor(x: number, y: number, radius: number = 25, color: string = '#ffa6a6') {
        super(x, y, radius, radius, color);
    }
}