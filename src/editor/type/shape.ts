export enum ShapeType {
  Graph = 'Graph',
  Rect = 'Rect',
  Ellipse = 'Ellipse',
  Text = 'Text',
  Line = 'Line',
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
