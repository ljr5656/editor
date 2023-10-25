import Editor from '../../editor';
import { CursorType, IPoint, ITool, ToolType } from '../../type';

export default class SelectTool implements ITool {
  type = ToolType.Select;
  hotkey = '';
  startPoint: IPoint = { x: -1, y: -1 };

  constructor(private editor: Editor) {}

  active() {
    this.editor.setCursor(CursorType.Default);
  }

  inactive() {
    this.editor.setCursor(CursorType.Default);
  }

  start(e: PointerEvent) {
    const { editor } = this;
    const { scene, selectedShapes } = editor;
    this.startPoint = editor.getSceneCursorXY(e);
    const topHitShape = scene.getTopHitShape(this.startPoint);
    if (topHitShape) {
      selectedShapes.setShapes([topHitShape]);
    } else {
      selectedShapes.clear();
    }
    scene.render();
  }

  drag() {}

  end() {
    const { editor } = this;
    const { scene } = editor;
    scene.render();
  }

  afterEnd() {}

  moveExcludeDrag() {}
}
