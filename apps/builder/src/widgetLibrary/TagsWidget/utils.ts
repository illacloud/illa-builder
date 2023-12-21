import { isObject } from "@illa-design/react"

export const getSafeStringValue = (value: unknown) => {
  if (isObject(value) || Array.isArray(value)) {
    return JSON.stringify(value)
  } else {
    return `${value}`
  }
}
