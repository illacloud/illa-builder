import { getSnippets } from "./dynamicConverter"

export const QUOTED_DYNAMIC_STRING_REGEX = /["']({{[\s\S]*?}})["']/g
export const DYNAMIC_STRING_REG = /{{([\s\S]*?)}}/

export const isDynamicString = (value: string): boolean =>
  DYNAMIC_STRING_REG.test(value)

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
    if (isDynamicString(segment)) {
      stringSnippets.push(segment)
      values.push(originValues[i])
    }
  })
  return { dynamicString: dynamicStringStrippedQuotes, stringSnippets, values }
}

export const createGlobalData = (
  dataTree: Record<string, any>,
  context?: Record<string, any>,
) => {
  const GLOBAL_DATA: Record<string, any> = {}
  GLOBAL_DATA.THIS_CONTEXT = {}
  if (context) {
    GLOBAL_DATA.THIS_CONTEXT = context
  }
  Object.keys(dataTree).forEach((datum) => {
    GLOBAL_DATA[datum] = dataTree[datum]
  })

  return GLOBAL_DATA
}

export const stringToJS = (string: string): string => {
  const { jsSnippets, stringSnippets } = getSnippets(string)
  const js = stringSnippets
    .map((segment, index) => {
      if (jsSnippets[index] && jsSnippets[index].length > 0) {
        return jsSnippets[index]
      } else {
        return `'${segment}'`
      }
    })
    .join(" + ")
  return js
}

export const wrapCode = (code: string) => {
  return `
    (function() {
      return ${code}
    })
  `
}
