import Editor from './editor';
import EventEmitter from './eventEmitter';
import Shape from './shape/Shape';
import { IPoint } from './type';
import { getDevicePixelRatio, rafThrottle } from './utils';
interface Events {
  render(): void;
}
export default class Scene {
  shapes: Shape[] = [];
  private eventEmitter = new EventEmitter<Events>();
  constructor(private editor: Editor) {}

  addShape(shape: Shape | Shape[]): void {
    this.shapes.push(...(Array.isArray(shape) ? shape : [shape]));
  }

  render = rafThrottle(() => {
    {
      const { editor } = this;
      const { canvasContext: ctx } = editor;

      this.initCtx(ctx);
      this.drawBackground(ctx);
      this.drawRuler(ctx);

      this.setTransform(ctx);
      this.drawShapes(ctx);
      this.drawSelectedShapesBbox(ctx);

      this.eventEmitter.emit('render');
    }
  });

  getTopHitShape(point: IPoint): Shape | null {
    let topHitShape: Shape | null = null;
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      if (shape.hitTest(point, 0)) {
        topHitShape = shape;
        break;
      }
    }
    return topHitShape;
  }

  private drawSelectedShapesBbox(ctx: CanvasRenderingContext2D): void {
    const { selectedShapes, setting } = this.editor;
    const shapes = selectedShapes.getShapes();
    if (shapes.length <= 0) return;

    const bBoxes = shapes.map((shape) => shape.getRect());
    ctx.save();
    ctx.strokeStyle = setting.get('selectedBBoxStroke');
    bBoxes.forEach(({ x, y, width, height }) => {
      ctx.strokeRect(x, y, width, height);
    });
    ctx.restore();
  }

  private initCtx(ctx: CanvasRenderingContext2D): void {
    const { width, height } = this.editor.canvasElement;
    this.resetTransform(ctx);
    ctx.clearRect(0, 0, width, height);
  }

  private resetTransform(ctx: CanvasRenderingContext2D): void {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  private drawBackground(ctx: CanvasRenderingContext2D): void {
    const { canvasElement, setting } = this.editor;
    const { width, height } = canvasElement;
    ctx.save();
    ctx.fillStyle = setting.get('canvasBgColor');
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  private drawRuler(ctx: CanvasRenderingContext2D): void {
    const { setting } = this.editor;
    if (!setting.get('enableRuler')) return;
    ctx.save();
    this.editor.ruler.draw();
    ctx.restore();
  }

  private drawShapes(ctx: CanvasRenderingContext2D): void {
    this.shapes.forEach((shape) => {
      ctx.save();
      shape.draw(ctx);
      ctx.restore();
    });
  }

  private setTransform(ctx: CanvasRenderingContext2D): void {
    const { zoomManager, viewportManager } = this.editor;
    const { x, y } = viewportManager.getViewport();
    const { zoom } = zoomManager;
    const dpr = getDevicePixelRatio();
    ctx.scale(dpr * zoom, dpr * zoom);
    ctx.translate(-x, -y);
  }

  on(eventName: 'render', handler: () => void): void {
    this.eventEmitter.on(eventName, handler);
  }
  off(eventName: 'render', handler: () => void): void {
    this.eventEmitter.off(eventName, handler);
  }
}
