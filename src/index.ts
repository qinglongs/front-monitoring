import {
  captureGlobalError,
  captureGlobalPromiseError,
  captureNativeError,
} from "./packages/error/index";

import { getCLS, getFCP, getFP, getLCP } from "./packages/performance/index";
import { startRecord } from "./record";

console.log("监控代码开始执行-----");

function main() {
  captureGlobalError();

  captureGlobalPromiseError();

  getFP((params) => {
    console.log("第一个像素点渲染---", params);
  });

  getFCP((params) => {
    console.log("某一个完整的模块在页面上渲染完成---", params);
  });

  getLCP((params) => {
    console.log("页面加载最大文本块或者图像在屏幕上渲染完成---", params);
  });

  getCLS((params) => {
    console.log("页面偏移累计分数---", params);
  });
  (window as unknown as any).startRecord = startRecord;
}

main();
