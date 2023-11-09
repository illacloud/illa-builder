import { Types, getType } from "@/utils/typeHelper"
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

export const substituteDynamicBindingWithValues = (
  dynamicString: string,
  stringSnippets: string[],
  values: unknown[],
): string => {
  return smartSubstituteDynamicValues(dynamicString, stringSnippets, values)
}

const ASYNC_SCRIPT_CODE_INPUT_START_MARKS = "{{(async function (){"
const SYNC_SCRIPT_CODE_INPUT_START_MARKS = "{{(function (){"
const SCRIPT_CODE_INPUT_END_MARKS = "})()}}"

export const realInputValueWithScript = (
  attrValue: string | undefined,
  needAsync: boolean = false,
) => {
  if (attrValue === "" || attrValue == undefined) return ""
  const startMarks = needAsync
    ? ASYNC_SCRIPT_CODE_INPUT_START_MARKS
    : SYNC_SCRIPT_CODE_INPUT_START_MARKS
  return attrValue.startsWith(startMarks)
    ? attrValue.substring(
        startMarks.length,
        attrValue.length - SCRIPT_CODE_INPUT_END_MARKS.length,
      )
    : attrValue
}

export const wrapperScriptCode = (
  attrValue: string | undefined,
  needAsync: boolean = false,
) => {
  const startMarks = needAsync
    ? ASYNC_SCRIPT_CODE_INPUT_START_MARKS
    : SYNC_SCRIPT_CODE_INPUT_START_MARKS

  return `${startMarks}${attrValue}${SCRIPT_CODE_INPUT_END_MARKS}`
}

export const isWrapperCode = (attrValue: string | undefined) => {
  if (attrValue === "" || attrValue == undefined) return false
  return (
    (attrValue.startsWith(ASYNC_SCRIPT_CODE_INPUT_START_MARKS) ||
      attrValue.startsWith(SYNC_SCRIPT_CODE_INPUT_START_MARKS)) &&
    attrValue.endsWith(SCRIPT_CODE_INPUT_END_MARKS)
  )
}
