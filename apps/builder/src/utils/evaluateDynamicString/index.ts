import { hasDynamicStringSnippet } from "@illa-public/dynamic-string"
import { isRunScriptAttr } from "../executionTreeHelper/executionTreeFactory"
import { getDynamicValue } from "./dynamicConverter"
import { isWrapperCode, realInputValueWithScript } from "./valueConverter"

export const evaluateDynamicString = (
  keyInDataTree: string,
  dynamicString: string,
  dataTree: Record<string, any>,
) => {
  const requiresEval = hasDynamicStringSnippet(dynamicString)
  let evalResult
  if (requiresEval) {
    if (isRunScriptAttr(keyInDataTree) && isWrapperCode(dynamicString)) {
      evalResult = realInputValueWithScript(dynamicString, true)
    } else {
      try {
        const result = getDynamicValue(dynamicString, dataTree)
        evalResult = result?.result
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

export const evaluateDynamicStringAndGetCalcContext = (
  keyInDataTree: string,
  dynamicString: string,
  dataTree: Record<string, any>,
) => {
  const requiresEval = hasDynamicStringSnippet(dynamicString)
  let evalResult
  let context: Record<string, unknown> = {}
  if (requiresEval) {
    if (isRunScriptAttr(keyInDataTree) && isWrapperCode(dynamicString)) {
      evalResult = realInputValueWithScript(dynamicString, true)
    } else {
      try {
        const result = getDynamicValue(dynamicString, dataTree)
        evalResult = result?.result
        context = result?.context || {}
      } catch (error) {
        evalResult = undefined
        context = {}
        throw error
      }
    }
  } else {
    evalResult = dynamicString
  }
  return {
    result: evalResult,
    context,
  }
}
