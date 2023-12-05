var ZmnError = /** @class */ (function () {
    function ZmnError() {
        this.registeredEvents();
    }
    /** 注册事件 */
    ZmnError.prototype.registeredEvents = function () {
        window.addEventListener("error", this._globalErrorHandling);
        window.addEventListener("unhandledrejection", this._promiseErrorHanding);
    };
    /** 全局错误处理 */
    ZmnError.prototype._globalErrorHandling = function (event) { };
    /** 同步错误处理 */
    /** 异步错误处理 */
    /** 全局 promise 错误处理 */
    ZmnError.prototype._promiseErrorHanding = function (event) { };
    return ZmnError;
}());

var error = new ZmnError();

export { error as default };
