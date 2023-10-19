import Editor from '../editor';
import EventEmitter from '../eventEmitter';
import { ITool, ToolType } from '../type';
import DragCanvasTool from './dragCanvasTool';
import DrawRectTool from './toolDraw/drawRectTool';
interface Events {
  change(type: string): void;
}
export default class ToolManager {
  private editor: Editor;
  private eventEmitter = new EventEmitter<Events>();
  toolMap = new Map<ToolType, ITool>();
  hotkeyMap = new Map<string, string>();
  activeTool: ITool | undefined;
  isDragging = false;
  constructor(editor: Editor) {
    this.editor = editor;
    this.registerToolAndHotKey(new DrawRectTool(editor));
    this.registerToolAndHotKey(new DragCanvasTool(editor));

    this.setActiveTool(ToolType.DrawRect);
    this.bindEvent();
  }

  registerToolAndHotKey(tool: ITool) {
    if (this.toolMap.has(tool.type)) {
      console.warn(`tool "${tool.type}" had exit, replace it!`);
    }
    this.toolMap.set(tool.type, tool);

    if (this.hotkeyMap.has(tool.hotkey)) {
      console.warn(`hotkey "${tool.type}" had exit, replace it!`);
    }
    this.hotkeyMap.set(tool.hotkey, tool.type);
  }

  private bindEvent() {
    let isPressing = false;
    const handleDown = (e: PointerEvent) => {
      this.isDragging = false;
      isPressing = true;
      this.activeTool?.start(e);
    };

    const handleMove = (e: PointerEvent) => {
      if (!this.isDragging && isPressing) {
        this.isDragging = true;
      }

      if (this.isDragging) {
        this.activeTool?.drag(e);
      }
    };

    const handleUp = (e: PointerEvent) => {
      this.isDragging = false;
      isPressing = false;
    };

    const canvas = this.editor.canvasElement;
    canvas.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  }

  setActiveTool(toolType: ToolType) {
    const activeTool = this.toolMap.get(toolType);
    if (!activeTool) {
      throw new Error(`没有 ${toolType} 对应的工具对象`);
    }
    this.activeTool = activeTool;
    activeTool.active();
    this.eventEmitter.emit('change', activeTool.type);
  }

  on<K extends keyof Events>(eventName: K, handler: Events[K]) {
    this.eventEmitter.on(eventName, handler);
  }
  off<K extends keyof Events>(eventName: K, handler: Events[K]) {
    this.eventEmitter.off(eventName, handler);
  }
  destroy() {
    this.activeTool?.inactive();
  }
}
