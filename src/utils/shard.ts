import * as md5 from "md5";

/** 根据字符生成固定的id */
export function generateID(str: string) {
  return md5(str);
}
