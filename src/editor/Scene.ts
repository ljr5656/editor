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

  addShape(shape: Shape | Shape[]) {
    if (Array.isArray(shape)) {
      this.shapes.push(...shape);
    } else {
      this.shapes.push(shape);
    }
  }
  render = rafThrottle(() => {
    {
      const { editor } = this;
      const {
        canvasContext: ctx,
        setting,
        canvasElement: canvas,
        viewportManager,
        zoomManager,
        selectedShapes,
      } = editor;
      const viewport = viewportManager.getViewport();

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // 2. 清空画布，然后绘制所有可见元素
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 绘制背景色
      ctx.save();
      ctx.fillStyle = setting.get('canvasBgColor');
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // 场景坐标转换为视口坐标
      const dpr = getDevicePixelRatio();
      const zoom = zoomManager.getZoom();
      const dx = -viewport.x;
      const dy = -viewport.y;
      ctx.scale(dpr * zoom, dpr * zoom);
      ctx.translate(dx, dy);

      this.shapes.forEach((shape) => {
        ctx.save();
        shape.draw(ctx);
        ctx.restore();
      });
      this.drawShapesBbox(selectedShapes.getShapes());

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.save();
      if (setting.get('enableRuler')) {
        this.editor.ruler.draw();
      }
      ctx.restore();

      this.eventEmitter.emit('render');
    }
  });

  getTopHitShape(point: IPoint): Shape | null {
    let topHitShape: Shape | null = null;
    // TODO: optimize, use r-tree to reduce time complexity
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      if (shape.hitTest(point, 0)) {
        topHitShape = shape;
        break;
      }
    }
    return topHitShape;
  }

  drawShapesBbox(shapes: Shape[]) {
    if (shapes.length <= 0) return;
    const { canvasContext: ctx, setting } = this.editor;
    const bBoxes = shapes.map((shape) => shape.getRect());

    ctx.save();
    ctx.strokeStyle = setting.get('selectedBBoxStroke');
    bBoxes.forEach(({ x, y, width, height }) => {
      ctx.strokeRect(x, y, width, height);
    });
    ctx.restore();
  }

  on(eventName: 'render', handler: () => void) {
    this.eventEmitter.on(eventName, handler);
  }
  off(eventName: 'render', handler: () => void) {
    this.eventEmitter.off(eventName, handler);
  }
}
