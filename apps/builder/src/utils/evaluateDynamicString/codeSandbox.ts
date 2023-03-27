import { getScriptToEval } from "./scriptTemplate"
import { createGlobalData } from "./utils"

const block_list: string[] = [
  "top",
  "window",
  "self",
  "globalThis",
  "global",
  "frames",
  "parent",
  "fetch",
  "XMLHttpRequest",
  "document",
]

function runUsersCode(code: string) {
  const finalCode = `with(this){
    return (function() {
      'use strict';
      ${code};
    }).call(this);
  }`
  return new Function(finalCode)
}

export function evalScript(
  script: string,
  dataTree: Record<string, any>,
  isTriggerBased: boolean,
): any {
  return (function () {
    let result: any

    const GlobalData = createGlobalData(dataTree)

    const ctxProxy = new Proxy(Object.assign({}, GlobalData), {
      get: (target, prop) => {
        if (prop in target) {
          return Reflect.get(target, prop)
        }
        if (block_list.includes(prop.toString())) {
          return undefined
        }
        return Reflect.get(window, prop)
      },
    })

    const userScript = getScriptToEval(script, isTriggerBased)
    try {
      result = runUsersCode(userScript).call(ctxProxy, ctxProxy)
    } catch (error) {
      throw error
    }
    return result
  })()
}
