import Shape from '../shape/Shape';

export interface IControl {
  shape: Shape;
}

export type ITransformHandlesType = 'nw' | 'ne' | 'se' | 'sw' | 'rotation';
