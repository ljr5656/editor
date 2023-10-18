import Editor from '../../editor';
import Rect from '../../shape/Rect.';
import { IRect, ITool, ToolType } from '../../type';
import { DrawGraphTool } from './drawShapeTool';

export default class DrawRectTool extends DrawGraphTool implements ITool {
  readonly type = ToolType.DrawRect;
  constructor(editor: Editor) {
    super(editor);
  }

  protected createShape(rect: IRect) {
    return new Rect(rect);
  }
}
