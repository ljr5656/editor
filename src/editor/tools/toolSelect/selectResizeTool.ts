import Editor from '../../editor';
import { IBaseTool, IPoint } from '../../type';

export default class SelectResizeTool implements IBaseTool {
  private startPoint: IPoint = { x: -1, y: -1 };
  private dragPoint: IPoint | null = null;
  private prevShapePoints: IPoint[] = [];

  constructor(private editor: Editor) {}

  active() {}
  inactive() {}
  start(e: PointerEvent) {
    const { editor } = this;
    this.startPoint = editor.getSceneCursorXY(e);
    const selectedShapes = editor.selectedShapes.getShapes();
    this.prevShapePoints = selectedShapes.map((shape) => ({
      x: shape.x,
      y: shape.y,
    }));
    debugger;
    console.log(editor.controls.getActiveControl(this.startPoint));
  }
  drag(e: PointerEvent) {
    this.dragPoint = this.editor.getSceneCursorXY(e);
    this.move();
  }

  move() {
    // const { editor, startPoint, prevShapePoints } = this;
    // const { scene } = editor;
    // const selectedShapes = editor.selectedShapes.getShapes();
    // const dx = this.dragPoint!.x - startPoint.x;
    // const dy = this.dragPoint!.y - startPoint.y;
    // for (let i = 0, len = selectedShapes.length; i < len; i++) {
    //   selectedShapes[i].x = prevShapePoints[i].x + dx;
    //   selectedShapes[i].y = prevShapePoints[i].y + dy;
    // }
    // scene.render();
  }
  end() {}
  afterEnd() {}
}
