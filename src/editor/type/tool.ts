export interface ITool extends IBaseTool {
  hotkey: string;
  type: ToolType;
  moveExcludeDrag: (event: PointerEvent) => void;
}

export interface IBaseTool {
  active: () => void;
  inactive: () => void;
  start: (event: PointerEvent) => void;
  drag: (event: PointerEvent) => void;
  end: (event: PointerEvent, isDragHappened: boolean) => void;
  afterEnd: (event: PointerEvent) => void;
}

export enum ToolType {
  DrawRect = 'drawRect',
  DrawShape = 'drawShape',
}
