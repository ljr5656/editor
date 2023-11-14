export interface IPoint {
  x: number;
  y: number;
}

export enum CursorType {
  Grab = 'grab',
  Grabbing = 'grabbing',
  Default = 'default',
  Crosshair = 'crosshair',
  Pointer = 'pointer',
  AllScore = 'all-scroll',
  NE = 'ne',
  NW = 'nw',
  SE = 'se',
  SW = 'sw',
}
