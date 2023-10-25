import Editor from '../editor';
import { CursorType, IBox, IPoint, ITool, ToolType } from '../type';

export default class DragCanvasTool implements ITool {
  hotkey = '';
  type = ToolType.DragCanvas;
  private startPoint: IPoint = { x: -1, y: -1 };
  private prevViewport!: IBox;
  constructor(private editor: Editor) {}
  start(e: PointerEvent) {
    this.startPoint = this.editor.getCursorXY(e);
    this.prevViewport = this.editor.viewportManager.getViewport();
  }

  drag(e: PointerEvent) {
    const { x, y } = this.editor.getCursorXY(e);
    const { x: startX, y: startY } = this.startPoint;
    const dx = x - startX;
    const dy = y - startY;
    const zoom = this.editor.zoomManager.getZoom();

    let { x: viewportX, y: viewportY } = this.prevViewport;
    viewportX = viewportX - dx / zoom;
    viewportY = viewportY - dy / zoom;

    this.editor.viewportManager.setViewport({ x: viewportX, y: viewportY });
    this.editor.scene.render();
  }

  end() {}

  afterEnd() {}

  active() {
    this.editor.setCursor(CursorType.Grab);
  }

  inactive() {
    this.editor.setCursor(CursorType.Default);
  }

  moveExcludeDrag() {}
}
