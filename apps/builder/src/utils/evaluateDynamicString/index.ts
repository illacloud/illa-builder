import { getDynamicValue } from "./dynamicConverter"
import { EVALUATION_TYPE } from "./interface"
import { hasDynamicStringSnippet } from "./utils"

export const evaluateDynamicString = (
  keyInDataTree: string,
  dynamicString: string,
  dataTree: Record<string, any>,
  evaluationType: EVALUATION_TYPE = EVALUATION_TYPE.TEMPLATE,
) => {
  const requiresEval = hasDynamicStringSnippet(dynamicString)
  let evalResult
  if (requiresEval) {
    try {
      evalResult = getDynamicValue(dynamicString, dataTree, evaluationType)
    } catch (error) {
      evalResult = undefined
      throw error
    }
  } else {
    evalResult = dynamicString
  }
  return evalResult
}
