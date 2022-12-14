// deno-lint-ignore-file
/**
 * @description: console.log 的简写形式
 */
const cl = (str: any) => console.log(str)
/**
 * @description: 打印并返回
 * @param  str
 * @return str
 */
cl.rtn = (str: any): any => {
    console.log(str)
    return str
}

export { cl }