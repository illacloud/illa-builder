import { Types, getType, isObject } from "@/utils/typeHelper"
import { EVALUATION_TYPE } from "./interface"
import { filterBindingSegmentsAndRemoveQuotes } from "./utils"

export const smartSubstituteDynamicValues = (
  originDynamicString: string,
  originStringSnippets: string[],
  originValues: unknown[],
): string => {
  const { dynamicString, stringSnippets, values } =
    filterBindingSegmentsAndRemoveQuotes(
      originDynamicString,
      originStringSnippets,
      originValues,
    )
  let finalBinding = dynamicString
  stringSnippets.forEach((b, i) => {
    const value = values[i]
    switch (getType(value)) {
      case Types.NUMBER:
      case Types.BOOLEAN:
      case Types.NULL:
      case Types.UNDEFINED:
        finalBinding = finalBinding.replace(b, `${value}`)
        break
      case Types.STRING:
        finalBinding = finalBinding.replace(b, `${JSON.stringify(value)}`)
        break
      case Types.ARRAY:
      case Types.OBJECT:
        finalBinding = finalBinding.replace(b, JSON.stringify(value, null, 2))
        break
    }
  })
  return finalBinding
}

export const templateSubstituteDynamicValues = (
  dynamicString: string,
  stringSnippets: string[],
  values: unknown[],
): string => {
  let finalValue = dynamicString
  stringSnippets.forEach((b, i) => {
    let value = values[i]
    if (Array.isArray(value) || isObject(value)) {
      value = JSON.stringify(value)
    }
    try {
      if (typeof value === "string" && JSON.parse(value)) {
        value = value.replace(/\\([\s\S])|(")/g, "\\$1$2")
      }
    } catch (e) {
      // do nothing
    }
    finalValue = finalValue.replace(b, `${value}`)
  })
  return finalValue
}

export const substituteDynamicBindingWithValues = (
  dynamicString: string,
  stringSnippets: string[],
  values: unknown[],
  evaluationType: EVALUATION_TYPE,
): string => {
  switch (evaluationType) {
    case EVALUATION_TYPE.TEMPLATE:
      return templateSubstituteDynamicValues(
        dynamicString,
        stringSnippets,
        values,
      )
    case EVALUATION_TYPE.SMART_SUBSTITUTE:
      return smartSubstituteDynamicValues(dynamicString, stringSnippets, values)
  }
}
