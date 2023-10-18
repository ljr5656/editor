import { IShape } from '../type';
export default class Shape {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  fill: string = '#fff';
  stroke: string = '#000';
  strokeWidth: number = 1;
  visible: boolean = true;

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
}
