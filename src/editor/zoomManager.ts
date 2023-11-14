import Editor from './editor';
import EventEmitter from './eventEmitter';
import { remainDecimal, viewportCoordsToSceneUtil } from './utils';

interface Event {
  zoomChange(zoom: number, prevZoom: number): void;
}
export default class ZoomManager {
  zoom: number = 1;
  editor: Editor;
  eventEmitter = new EventEmitter<Event>();
  constructor(editor: Editor) {
    this.editor = editor;
  }

  public getZoom(): number {
    return this.zoom;
  }

  public setZoom(zoom: number): void {
    this.eventEmitter.emit('zoomChange', zoom, this.zoom);
    this.zoom = zoom;
  }

  public zoomIn(cx?: number, cy?: number): void {
    const zoomStep = this.editor.setting.get('zoomStep');
    const prevZoom = this.zoom;
    const zoom = remainDecimal(prevZoom * (1 + zoomStep));
    this.setZoomAndUpdateViewport(zoom, cx, cy);
  }

  public zoomOut(cx?: number, cy?: number): void {
    const zoomStep = this.editor.setting.get('zoomStep');
    const prevZoom = this.zoom;
    const zoom = remainDecimal(prevZoom * (1 - zoomStep));
    this.setZoomAndUpdateViewport(zoom, cx, cy);
  }

  public reset(): void {
    this.setZoomAndUpdateViewport(1);
  }

  private setZoomAndUpdateViewport(
    zoom: number,
    cx?: number,
    cy?: number,
  ): void {
    this.setZoom(zoom);
    this.setViewportByZoom(zoom, cx, cy);
    this.editor.scene.render();
  }

  private setViewportByZoom(zoom: number, cx?: number, cy?: number): void {
    const { viewportManager } = this.editor;
    const { x: scrollX, y: scrollY } = viewportManager.getViewport();

    const { x: centerX, y: centerY } = viewportManager.getCenter();
    cx = cx !== undefined ? cx : centerX;
    cy = cy !== undefined ? cy : centerY;

    const { x: sceneX, y: sceneY } = viewportCoordsToSceneUtil(
      cx,
      cy,
      zoom,
      scrollX,
      scrollY,
    );
    const newScrollX = sceneX - cx / zoom;
    const newScrollY = sceneY - cy / zoom;

    viewportManager.setViewport({
      x: newScrollX,
      y: newScrollY,
    });
  }

  public on(
    eventName: 'zoomChange',
    handler: (zoom: number, prevZoom: number) => void,
  ): void {
    this.eventEmitter.on(eventName, handler);
  }
  public off(
    eventName: 'zoomChange',
    handler: (zoom: number, prevZoom: number) => void,
  ): void {
    this.eventEmitter.off(eventName, handler);
  }
}
