import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { getNewWidgetPropsByUpdateSlice } from "../componentNode"
import { VALIDATION_TYPES } from "../validationFactory"

interface RawAction {
  [key: string]: any

  $type: "ACTION"
  $dynamicAttrPaths: string[]
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

  const newProps = getNewWidgetPropsByUpdateSlice(modifiedAction, {})
  modifiedAction.$dynamicAttrPaths = [
    ...((newProps?.$dynamicAttrPaths ?? []) as string[]),
  ]

  return modifiedAction
}
