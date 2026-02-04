import { Rectangle } from "./RectangleClass";

export class Square extends Rectangle {
    constructor(x: number, y: number, size: number = 50, color: string = '#00ffcc') {
        super(x, y, size, size, color);
    }
}