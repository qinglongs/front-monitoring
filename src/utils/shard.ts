import * as md5 from "md5";

/** 根据字符生成固定的id */
export function generateID(str: string) {
  return md5(str);
}

/** 对每一个错误详情，生成唯一的编码 */
export function getErrorUid(input: string): string {
  return window.btoa(encodeURIComponent(input));
}



/** 判断资料是否来自缓存 */
export function isCache(entry: PerformanceResourceTiming): boolean {
  return (
    entry.transferSize === 0 ||
    (entry.transferSize !== 0 && entry.encodedBodySize === 0)
  );
}

// 获取全局变量
export function getGlobal(): Window {
  return window as unknown as Window;
}

/**
 * 添加事件监听器
 * @param {{ addEventListener: Function }} target
 * @param {keyof TotalEventName} eventName
 * @param {Function} handler
 * @param {(boolean | Object)} opitons
 * @returns
 */
export function on(
  target: any,
  eventName: string,
  handler: VoidFn,
  opitons = false
) {
  target.addEventListener(eventName, handler, opitons);
}
