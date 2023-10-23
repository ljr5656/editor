import { IRect } from '../type';
import Shape from './Shape';
export default class Rect extends Shape {
  cx: number = 0;
  cy: number = 0;

  constructor(options: IRect) {
    super(options);
    const { cx, cy } = options;
    cx && (this.cx = cx);
    cy && (this.cy = cy);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this;
    ctx.strokeRect(x, y, width, height);
  }
}
