import { IEllipse, ShapeType } from '../type';
import { DOUBLE_PI } from '../utils';
import Shape from './Shape';

export default class Ellipse extends Shape {
  type = ShapeType.Ellipse;
  constructor(options: IEllipse) {
    super({ ...options });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { x, y, width, height } = this;
    const cx = x + width / 2;
    const cy = y + height / 2;

    ctx.beginPath();
    ctx.ellipse(cx, cy, width / 2, height / 2, 0, 0, DOUBLE_PI);
    ctx.stroke();
    // ctx.fill();
    ctx.closePath();
  }
}
