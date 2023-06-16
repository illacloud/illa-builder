import { formatDataAsArray, formatDataAsObject } from "@/utils/formatData"
import { getSnippets, getStringSnippets } from "./dynamicConverter"

export const QUOTED_DYNAMIC_STRING_REGEX = /["']({{[\s\S]*?}})["']/g
export const DYNAMIC_STRING_REG = /{{([\s\S]*?)}}/

export const isDynamicStringSnippet = (value: unknown): boolean =>
  typeof value === "string" && value.endsWith("}}") && value.startsWith("{{")

export const hasDynamicStringSnippet = (value: unknown): boolean => {
  if (typeof value !== "string") {
    return false
  }
  const dynamicStrings = getStringSnippets(value)
  return dynamicStrings.some((value) => isDynamicStringSnippet(value))
}

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
  GLOBAL_DATA.formatDataAsObject = formatDataAsObject
  GLOBAL_DATA.formatDataAsArray = formatDataAsArray

  return GLOBAL_DATA
}

const globalVarNames = new Set<PropertyKey>([
  "window",
  "globalThis",
  "self",
  "global",
])

function isDomElement(obj: any): boolean {
  return obj instanceof Element || obj instanceof HTMLCollection
}

function getPropertyFromNativeWindow(prop: PropertyKey) {
  const ret = Reflect.get(window, prop)
  if (typeof ret === "function" && !ret.prototype) {
    return ret.bind(window)
  }
  // get DOM element by id, serializing may cause error
  if (isDomElement(ret)) {
    return undefined
  }
  return ret
}

export function createMockWindow(base?: object) {
  const win: any = new Proxy(Object.assign({}, base), {
    has() {
      return true
    },
    get(target, p) {
      if (p in target) {
        return Reflect.get(target, p)
      }
      if (globalVarNames.has(p)) {
        return win
      }
      return getPropertyFromNativeWindow(p)
    },
  })
  return win
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
  return `
    (function (){
      ${code}
    })
  `
}

export const isChildPropertyPath = (
  parentPropertyPath: string,
  childPropertyPath: string,
): boolean => {
  return (
    parentPropertyPath === childPropertyPath ||
    childPropertyPath.startsWith(`${parentPropertyPath}.`) ||
    childPropertyPath.startsWith(`${parentPropertyPath}[`)
  )
}

export const getPropertyPath = (fullPropertyPath: string) => {
  return fullPropertyPath.substring(fullPropertyPath.indexOf(".") + 1)
}

export const isPathADynamicBinding = (
  entity: Record<string, any>,
  path: string,
): boolean => {
  if (
    entity &&
    entity.$dynamicAttrPaths &&
    Array.isArray(entity.$dynamicAttrPaths)
  ) {
    return entity.$dynamicAttrPaths.includes(path)
  }
  return false
}
