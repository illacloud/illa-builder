import { isDynamicStringSnippet } from "@illa-public/dynamic-string"
import { getSnippets } from "./dynamicConverter"

export const QUOTED_DYNAMIC_STRING_REGEX = /["']({{[\s\S]*?}})["']/g
export const DYNAMIC_STRING_REG = /{{([\s\S]*?)}}/

export const filterBindingSegmentsAndRemoveQuotes = (
  originDynamicString: string,
  originStringSnippets: string[],
  originValues: unknown[],
) => {
  const dynamicStringStrippedQuotes = originDynamicString.replace(
    QUOTED_DYNAMIC_STRING_REGEX,
    (original, firstGroup) => {
      return firstGroup
    },
  )
  const stringSnippets: string[] = []
  const values: unknown[] = []
  originStringSnippets.forEach((segment, i) => {
    if (isDynamicStringSnippet(segment)) {
      stringSnippets.push(segment)
      values.push(originValues[i])
    }
  })
  return { dynamicString: dynamicStringStrippedQuotes, stringSnippets, values }
}

export const stringToJS = (string: string): string => {
  const { jsSnippets, stringSnippets } = getSnippets(string)
  return stringSnippets
    .map((segment, index) => {
      if (jsSnippets[index] && jsSnippets[index].length > 0) {
        return jsSnippets[index]
      } else {
        return `'${segment}'`
      }
    })
    .join(" + ")
}

export const JSToString = (js: string): string => {
  const segments = js.split(" + ")
  return segments
    .map((segment) => {
      if (segment.charAt(0) === "'") {
        return segment.substring(1, segment.length - 1)
      } else return "{{" + segment + "}}"
    })
    .join("")
}

export const wrapCode = (code: string) => {
  return `
    (function() {
      return ${code}
    })
  `
}
export function getDisplayNameAndAttrPath(fullPath: string): {
  displayName: string
  attrPath: string
} {
  const indexOfFirstDot = fullPath.indexOf(".")
  if (indexOfFirstDot === -1) {
    // No dot was found so path is the entity name itself
    return {
      displayName: fullPath,
      attrPath: "",
    }
  }
  const displayName = fullPath.substring(0, indexOfFirstDot)
  const attrPath = fullPath.substring(indexOfFirstDot + 1)
  return { displayName, attrPath }
}

export const getWidgetOrActionDynamicAttrPaths = (
  widgetOrAction: Record<string, any>,
): string[] => {
  if (Array.isArray(widgetOrAction.$dynamicAttrPaths)) {
    return [...widgetOrAction.$dynamicAttrPaths]
  }
  return []
}

export const wrapFunctionCode = (code: string) => {
  return `(function (){
      ${code}
    })
  `
}
