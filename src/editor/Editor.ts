interface EditorOptions {
  container: HTMLElement;
}
export default class Editor {
  container: HTMLElement;
  canvasElement!: HTMLCanvasElement;
  canvasContext!: CanvasRenderingContext2D;
  constructor(options: EditorOptions) {
    const { container } = options;
    this.container = container;

    this.createCanvas();
  }

  createCanvas() {
    const { container } = this;
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvasElement = canvas;
    this.canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
    container.appendChild(canvas);
  }

  zoomIn() {}
  zoomOut() {}
  translate() {}
}
