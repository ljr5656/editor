import Editor from '../../editor';
import { CursorType, IBaseTool, IPoint, ITool, EToolType } from '../../type';
import SelectMoveTool from './selectMoveTool';
import SelectResizeTool from './selectResizeTool';

/**几种情况
 * 1. 选中一个shape
 * 2. 没选中, 拖拽, 生成选框
 * 3.
 */
export default class SelectTool implements ITool {
  type = EToolType.Select;
  hotkey = '';
  startPoint: IPoint = { x: -1, y: -1 };
  currStrategy: IBaseTool | null = null;
  private strategyMove: SelectMoveTool;
  private strategyResize: SelectResizeTool;

  constructor(private editor: Editor) {
    this.strategyMove = new SelectMoveTool(editor);
    this.strategyResize = new SelectResizeTool(editor);
  }

  active() {
    this.editor.setCursor(CursorType.Default);
  }

  inactive() {
    this.editor.setCursor(CursorType.Default);
  }

  /**
   * 1. 直接选中一个图形
   * 2. 拖拽产生选区
   * 3. 选中控制点
   */
  start(e: PointerEvent) {
    const { editor } = this;
    const { scene, selectedShapes, controls } = editor;
    this.startPoint = editor.getSceneCursorXY(e);
    const topHitShape = scene.getTopHitShape(this.startPoint);
    if (topHitShape) {
      selectedShapes.setShapes([topHitShape]);
      this.currStrategy = this.strategyMove;
    } else if (controls.getActiveControl(this.startPoint)) {
      this.currStrategy = this.strategyResize;
    } else {
      selectedShapes.clear();
    }
    scene.render();

    if (this.currStrategy) {
      this.currStrategy.active();
      this.currStrategy.start(e);
    }
  }

  drag(e: PointerEvent) {
    if (this.currStrategy) {
      this.currStrategy.drag(e);
    }
  }

  end() {
    const { editor } = this;
    const { scene } = editor;
    scene.render();
  }

  afterEnd() {}

  moveExcludeDrag() {}
}
