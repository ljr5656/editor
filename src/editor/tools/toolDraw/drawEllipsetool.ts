import Editor from '../../editor';
import Ellipse from '../../shape/Ellipse';
import { IRect, ITool, EToolType } from '../../type';
import { normalizeRect } from '../../utils';
import DrawShapeTool from './drawShapeTool';

export default class DrawEllipseTool extends DrawShapeTool implements ITool {
  readonly type = EToolType.DrawEllipse;
  constructor(editor: Editor) {
    super(editor);
  }

  protected createShape(rect: IRect) {
    console.log(rect.width, rect.height);
    return new Ellipse({ ...rect });
  }
}
