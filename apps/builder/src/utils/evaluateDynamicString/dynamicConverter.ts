import {
  getStringSnippets,
  isDynamicStringSnippet,
} from "@illa-public/dynamic-string"
import { klona } from "klona"
import { ILLAEditorRuntimePropsCollectorInstance } from "../executionTreeHelper/runtimePropsCollector"
import { evalScript } from "./codeSandbox"
import { substituteDynamicBindingWithValues } from "./valueConverter"

export const getSnippets = (
  dynamicString: string,
): { stringSnippets: string[]; jsSnippets: string[] } => {
  if (!dynamicString || typeof dynamicString !== "string") {
    return { stringSnippets: [], jsSnippets: [] }
  }
  const sanitisedString = dynamicString.trim()
  let stringSnippets: string[], jsSnippets: string[]
  stringSnippets = getStringSnippets(sanitisedString)
  jsSnippets = stringSnippets.map((segment) => {
    const length = segment.length
    const matches = isDynamicStringSnippet(segment)
    if (matches) {
      return segment.substring(2, length - 2)
    }
    return ""
  })

  return { stringSnippets, jsSnippets }
}

export const getDynamicValue = (
  dynamicString: string,
  dataTree: Record<string, any>,
) => {
  const { jsSnippets, stringSnippets } = getSnippets(dynamicString)
  const cloneDeepDataTree = klona(dataTree)
  const calcContext = {
    ...cloneDeepDataTree,
    ...ILLAEditorRuntimePropsCollectorInstance.getThirdPartyPackages(),
  }
  if (stringSnippets.length) {
    let context: Record<string, unknown> = {}
    const values = jsSnippets.map((jsSnippet, index) => {
      if (jsSnippet) {
        const value = evalScript(jsSnippet, calcContext)
        context[jsSnippet] = value
        return value
      } else {
        return stringSnippets[index]
      }
    })
    if (stringSnippets.length === 1) {
      return {
        result: values[0],
        context,
      }
    }
    return {
      result: substituteDynamicBindingWithValues(
        dynamicString,
        stringSnippets,
        values,
      ),
      context,
    }
  }
}
