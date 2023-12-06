var EventBus = /** @class */ (function () {
    function EventBus() {
        // 事件队列
        this.queue = new Map();
    }
    /** 注册事件 */
    EventBus.prototype.on = function (event, cb) {
        var eventQueue = this.queue.get(event);
        if (!eventQueue)
            this.queue.set(event, []);
        eventQueue.push(cb);
    };
    /** 触发事件 */
    EventBus.prototype.emit = function (event, params) {
        var eventQueue = this.queue.get(event);
        eventQueue.forEach(function (cb) {
            cb(params);
        });
    };
    return EventBus;
}());

var Point = /** @class */ (function () {
    function Point() {
    }
    /** 埋点开始 */
    Point.trackStart = function (eventName, cb) {
        this.eventBus.on(eventName, cb);
    };
    /** 埋点结束 */
    Point.trackEnd = function (event, cb) {
        this.eventBus.emit(event, cb);
    };
    /** 点击事件 */
    Point.trackClick = function (event, cb) {
    };
    Point.eventBus = new EventBus();
    return Point;
}());

var Error = /** @class */ (function () {
    function Error() {
        this.point = new Point();
        this.registeredEvents();
    }
    /** 注册事件 */
    Error.prototype.registeredEvents = function () {
        window.addEventListener("error", this._globalErrorHandling);
        window.addEventListener("unhandledrejection", this._promiseErrorHanding);
    };
    /** 全局错误处理 */
    Error.prototype._globalErrorHandling = function (event) { };
    /** 同步错误处理 */
    /** 异步错误处理 */
    /** 全局 promise 错误处理 */
    Error.prototype._promiseErrorHanding = function (event) { };
    return Error;
}());

var error = new Error();

export { error as default };
