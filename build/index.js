(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('md5'), require('rrweb')) :
    typeof define === 'function' && define.amd ? define(['md5', 'rrweb'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(null, global.rrweb));
})(this, (function (md5, rrweb) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var rrweb__namespace = /*#__PURE__*/_interopNamespaceDefault(rrweb);

    /** 捕获原生错误 */
    /** 捕获全局错误 */
    var captureGlobalError = function () {
        console.log('全局错误监控注入----');
        window.addEventListener("error", function (error) {
            console.log("全局错误捕获----");
        });
    };
    /** 捕获全局的promise错误 */
    var captureGlobalPromiseError = function () {
        console.log('全局promise异常监控注入----');
        window.addEventListener("unhandledrejection", function (reason) {
            console.log("primise----");
        });
    };

    /** 错误类型 */
    var ERROR_TYPE;
    (function (ERROR_TYPE) {
        ERROR_TYPE[ERROR_TYPE["PROMISE"] = 0] = "PROMISE";
        ERROR_TYPE[ERROR_TYPE["SYNC"] = 1] = "SYNC";
        ERROR_TYPE[ERROR_TYPE["ASYNC"] = 2] = "ASYNC";
        ERROR_TYPE[ERROR_TYPE["SYNTAX"] = 3] = "SYNTAX";
    })(ERROR_TYPE || (ERROR_TYPE = {}));
    /** 性能时间 */
    var PERFORMANCE;
    (function (PERFORMANCE) {
        PERFORMANCE[PERFORMANCE["PERFORMANCE_TIME"] = 2500] = "PERFORMANCE_TIME";
        PERFORMANCE[PERFORMANCE["FID_TIME"] = 100] = "FID_TIME";
    })(PERFORMANCE || (PERFORMANCE = {}));

    /** FP 首次绘制 */
    function getFP(callback) {
        var entryHandler = function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry.name === "first-paint") {
                    observer.disconnect();
                    callback({
                        name: "FP",
                        value: entry.startTime,
                        rating: entry.startTime > PERFORMANCE.PERFORMANCE_TIME ? "poor" : "good",
                    });
                }
            }
        };
        var observer = new PerformanceObserver(entryHandler);
        // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。
        observer.observe({ type: "paint", buffered: true });
    }
    /** FCP 浏览器将第一个DOM渲染到屏幕的时间 */
    function getFCP(callback) {
        var entryHandler = function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry.name === "first-contentful-paint") {
                    observer.disconnect();
                    callback({
                        name: "FCP",
                        value: entry.startTime,
                        rating: entry.startTime > PERFORMANCE.PERFORMANCE_TIME ? "poor" : "good",
                    });
                }
            }
        };
        var observer = new PerformanceObserver(entryHandler);
        observer.observe({ type: "paint", buffered: true });
    }
    /** LCP 页面加载开始到最大文本块或图像元素在屏幕上完成渲染的时间 */
    function getLCP(callback) {
        var entryHandler = function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                observer.disconnect();
                callback({
                    name: "LCP",
                    value: entry.startTime,
                    rating: entry.startTime > PERFORMANCE.PERFORMANCE_TIME ? "poor" : "good",
                });
            }
        };
        var observer = new PerformanceObserver(entryHandler);
        observer.observe({ type: "largest-contentful-paint", buffered: true });
    }
    /** CLS 从页面加载开始和其生命周期状态变为隐藏期间发生的所有意外布局偏移的累积分数 */
    function getCLS(callback) {
        var clsValue = 0;
        // let clsEntries = [];
        var sessionValue = 0;
        var sessionEntries = [];
        var entryHandler = function (entryList) {
            for (var _i = 0, _a = entryList.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                // 只将不带有最近用户输入标志的布局偏移计算在内。
                if (!entry.hadRecentInput) {
                    var firstSessionEntry = sessionEntries[0];
                    var lastSessionEntry = sessionEntries[sessionEntries.length - 1];
                    // 如果条目与上一条目的相隔时间小于 1 秒且
                    // 与会话中第一个条目的相隔时间小于 5 秒，那么将条目
                    // 包含在当前会话中。否则，开始一个新会话。
                    if (sessionValue &&
                        entry.startTime - lastSessionEntry.startTime < 1000 &&
                        entry.startTime - firstSessionEntry.startTime < 5000) {
                        sessionValue += entry.value;
                        sessionEntries.push(entry);
                    }
                    else {
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
        var observer = new PerformanceObserver(entryHandler);
        observer.observe({ type: "layout-shift", buffered: true });
    }

    /** 开始录像 */
    var startRecord = function () {
        rrweb__namespace.record({
            emit: function (event) {
                console.log(event);
            }
        });
    };

    console.log("监控代码开始执行-----");
    function main() {
        captureGlobalError();
        captureGlobalPromiseError();
        getFP(function (params) {
            console.log("第一个像素点渲染---", params);
        });
        getFCP(function (params) {
            console.log("某一个完整的模块在页面上渲染完成---", params);
        });
        getLCP(function (params) {
            console.log("页面加载最大文本块或者图像在屏幕上渲染完成---", params);
        });
        getCLS(function (params) {
            console.log("页面偏移累计分数---", params);
        });
        window.startRecord = startRecord;
    }
    main();

}));
