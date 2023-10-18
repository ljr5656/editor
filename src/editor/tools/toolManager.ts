import Editor from '../editor';
import { ITool, ToolType } from '../type';
import DrawRectTool from './toolDraw/drawRectTool';

export default class ToolManager {
  private editor: Editor;
  toolMap = new Map<ToolType, ITool>();
  hotkeyMap = new Map<string, string>();
  constructor(editor: Editor) {
    this.editor = editor;
    this.registerToolAndHotKey(new DrawRectTool(editor));
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
}
