interface ShapeOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}
export default class Shape {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(options: ShapeOptions) {
    const { x, y, width, height } = options;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {}
}
