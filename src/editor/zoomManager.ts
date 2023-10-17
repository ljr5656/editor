import Editor from './editor';

export default class ZoomManager {
  zoom: number = 1;
  editor: Editor;
  constructor(editor: Editor) {
    this.editor = editor;
    this.zoom = this.getZoom();
  }

  getZoom() {
    return this.zoom;
  }
}
