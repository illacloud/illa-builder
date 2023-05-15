import { runEventHandler } from "../eventHandlerHelper"
import { ILLAEditorRuntimePropsCollectorInstance } from "../executionTreeHelper/runtimePropsCollector"

export const runAllEventHandler = (events: any[] = []) => {
  const finalContext =
    ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
  events.forEach((scriptObj) => {
    runEventHandler(scriptObj, finalContext)
  })
}
