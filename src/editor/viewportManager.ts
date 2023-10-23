import Editor from './editor';
import EventEmitter from './eventEmitter';
import { IBox } from './type';
import { getDevicePixelRatio } from './utils';

interface Events {
  viewportChange(x: number, y: number): void;
}
export default class ViewportManager {
  private scrollX = 0;
  private scrollY = 0;
  private eventEmitter = new EventEmitter<Events>();
  constructor(private editor: Editor) {}

  getViewport(): IBox {
    return {
      x: this.scrollX,
      y: this.scrollY,
      width: parseFloat(this.editor.canvasElement.style.width),
      height: parseFloat(this.editor.canvasElement.style.height),
    };
  }

  setViewport({ x, y, width, height }: Partial<IBox>) {
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

  on(eventName: 'viewportChange', handler: (x: number, y: number) => void) {
    this.eventEmitter.on(eventName, handler);
  }
  off(eventName: 'viewportChange', handler: (x: number, y: number) => void) {
    this.eventEmitter.off(eventName, handler);
  }
}
