import { stringToJS } from "@/utils/evaluateDynamicString/utils"

export const getComputedValue = (value: string) => {
  const stringToEvaluate = stringToJS(value)

  if (stringToEvaluate === "") {
    return stringToEvaluate
  }
  return `{{dataOptions.map((item) => ( ${stringToEvaluate}))}}`
}
