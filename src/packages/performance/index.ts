import { PERFORMANCE } from "../../constants/index";
import { getGlobal, on } from "../../utils/shard";

const global = getGlobal();

/** FP 首次绘制 */
export function getFP(callback: VoidFn) {
  const entryHandler = (list: any) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-paint") {
        observer.disconnect();
        callback({
          name: "FP",
          value: entry.startTime,
          rating:
            entry.startTime > PERFORMANCE.PERFORMANCE_TIME ? "poor" : "good",
        });
      }
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。
  observer.observe({ type: "paint", buffered: true });
}

/** FCP 浏览器将第一个DOM渲染到屏幕的时间 */
export function getFCP(callback: VoidFn) {
  const entryHandler = (list: any) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-contentful-paint") {
        observer.disconnect();
        callback({
          name: "FCP",
          value: entry.startTime,
          rating:
            entry.startTime > PERFORMANCE.PERFORMANCE_TIME ? "poor" : "good",
        });
      }
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "paint", buffered: true });
}

/** LCP 页面加载开始到最大文本块或图像元素在屏幕上完成渲染的时间 */
export function getLCP(callback: VoidFn) {
  const entryHandler = (list: any) => {
    for (const entry of list.getEntries()) {
      observer.disconnect();
      callback({
        name: "LCP",
        value: entry.startTime,
        rating:
          entry.startTime > PERFORMANCE.PERFORMANCE_TIME ? "poor" : "good",
      });
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}

/** FID */
export function getFID(callback: VoidFn): void {
  const entryHandler = (entryList: any) => {
    for (const entry of entryList.getEntries()) {
      observer.disconnect();
      const value = entry.processingStart - entry.startTime;
      callback({
        name: "FID",
        value,
        rating: value > PERFORMANCE.FID_TIME ? "poor" : "good",
      });
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "first-input", buffered: true });
}

/** CLS 从页面加载开始和其生命周期状态变为隐藏期间发生的所有意外布局偏移的累积分数 */
export function getCLS(callback: VoidFn): void {
  let clsValue = 0;
  // let clsEntries = [];

  let sessionValue = 0;
  let sessionEntries: any[] = [];

  const entryHandler = (entryList: any) => {
    for (const entry of entryList.getEntries()) {
      // 只将不带有最近用户输入标志的布局偏移计算在内。
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0];
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
        // 如果条目与上一条目的相隔时间小于 1 秒且
        // 与会话中第一个条目的相隔时间小于 5 秒，那么将条目
        // 包含在当前会话中。否则，开始一个新会话。
        if (
          sessionValue &&
          entry.startTime - lastSessionEntry.startTime < 1000 &&
          entry.startTime - firstSessionEntry.startTime < 5000
        ) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }

        // 如果当前会话值大于当前 CLS 值，
        // 那么更新 CLS 及其相关条目。
        if (sessionValue > clsValue) {
          clsValue = sessionValue;
          // clsEntries = sessionEntries;
          observer.disconnect();

          callback({
            name: "CLS",
            value: clsValue,
            rating: clsValue > 2500 ? "poor" : "good",
          });
        }
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "layout-shift", buffered: true });
}

/** TTFB   */
export function getTTFB(callback: VoidFn): void {
  on(this.global, "load", function () {
    const { responseStart, navigationStart } = this.global.performance.timing;
    const value = responseStart - navigationStart;
    callback({
      name: "TTFB",
      value,
      rating: value > 100 ? "poor" : "good",
    });
  });
}
