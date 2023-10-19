import Editor from './editor';
import EventEmitter from './eventEmitter';
import Shape from './shape/Shape';
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
  render() {
    const { editor } = this;
    const { canvasContext: ctx, setting, canvasElement: canvas } = editor;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // 2. 清空画布，然后绘制所有可见元素
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 绘制背景色
    ctx.save();
    ctx.fillStyle = setting.get('canvasBgColor');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    this.shapes.forEach((shape) => {
      shape.draw(ctx);
    });

    this.eventEmitter.emit('render');
  }
}
