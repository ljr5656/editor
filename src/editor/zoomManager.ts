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
    this.zoom = this.getZoom();
  }

  getZoom() {
    return this.zoom;
  }

  setZoom(zoom: number) {
    this.zoom = zoom;
  }

  zoomIn(cx?: number, cy?: number) {
    const zoomStep = this.editor.setting.get('zoomStep');
    const prevZoom = this.zoom;
    const zoom = remainDecimal(prevZoom * (1 + zoomStep));
    this.setZoomAndUpdateViewport(zoom, cx, cy);
  }

  zoomOut(cx?: number, cy?: number) {
    const zoomStep = this.editor.setting.get('zoomStep');
    const prevZoom = this.zoom;
    const zoom = remainDecimal(prevZoom * (1 - zoomStep));
    this.setZoomAndUpdateViewport(zoom, cx, cy);
  }

  reset() {
    this.setZoomAndUpdateViewport(1);
  }

  setZoomAndUpdateViewport(
    zoom: number,
    cx?: number | undefined,
    cy?: number | undefined,
  ) {
    this.setZoom(zoom);
    this.setViewportByZoom(zoom, cx, cy);
    this.editor.scene.render();
  }

  setViewportByZoom(
    prevZoom: number,
    cx: number | undefined,
    cy: number | undefined,
  ) {
    const { viewportManager } = this.editor;
    const { x: scrollX, y: scrollY } = viewportManager.getViewport();
    const zoom = this.getZoom();
    if (cx === undefined || cy === undefined) {
      const center = this.getViewportCenter();
      cx = center.x;
      cy = center.y;
    }

    const { x: sceneX, y: sceneY } = viewportCoordsToSceneUtil(
      cx,
      cy,
      prevZoom,
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

  private getViewportCenter() {
    const { width, height } = this.editor.viewportManager.getViewport();
    return {
      x: width / 2,
      y: height / 2,
    };
  }

  on(
    eventName: 'zoomChange',
    handler: (zoom: number, prevZoom: number) => void,
  ) {
    this.eventEmitter.on(eventName, handler);
  }
  off(
    eventName: 'zoomChange',
    handler: (zoom: number, prevZoom: number) => void,
  ) {
    this.eventEmitter.off(eventName, handler);
  }
}
