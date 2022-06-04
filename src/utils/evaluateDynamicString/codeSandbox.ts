import { getScriptToEval } from "./scriptTemplate"
import { createGlobalData } from "./utils"

export function evalScript(
  script: string,
  dataTree: Record<string, any>,
  isTriggerBased: boolean,
): any {
  return (function () {
    let result: any

    const GlobalData = createGlobalData(dataTree)

    for (const entity in GlobalData) {
      // @ts-ignore: No types available
      self[entity] = GlobalData[entity]
    }

    const userScript = getScriptToEval(script, isTriggerBased)

    try {
      result = eval(userScript)
    } catch (e) {
      // TODO: add error handler
      console.log(e)
    } finally {
      for (const entity in GlobalData) {
        // @ts-ignore: No types available
        delete self[entity]
      }
    }
    return result
  })()
}
