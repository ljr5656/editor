import Shape, {ShapeOptions} from './Shape';

export interface RectOptions extends ShapeOptions {
  cx: number;
  cy: number;
}
export default class Rect extends Shape {
  cx: number = 0;
  cy: number = 0;

  constructor(options: RectOptions) {
    super(options);
    const { cx, cy } = options;
    cx && (this.cx = cx);
    cy && (this.cy = cy);
  }
}
