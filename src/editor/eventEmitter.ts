// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class EventEmitter<T extends Record<string | symbol, any>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _eventMap: Record<keyof T, Array<(...args: any[]) => void>> = {} as any;

  on<K extends keyof T>(eventName: K, listener: T[K]) {
    if (!this._eventMap[eventName]) {
      this._eventMap[eventName] = [];
    }
    this._eventMap[eventName].push(listener);
    return this;
  }

  emit<K extends keyof T>(eventName: K,  ...args: Parameters<T[K]>) {
    const listeners = this._eventMap[eventName];
    if (!listeners || listeners.length === 0) return false;
    listeners.forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  off<K extends keyof T>(eventName: K, listener: T[K]) {
    const listeners = this._eventMap[eventName];
    if (listeners && listeners.length > 0) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
    return this;
  }

  once() {

  }
}