import { captureNativeError } from "../error/nativeError";

export class EventBus {
  /** 事件队列 */
  private queue: Map<string, Array<(params?: any) => void>> = new Map();

  /** 注册事件 */
  public on(event: string, cb: (params?: any) => void) {
    const eventQueue = this.queue.get(event);
    if (!eventQueue) this.queue.set(event, []);
    eventQueue.push(cb);
  }

  /** 触发事件 */
  public emit(event: string, params: any) {
    const eventQueue = this.queue.get(event);
    while (eventQueue.length > 0) {
      const cb = eventQueue.shift();
      captureNativeError(() => {
        cb(params);
      });
    }
  }
}
