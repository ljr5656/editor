export interface ShapeOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number,
  visible: boolean,
}
export default class Shape {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  fill: string = '#fff';
  stroke: string = '#000';
  strokeWidth: number = 1;
  visible: boolean = true;

  constructor(options: ShapeOptions) {
    this.setOptions(options);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if(!ctx) {
      throw new Error('no ctx');
    }
  }

  setOptions(options: Partial<ShapeOptions>) {
    let key: keyof Partial<ShapeOptions>;
    for (key in options) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-explicit-any
      const self: any = this;
      self[key] = options[key];
    }
  }
}
