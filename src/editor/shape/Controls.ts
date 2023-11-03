import { IPoint, IRect } from '../type';

interface IControls {
  rotation: IPoint;
  nw: IPoint;
  ne: IPoint;
  se: IPoint;
  sw: IPoint;
}

export default class Controls {
  getControlsType(point: IPoint) {
    const { x, y } = point;
  }

  draw(selectedShapesBBox: IRect | null) {}
}
