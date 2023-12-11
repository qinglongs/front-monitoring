/** 是否safari浏览器 */
export function isSafari(): boolean {
    return (
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    );
  }

  /** is  */