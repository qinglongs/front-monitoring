import { EventBus } from "../event-bus/index";


export class Point {
  private static eventBus = new EventBus();
  private static report = new Report

  /** 埋点开始 */
  static trackStart(eventName: string, cb: () => void) {
    this.eventBus.on(eventName, cb);
  }

  /** 埋点结束 */
  static trackEnd(event: string, cb: () => void) {
    this.eventBus.emit(event, cb);
  }

  /** 点击 */
  static trackClick(event:string,cb:()=>void){
    
  }
}
