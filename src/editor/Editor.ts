import Scene from './scene';
import Setting from './setting';
import ToolManager from './tools/toolManager';
import { viewportCoordsToSceneUtil } from './utils';
import ViewportManager from './viewportManager';
import ZoomManager from './zoomManager';
interface EditorOptions {
  container: HTMLElement;
}
export default class Editor {
  container: HTMLElement;
  canvasElement!: HTMLCanvasElement;
  canvasContext!: CanvasRenderingContext2D;

  setting: Setting;
  zoomManager: ZoomManager;
  viewportManager: ViewportManager;
  scene: Scene;
  toolManager: ToolManager;
  constructor(options: EditorOptions) {
    const { container } = options;
    this.container = container;

    this.createCanvas();
    this.setting = new Setting();
    this.setting.set('offsetX', this.container.offsetLeft);
    this.setting.set('offsetY', this.container.offsetTop);

    this.zoomManager = new ZoomManager(this);
    this.viewportManager = new ViewportManager(this);
    this.toolManager = new ToolManager(this);
    this.scene = new Scene(this);

    this.scene.render();
  }

  createCanvas() {
    const { container } = this;
    container.innerHTML = '';
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvasElement = canvas;
    this.canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
    container.appendChild(canvas);
  }

  getCursorXY(event: { clientX: number; clientY: number }) {
    return {
      x: event.clientX - this.setting.get('offsetX'),
      y: event.clientY - this.setting.get('offsetY'),
    };
  }
  getSceneCursorXY(e: PointerEvent, round = false) {
    const { x, y } = this.getCursorXY(e);
    return this.viewportCoordsToScene(x, y, round);
  }
  viewportCoordsToScene(x: number, y: number, round = false) {
    const zoom = this.zoomManager.getZoom();
    const { x: scrollX, y: scrollY } = this.viewportManager.getViewport();
    return viewportCoordsToSceneUtil(x, y, zoom, scrollX, scrollY, round);
  }

  zoomIn() {}
  zoomOut() {}
  zoomReset() {}
  getZoom() {
    return 1;
  }

  translate() {}
}
