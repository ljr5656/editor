import Editor from './editor';
import EventEmitter from './eventEmitter';
import { IBox, IPoint } from './type';
import { getDevicePixelRatio } from './utils';

interface Events {
  viewportChange(x: number, y: number): void;
}
export default class ViewportManager {
  private scrollX = 0;
  private scrollY = 0;
  private readonly eventEmitter = new EventEmitter<Events>();
  constructor(private editor: Editor) {}

  public getViewport(): IBox {
    return {
      x: this.scrollX,
      y: this.scrollY,
      width: parseFloat(this.editor.canvasElement.style.width),
      height: parseFloat(this.editor.canvasElement.style.height),
    };
  }

  public setViewport({ x, y, width, height }: Partial<IBox>): void {
    const prevX = this.scrollX;
    const prevY = this.scrollY;
    const dpr = getDevicePixelRatio();
    if (x && y) {
      this.scrollX = x;
      this.scrollY = y;
    }

    if (width && height) {
      this.editor.canvasElement.width = width * dpr;
      this.editor.canvasElement.style.width = width + 'px';
      this.editor.canvasElement.height = height * dpr;
      this.editor.canvasElement.style.height = height + 'px';
    }

    if (prevX !== x || prevY !== y) {
      this.eventEmitter.emit('viewportChange', x as number, y as number);
    }
  }

  public getCenter(): IPoint {
    const { width, height } = this.getViewport();
    return {
      x: width / 2,
      y: height / 2,
    };
  }

  public on(
    eventName: 'viewportChange',
    handler: (x: number, y: number) => void,
  ): void {
    this.eventEmitter.on(eventName, handler);
  }
  public off(
    eventName: 'viewportChange',
    handler: (x: number, y: number) => void,
  ): void {
    this.eventEmitter.off(eventName, handler);
  }
}
