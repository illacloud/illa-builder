import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { isDynamicString } from "@/utils/evaluateDynamicString/utils"
import { isObject } from "@/utils/typeHelper"

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
      value.forEach((item, index) => {
        generateDynamicAttrPaths(
          item,
          dynamicAttrPaths,
          parentAttr ? `${parentAttr}.${key}.${index}` : `${key}.${index}`,
        )
      })
    }
    if (isObject(value)) {
      generateDynamicAttrPaths(
        value,
        dynamicAttrPaths,
        parentAttr ? `${parentAttr}.${key}` : `${key}`,
      )
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
    config,
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
    config,
    content,
    $type: "ACTION",
    $dynamicAttrPaths,
    [actionType === "transformer" ? "value" : "data"]: undefined,
  }
}
