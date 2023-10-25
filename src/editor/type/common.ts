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
  NResize = 'n-resize',
  EResize = 'e-resize',
  SResize = 's-resize',
  WResize = 'w-resize',
  NEResize = 'ne-resize',
  NWResize = 'nw-resize',
  SEResize = 'se-resize',
  SWResize = 'sw-resize',
}
