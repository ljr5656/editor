import Editor from '../../editor';
import Ellipse from '../../shape/Ellipse';
import { IRect, ITool, ToolType } from '../../type';
import DrawShapeTool from './drawShapeTool';

export default class DrawEllipseTool extends DrawShapeTool implements ITool {
  readonly type = ToolType.DrawEllipse;
  constructor(editor: Editor) {
    super(editor);
  }

  protected createShape(rect: IRect) {
    return new Ellipse({ ...rect });
  }
}
