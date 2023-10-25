import Editor from './editor';
import EventEmitter from './eventEmitter';
import Shape from './shape/Shape';

interface Events {
  shapesChange(shapes: Shape[]): void;
  hoverShapeChange(shape: Shape | null, prevShape: Shape | null): void;
}

export default class SelectedShapes {
  private shapes: Shape[] = [];
  private hoverShape: Shape | null = null;
  private eventEmitter = new EventEmitter<Events>();

  constructor(private editor: Editor) {}

  setShapes(shapes: Shape[]) {
    this.shapes = shapes;
    this.eventEmitter.emit('shapesChange', this.shapes);
  }

  getShapes(): Shape[] {
    return this.shapes;
  }

  hasShape(shape: Shape) {
    return this.shapes.includes(shape);
  }

  clear() {
    this.shapes = [];
    this.eventEmitter.emit('shapesChange', this.shapes);
  }

  isEmpty() {
    return this.shapes.length === 0;
  }

  on<K extends keyof Events>(eventName: K, handler: Events[K]) {
    this.eventEmitter.on(eventName, handler);
  }

  off<K extends keyof Events>(eventName: K, handler: Events[K]) {
    this.eventEmitter.off(eventName, handler);
  }
}
