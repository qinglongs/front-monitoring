import { Point } from "../point/index";

export class Error {
  log = new Point();


  /** 全局错误处理 */
  public captureError(event: ErrorEvent) {
    
  }


  /** 全局 promise 错误处理 */
  public promiseErrorHanding(event: PromiseRejectionEvent) {
    const reason = event;
  }
}
