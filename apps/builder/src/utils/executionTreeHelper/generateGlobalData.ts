import { cloneDeep } from "lodash"
import { hasDynamicStringSnippet } from "../evaluateDynamicString/utils"
import { isObject } from "../typeHelper"

export const generateGlobalData = (globalData: Record<string, unknown>) => {
  const clonedGlobalData = cloneDeep(globalData)
  const $dynamicAttrPaths: string[] = []
  if (isObject(globalData)) {
    Object.keys(globalData).forEach((key) => {
      if (hasDynamicStringSnippet(globalData[key])) {
        $dynamicAttrPaths.push(key)
      }
    })
  }
  clonedGlobalData.$dynamicAttrPaths = $dynamicAttrPaths
  return clonedGlobalData
}
