import { getScriptToEval } from "./scriptTemplate"
import { createGlobalData } from "./utils"

const access_white_list: string[] = []

function runUsersCode(code: string) {
  code = "with(shadow) {" + code + "}"
  return new Function("shadow", code)
}

export function evalScript(
  script: string,
  dataTree: Record<string, any>,
  isTriggerBased: boolean,
): any {
  return (function () {
    let result: any

    const GlobalData = createGlobalData(dataTree)

    const ctxProxy = new Proxy(GlobalData, {
      has: (target, prop) => {
        if (typeof prop === "symbol") {
          return false
        }
        if (access_white_list.includes(prop)) {
          return target.hasOwnProperty(prop)
        }
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`${prop} is not defined`)
        }
        return true
      },
    })

    const userScript = getScriptToEval(script, isTriggerBased)
    try {
      result = runUsersCode(userScript).call(ctxProxy, ctxProxy)
    } catch (error) {
      throw error
    } finally {
      for (const entity in GlobalData) {
        // @ts-ignore: No types available
        delete self[entity]
      }
    }
    return result
  })()
}
