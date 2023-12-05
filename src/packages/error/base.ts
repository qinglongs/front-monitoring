import { Point } from "../point/index";

export class Error {
  point = new Point();

  constructor() {
    this.registeredEvents();
  }

  /** 注册事件 */
  public registeredEvents() {
    window.addEventListener("error", this._globalErrorHandling);
    window.addEventListener("unhandledrejection", this._promiseErrorHanding);
  }

  /** 全局错误处理 */
  private _globalErrorHandling(event: ErrorEvent) {}

  /** 同步错误处理 */

  /** 异步错误处理 */

  /** 全局 promise 错误处理 */
  private _promiseErrorHanding(event: PromiseRejectionEvent) {}
}
