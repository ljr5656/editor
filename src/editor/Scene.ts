import Editor from './editor';
import EventEmitter from './eventEmitter';
import Shape from './shape/Shape';
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

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.save();
      if (setting.get('enableRuler')) {
        this.editor.ruler.draw();
      }
      ctx.restore();

      this.eventEmitter.emit('render');
    }
  });

  on(eventName: 'render', handler: () => void) {
    this.eventEmitter.on(eventName, handler);
  }
  off(eventName: 'render', handler: () => void) {
    this.eventEmitter.off(eventName, handler);
  }
}
