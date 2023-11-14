import Editor from '../editor';
import EventEmitter from '../eventEmitter';
import { ITool, EToolType } from '../type';
import DragCanvasTool from './dragCanvasTool';
import DrawEllipseTool from './toolDraw/drawEllipseTool';
import DrawRectTool from './toolDraw/drawRectTool';
import SelectTool from './toolSelect/selectTool';
interface Events {
  change(type: string): void;
}
export default class ToolManager {
  private editor: Editor;
  private eventEmitter = new EventEmitter<Events>();
  private toolMap = new Map<EToolType, ITool>();
  private hotkeyMap = new Map<string, EToolType>();
  private activeTool: ITool | undefined;
  private isDragging = false;
  constructor(editor: Editor) {
    this.editor = editor;
    this.registerToolAndHotKey(new DrawRectTool(editor));
    this.registerToolAndHotKey(new DrawEllipseTool(editor));
    this.registerToolAndHotKey(new DragCanvasTool(editor));
    this.registerToolAndHotKey(new SelectTool(editor));

    this.setActiveTool(EToolType.DrawRect);
    this.bindEvent();
  }

  private registerToolAndHotKey(tool: ITool): void {
    if (this.toolMap.has(tool.type)) {
      console.warn(`tool "${tool.type}" had exit, replace it!`);
    }
    this.toolMap.set(tool.type, tool);

    if (this.hotkeyMap.has(tool.hotkey)) {
      console.warn(`hotkey "${tool.type}" had exit, replace it!`);
    }
    this.hotkeyMap.set(tool.hotkey, tool.type);
  }

  private bindEvent(): void {
    let isPressed: boolean = false;
    const handleDown = (e: PointerEvent) => {
      isPressed = true;
      this.isDragging = false;
      this.activeTool?.start(e);
    };

    const handleMove = (e: PointerEvent) => {
      if (!this.isDragging && isPressed) {
        this.isDragging = true;
      }

      if (this.isDragging) {
        this.activeTool?.drag(e);
      }
    };

    const handleUp = (e: PointerEvent) => {
      this.activeTool?.end(e, this.isDragging);
      this.isDragging = false;
      isPressed = false;
    };

    const canvas = this.editor.canvasElement;
    canvas.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  }

  private setActiveTool(toolType: EToolType): void {
    const activeTool = this.toolMap.get(toolType);
    if (!activeTool) {
      throw new Error(`没有 ${toolType} 对应的工具对象`);
    }
    this.activeTool = activeTool;
    activeTool.active();
    this.eventEmitter.emit('change', activeTool.type);
  }

  public on<K extends keyof Events>(eventName: K, handler: Events[K]): void {
    this.eventEmitter.on(eventName, handler);
  }
  public off<K extends keyof Events>(eventName: K, handler: Events[K]): void {
    this.eventEmitter.off(eventName, handler);
  }
  public destroy(): void {
    this.activeTool?.inactive();
  }
}
