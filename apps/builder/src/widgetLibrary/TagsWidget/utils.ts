import { isNumber, isObject, isString } from "@illa-design/react"

export const getSafeStringValue = (value: unknown) => {
  if (isString(value) || isNumber(value)) {
    return `${value}`
  } else if (isObject(value)) {
    return JSON.stringify(value)
  }
  return ""
}
