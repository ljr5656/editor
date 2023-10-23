import EventEmitter from './eventEmitter';

interface Events {
  update(attrs: SettingValue): void;
}

export type SettingValue = Setting['value'];

export default class Setting {
  private eventEmitter = new EventEmitter<Events>();
  private value = {
    canvasBgColor: '#f4f4f4',

    offsetX: 0, // 鼠标坐标位置的修正值
    offsetY: 0,

    snapToPixelGrid: true, // 是否吸附到像素网格

    zoomStep: 0.1, // 缩放比例步长

    /**** 标尺相关 ****/
    enableRuler: true,
    minStepInViewport: 50, // 视口区域下的最小步长
    rulerBgColor: '#fff',
    rulerStroke: '#e6e6e6',
    rulerMarkStroke: '#000',
    rulerWidth: 40, // 宽度
    rulerMarkSize: 8, // 刻度高度
  };

  set<K extends keyof Setting['value']>(key: K, value: Setting['value'][K]) {
    this.value[key] = value;
    this.eventEmitter.emit('update', this.getAttrs());
  }
  get<K extends keyof Setting['value']>(key: K) {
    return this.value[key];
  }
  getAttrs() {
    return { ...this.value };
  }

  on(eventName: 'update', handler: (value: Setting['value']) => void) {
    this.eventEmitter.on(eventName, handler);
  }
  off(eventName: 'update', handler: (value: Setting['value']) => void) {
    this.eventEmitter.off(eventName, handler);
  }
}
