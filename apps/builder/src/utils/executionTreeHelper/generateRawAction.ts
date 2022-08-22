import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { isObject } from "@/utils/typeHelper"
import { isDynamicString } from "@/utils/evaluateDynamicString/utils"

interface RawAction {
  [key: string]: any
  $type: "ACTION"
  $dynamicAttrPaths: string[]
}

export const generateDynamicAttrPaths = (
  rawObj: Record<string, any>,
  dynamicAttrPaths: string[],
  parentAttr: string = "",
) => {
  for (let key in rawObj) {
    const value = rawObj[key]
    if (Array.isArray(value)) {
      value.forEach((item) => {
        generateDynamicAttrPaths(item, dynamicAttrPaths, key)
      })
    }
    if (isObject(value)) {
      generateDynamicAttrPaths(value, dynamicAttrPaths, key)
    }
    if (isDynamicString(value)) {
      const attrPath = parentAttr ? parentAttr + "." + key : key
      dynamicAttrPaths.push(attrPath)
    }
  }
}

export const generateRawAction = (
  action: ActionItem<ActionContent>,
): RawAction => {
  let $dynamicAttrPaths: string[] = []
  const {
    content,
    transformer,
    actionId,
    resourceId,
    displayName,
    actionType,
    triggerMode,
  } = action
  generateDynamicAttrPaths(action, $dynamicAttrPaths)
  return {
    $actionId: actionId,
    $resourceId: resourceId,
    displayName,
    actionType,
    triggerMode,
    transformer,
    content,
    $type: "ACTION",
    $dynamicAttrPaths,
  }
}
