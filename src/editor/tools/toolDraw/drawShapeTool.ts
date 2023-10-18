import { ThunderboltFilled } from '@ant-design/icons';
import Editor from '../../editor';
import { IPoint, ITool, ToolType } from '../../type';
import Shape from '../../shape/Shape';

export abstract class DrawGraphTool implements ITool {
  hotkey = '';
  type = ToolType.DrawShape;
  protected drawingGraph: Shape | null = null;
  private startPoint: IPoint = { x: -1, y: -1 };
  private lastDragPoint!: IPoint;
  private lastDragPointInViewport!: IPoint;
  private isDragging = false;

  constructor(private editor: Editor) {}

  active() {}

  inactive() {}

  moveExcludeDrag() {}

  start(e: PointerEvent) {
    const { editor } = this;
    this.startPoint = editor.getSceneCursorXY(
      e,
      this.editor.setting.get('snapToPixelGrid'),
    );
    this.drawingGraph = null;
    this.isDragging = false;
  }

  drag(e: PointerEvent) {
    this.isDragging = true;
    this.lastDragPointInViewport = this.editor.getCursorXY(e);
    this.lastDragPoint = this.editor.getSceneCursorXY(
      e,
      this.editor.setting.get('snapToPixelGrid'),
    );
    // this.updateShape();
  }

  end() {}

  afterEnd() {}
}
