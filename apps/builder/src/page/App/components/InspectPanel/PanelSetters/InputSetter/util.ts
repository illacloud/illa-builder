import { JSToString, stringToJS } from "@/utils/evaluateDynamicString/utils"

export const realInputValueWithList = (
  attrValue: string | undefined,
  widgetDisplayName: string,
) => {
  if (attrValue === "" || attrValue == undefined) return ""
  let value = attrValue
  if (
    attrValue.includes(
      `{{${widgetDisplayName}.dataSources.map((currentItem) => (`,
    )
  ) {
    value = `${attrValue.substring(
      `{{${widgetDisplayName}.dataSources.map((currentItem) => (`.length,
      attrValue.length - 4,
    )}`
    return JSToString(value)
  }
  return value
}

export const getNeedComputedValueWithList = (
  value: string,
  widgetDisplayName: string,
) => {
  const stringToCanEvaluate = stringToJS(value)
  if (stringToCanEvaluate === "") {
    return stringToCanEvaluate
  }
  return `{{${widgetDisplayName}.dataSources.map((currentItem) => (${stringToCanEvaluate}))}}`
}
