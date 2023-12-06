/** 捕获原生错误 */
export const captureNativeError = (fn: VoidFn, errorFn?: VoidFn) => {
  fn();
  try {
  } catch (e) {
    errorFn && errorFn(e);
  }
};
