import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { isDynamicString } from "@/utils/evaluateDynamicString/utils"
import { isObject } from "@/utils/typeHelper"
import { VALIDATION_TYPES } from "../validationFactory"

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

export const generateActionValidatePaths = () => {
  return {
    "config.advancedConfig.delayWhenLoaded": VALIDATION_TYPES.NUMBER,
    "config.advancedConfig.periodInterval": VALIDATION_TYPES.NUMBER,
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
  const modifiedAction: RawAction = {
    $actionId: actionId,
    $resourceId: resourceId,
    displayName,
    actionType,
    $type: "ACTION",
    $dynamicAttrPaths: [],
  }
  if (actionType === "transformer") {
    modifiedAction.value = (content as TransformerAction).transformerString
  } else {
    modifiedAction.data = undefined
    modifiedAction.content = content
    modifiedAction.config = config
    modifiedAction.triggerMode = triggerMode
    modifiedAction.transformer = transformer
    modifiedAction.$validationPaths = generateActionValidatePaths()
  }
  generateDynamicAttrPaths(modifiedAction, $dynamicAttrPaths)
  modifiedAction.$dynamicAttrPaths = $dynamicAttrPaths

  return modifiedAction
}
