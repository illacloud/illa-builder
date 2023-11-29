import { Transformer } from "@illa-public/public-types"
import { evaluateDynamicString } from "../evaluateDynamicString"
import { wrapFunctionCode } from "../evaluateDynamicString/utils"
import { ILLAEditorRuntimePropsCollectorInstance } from "../executionTreeHelper/runtimePropsCollector"

export function runTransformer(transformer: Transformer, rawData: any) {
  let calcResult: any = rawData
  if (transformer?.enable) {
    const evaluateTransform = wrapFunctionCode(transformer.rawData)
    const canEvalString = `{{${evaluateTransform}()}}`
    const finalContext =
      ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext({
        data: rawData,
      })
    try {
      calcResult = evaluateDynamicString("events", canEvalString, finalContext)
    } catch (e) {
      console.log(e)
    }
  }
  return calcResult
}
