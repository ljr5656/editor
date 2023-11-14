export enum ShapeType {
  Shape = 'shape',
  Rect = 'Rect',
  Ellipse = 'ellipse',
  Text = 'text',
  Line = 'line',
}

export interface IShape {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  visible?: boolean;
  rotation?: number;
}

export interface IRect extends IShape {
  cx?: number;
  cy?: number;
}

export interface IEllipse extends IShape {}

export interface IBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum ControlsType {
  Rotate = 'rotate',
  Scale = 'scale',
}
