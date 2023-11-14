import Editor from '../../editor';
import Rect from '../../shape/Rect.';
import { IRect, ITool, EToolType } from '../../type';
import DrawShapeTool from './drawShapeTool';

export default class DrawRectTool extends DrawShapeTool implements ITool {
  readonly type = EToolType.DrawRect;
  constructor(editor: Editor) {
    super(editor);
  }

  protected createShape(rect: IRect) {
    return new Rect(rect);
  }
}
