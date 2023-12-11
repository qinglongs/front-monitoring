export class Report {
  /** 上报 */
  static report(url: string, body: BodyInit) {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    }else {
      // todo 兼容
    }
  }
}
