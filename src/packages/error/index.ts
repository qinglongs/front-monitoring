/** 捕获原生错误 */
export const captureNativeError = (fn: VoidFn, errorFn?: VoidFn) => {
  fn();
  try {
  } catch (e) {
    errorFn && errorFn(e);
  }
};

/** 捕获全局错误 */
export const captureGlobalError = () => {
  console.log('全局错误监控注入----')
  window.addEventListener("error", (error) => {
    console.log("全局错误捕获----");
  });
};

/** 捕获全局的promise错误 */
export const captureGlobalPromiseError = () => {
  console.log('全局promise异常监控注入----')
  window.addEventListener("unhandledrejection", (reason) => {
    console.log("primise----");
  });
};

/** react错误捕获 */
export const captureReactError = ()=>{
  
}

/** vue错误捕获 */
export const captureVueError = ()=>{

}