import { LogMessage } from "../../type/log";

export class Log {
  /** 上报 */
  send(event: string, message: LogMessage) {
    console.log("send----", event, message);
  }
}
