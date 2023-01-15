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

export function getDynamicStringSegments(input: string): string[] {
  const segments = []
  let position = 0
  let start = input.indexOf("{{")
  while (start >= 0) {
    let i = start + 2
    while (i < input.length && input[i] === "{") i++
    let end = input.indexOf("}}", i)
    if (end < 0) {
      break
    }
    const nextStart = input.indexOf("{{", end + 2)
    const maxIndex = nextStart >= 0 ? nextStart : input.length
    const maxStartOffset = i - start - 2
    let sum = i - start
    let minValue = Number.MAX_VALUE
    let minOffset = Number.MAX_VALUE
    for (; i < maxIndex; i++) {
      switch (input[i]) {
        case "{":
          sum++
          break
        case "}":
          sum--
          if (input[i - 1] === "}") {
            const offset = Math.min(Math.max(sum, 0), maxStartOffset)
            const value = Math.abs(sum - offset)
            if (
              value < minValue ||
              (value === minValue && offset < minOffset)
            ) {
              minValue = value
              minOffset = offset
              end = i + 1
            }
          }
          break
      }
    }
    segments.push(
      input.slice(position, start + minOffset),
      input.slice(start + minOffset, end),
    )
    position = end
    start = nextStart
  }
  segments.push(input.slice(position))
  return segments.filter((t) => t)
}
