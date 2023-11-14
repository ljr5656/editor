import { IBox, IPoint, IShape } from '../type';
export default class Shape {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  fill: string = '#fff';
  stroke: string = '#000';
  strokeWidth: number = 1;
  visible: boolean = true;
  rotation?: number;

  constructor(options: IShape) {
    this.setOptions(options);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) {
      throw new Error('no ctx');
    }
  }

  setOptions(options: Partial<IShape>) {
    let key: keyof Partial<IShape>;
    for (key in options) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-explicit-any
      const self: any = this;
      self[key] = options[key];
    }
  }

  hitTest(point: IPoint, padding = 0) {
    const rect = this.getRect();
    return (
      point.x >= rect.x - padding &&
      point.y >= rect.y - padding &&
      point.x <= rect.x + rect.width + padding &&
      point.y <= rect.y + rect.height + padding
    );
  }

  getRect(): IBox {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  getCenter(): IPoint {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }
}
