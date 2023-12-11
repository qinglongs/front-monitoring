import * as rrweb from "rrweb";

/** 开始录像 */
export const startRecord = () => {
  const stop = rrweb.record({
    emit(event) {
      console.log(event);
    },
  });

  return stop;
};
