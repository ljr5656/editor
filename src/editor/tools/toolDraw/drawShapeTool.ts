import Editor from '../../editor';
import { ECursorType, IPoint, IRect, ITool, ToolType } from '../../type';
import Shape from '../../shape/Shape';
import { normalizeRect } from '../../utils';

export default abstract class DrawShapeTool implements ITool {
  hotkey = '';
  type = ToolType.DrawShape;
  protected drawingShape: Shape | null = null;
  private startPoint: IPoint = { x: -1, y: -1 };
  private lastDragPoint!: IPoint;
  private lastDragPointInViewport!: IPoint;
  private isDragging = false;

  constructor(private editor: Editor) {}

  active() {
    this.editor.setCursor(ECursorType.Crosshair);
  }

  inactive() {
    this.editor.setCursor(ECursorType.Default);
  }

  moveExcludeDrag() {}

  start(e: PointerEvent) {
    const { editor } = this;
    this.startPoint = editor.getSceneCursorXY(
      e,
      this.editor.setting.get('snapToPixelGrid'),
    );
    this.drawingShape = null;
    this.isDragging = false;
  }

  drag(e: PointerEvent) {
    this.isDragging = true;
    this.lastDragPointInViewport = this.editor.getCursorXY(e);
    this.lastDragPoint = this.editor.getSceneCursorXY(
      e,
      this.editor.setting.get('snapToPixelGrid'),
    );
    this.updateRect();
  }

  end() {}

  afterEnd() {}

  updateRect() {
    if (!this.isDragging) return;

    const { lastDragPoint, editor, startPoint } = this;
    const { scene } = editor;
    const { x: startX, y: startY } = startPoint;
    const { x, y } = lastDragPoint;

    const width = x - startX;
    const height = y - startY;

    const rect = normalizeRect({
      x: startX,
      y: startY,
      width,
      height,
    });
    if (this.drawingShape) {
      this.updateShape(rect);
    } else {
      const shape = this.createShape(rect)!;
      scene.addShape(shape);
      this.drawingShape = shape;
    }

    scene.render();
  }
  updateShape(rect: IRect) {
    const drawingShape = this.drawingShape!;
    drawingShape.x = rect.x;
    drawingShape.y = rect.y;
    drawingShape.width = rect.width;
    drawingShape.height = rect.height;
  }
  protected abstract createShape(rect: IRect, noMove?: boolean): Shape | null;
}
