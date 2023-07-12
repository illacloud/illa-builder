import { isRunScriptAttr } from "../executionTreeHelper/executionTreeFactory"
import { getDynamicValue } from "./dynamicConverter"
import { EVALUATION_TYPE } from "./interface"
import { hasDynamicStringSnippet } from "./utils"
import { isWrapperCode, realInputValueWithScript } from "./valueConverter"

export const evaluateDynamicString = (
  keyInDataTree: string,
  dynamicString: string,
  dataTree: Record<string, any>,
  evaluationType: EVALUATION_TYPE = EVALUATION_TYPE.TEMPLATE,
) => {
  const requiresEval = hasDynamicStringSnippet(dynamicString)
  let evalResult
  if (requiresEval) {
    if (isRunScriptAttr(keyInDataTree) && isWrapperCode(dynamicString)) {
      evalResult = realInputValueWithScript(dynamicString, true)
    } else {
      try {
        evalResult = getDynamicValue(dynamicString, dataTree, evaluationType)
      } catch (error) {
        evalResult = undefined
        throw error
      }
    }
  } else {
    evalResult = dynamicString
  }
  return evalResult
}
