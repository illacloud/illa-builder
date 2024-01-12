import { convertPathToString } from "@illa-public/dynamic-string"
import { klona } from "klona/json"
import { get, set, toPath } from "lodash-es"
import { evaluateDynamicString } from "../evaluateDynamicString"
import { runEventHandler } from "../eventHandlerHelper"
import { ILLAEditorRuntimePropsCollectorInstance } from "../executionTreeHelper/runtimePropsCollector"

export const runAllEventHandler = (
  events: any[] = [],
  dynamicAttrPaths: string[] = [],
) => {
  const finalContext =
    ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
  const needRunEvents = klona(events).map((originEvent) => {
    return {
      ...originEvent,
      originEnable: originEvent.enabled,
    }
  })
  dynamicAttrPaths.forEach((path) => {
    const realPath = convertPathToString(toPath(path).slice(1))
    try {
      const dynamicString = get(needRunEvents, realPath, "")
      if (dynamicString) {
        const calcValue = evaluateDynamicString(
          `events${realPath}`,
          dynamicString,
          finalContext,
        )
        set(needRunEvents, realPath, calcValue)
      }
    } catch (e) {
      console.log(e)
    }
  })
  needRunEvents.forEach((scriptObj) => {
    runEventHandler(scriptObj, finalContext)
  })
}
