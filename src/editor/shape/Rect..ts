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
}
