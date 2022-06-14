import { EVALUATION_TYPE } from "./interface"
import { isWidget } from "@/utils/typeHelper"
import { isDynamicString } from "./utils"
import { getDynamicValue } from "./dynamicConverter"

export const evaluateDynamicString = (
  keyInDataTree: string,
  dynamicString: string,
  dataTree: Record<string, any>,
  evaluationType: EVALUATION_TYPE = EVALUATION_TYPE.TEMPLATE,
) => {
  const data = dataTree[keyInDataTree]
  // if (!data) return
  const requiresEval = isWidget(data) || isDynamicString(dynamicString)
  let evalResult
  if (requiresEval) {
    try {
      evalResult = getDynamicValue(dynamicString, dataTree, evaluationType)
    } catch (e) {
      console.log(e)
      evalResult = undefined
    }
  } else {
    evalResult = dynamicString
  }
  return evalResult
}
