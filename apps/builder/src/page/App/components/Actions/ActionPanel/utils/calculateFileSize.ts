import { hasDynamicStringSnippet } from "@illa-public/dynamic-string"
import { ActionType } from "@illa-public/public-types"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { calculateFileSize } from "@/utils/file"

const MAX_SIZE = 5 * 1024 * 1024

export const getFileValue = (data: string) => {
  let value = data
  if (hasDynamicStringSnippet(data)) {
    const finalContext =
      ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
    try {
      value = evaluateDynamicString("", data, finalContext)
    } catch (ignore) {}
  }
  return value
}

export const isFileOversize = (data: string, type?: ActionType) => {
  if (!data.length) {
    return false
  }
  const content = getFileValue(data)
  const isSMTP = type && type === "smtp"
  if (Array.isArray(content)) {
    if (content.length <= 0) {
      return false
    }
    return content.every((value) => {
      const calculateValue = isSMTP ? value.data || "" : value
      return !!(calculateFileSize(calculateValue) > MAX_SIZE)
    })
  } else {
    return !!(calculateFileSize(content) > MAX_SIZE)
  }
}
