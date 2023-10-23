import Ruler from './ruler';
import Scene from './scene';
import Setting from './setting';
import ToolManager from './tools/toolManager';
import { ECursorType } from './type';
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
  ruler: Ruler;
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
    this.ruler = new Ruler(this);

    this.viewportManager.setViewport({
      x: 0,
      y: 0,
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
    });

    /**
     * setViewport 其实会修改 canvas 的宽高，浏览器的 DOM 更新是异步的，
     * 所以下面的 render 要异步执行
     */
    Promise.resolve().then(() => {
      this.scene.render();
    });
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

  setCursor(cursor: ECursorType) {
    this.canvasElement.style.cursor = cursor;
  }

  zoomIn() {
    this.zoomManager.zoomIn();
  }
  zoomOut() {
    this.zoomManager.zoomOut();
  }
  zoomReset() {
    this.zoomManager.reset();
  }
  getZoom() {
    return 1;
  }

  translate() {}
}
