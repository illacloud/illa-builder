import { evalScript } from "./codeSandbox"
import { EVALUATION_TYPE } from "./interface"
import { isDynamicString } from "./utils"
import { substituteDynamicBindingWithValues } from "./valueConverter"

export const getStringSnippets = (dynamicString: string): string[] => {
  let stringSnippets: string[] = []
  const indexOfDoubleParenStart = dynamicString.indexOf("{{")
  if (indexOfDoubleParenStart === -1) {
    return [dynamicString]
  }
  const firstString = dynamicString.substring(0, indexOfDoubleParenStart)
  if (firstString) stringSnippets.push(firstString)
  let rest = dynamicString.substring(
    indexOfDoubleParenStart,
    dynamicString.length,
  )
  let sum = 0
  for (let i = 0; i <= rest.length - 1; i++) {
    const char = rest[i]
    const prevChar = rest[i - 1]

    if (char === "{") {
      sum++
    } else if (char === "}") {
      sum--
      if (prevChar === "}" && sum === 0) {
        stringSnippets.push(rest.substring(0, i + 1))
        rest = rest.substring(i + 1, rest.length)
        if (rest) {
          stringSnippets = stringSnippets.concat(getStringSnippets(rest))
          break
        }
      }
    }
  }
  if (sum !== 0 && dynamicString !== "") {
    return [dynamicString]
  }
  return stringSnippets
}

export const getSnippets = (
  dynamicString: string,
): { stringSnippets: string[]; jsSnippets: string[] } => {
  if (!dynamicString || typeof dynamicString !== "string") {
    return { stringSnippets: [], jsSnippets: [] }
  }
  const sanitisedString = dynamicString.trim()
  let stringSnippets, jsSnippets: any
  stringSnippets = getStringSnippets(sanitisedString)
  jsSnippets = stringSnippets.map((segment) => {
    const length = segment.length
    const matches = isDynamicString(segment)
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
  evaluationType: EVALUATION_TYPE,
  isTriggerBased: boolean = false,
) => {
  const { jsSnippets, stringSnippets } = getSnippets(dynamicString)
  if (stringSnippets.length) {
    const values = jsSnippets.map((jsSnippet, index) => {
      if (jsSnippet) {
        return evalScript(jsSnippet, dataTree, isTriggerBased)
      } else {
        return stringSnippets[index]
      }
    })
    if (stringSnippets.length === 1) {
      return values[0]
    }
    return substituteDynamicBindingWithValues(
      dynamicString,
      stringSnippets,
      values,
      evaluationType,
    )
  }
}
