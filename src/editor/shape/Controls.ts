import Editor from '../editor';
import Rect from './Rect.';
import { IBox, IPoint } from '../type';

class Controls {
  private controlSize: number = 10;
  private defaultAttrs = {
    width: this.controlSize,
    height: this.controlSize,
    stroke: '#000',
  };
  private controlsMap: {
    [key: string]: Rect;
  } = {};
  constructor(private editor: Editor) {}
  draw(ctx: CanvasRenderingContext2D, box: IBox) {
    const { defaultAttrs, controlSize } = this;
    const { x, y, width, height } = box;
    const half = controlSize / 2;
    const nw = {
      x: x - half,
      y: y - half,
      ...defaultAttrs,
    };
    const ne = {
      x: x + width - half,
      y: y - half,
      ...defaultAttrs,
    };
    const sw = {
      x: x - half,
      y: y + height - half,
      ...defaultAttrs,
    };
    const se = {
      x: x + width - half,
      y: y + height - half,
      ...defaultAttrs,
    };

    this.controlsMap = {
      nw: this.createControl(nw),
      ne: this.createControl(ne),
      sw: this.createControl(sw),
      se: this.createControl(se),
    };

    Object.entries(this.controlsMap).forEach(([key, control]) => {
      control.draw(ctx);
    });
  }

  createControl(box: IBox) {
    const control = new Rect({
      ...box,
    });
    return control;
  }

  getActiveControl(point: IPoint) {
    const res = Object.entries(this.controlsMap).find(([key, control]) => {
      const a = control.hitTest(point);
      debugger;
      return a;
    });
    return res;
  }
}

export default Controls;
