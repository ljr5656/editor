import Editor from './editor';
import { IBox } from './type';

export default class ViewportManager {
  private scrollX = 0;
  private scrollY = 0;
  constructor(private editor: Editor) {}

  getViewport(): IBox {
    return {
      x: this.scrollX,
      y: this.scrollY,
      width: parseFloat(this.editor.canvasElement.style.width),
      height: parseFloat(this.editor.canvasElement.style.height),
    };
  }
}
