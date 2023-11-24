import { ActionContent, TransformerAction } from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
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
    actionID,
    resourceID,
    displayName,
    actionType,
    config,
    triggerMode,
  } = action
  const modifiedAction: RawAction = {
    $actionID: actionID,
    $resourceID: resourceID,
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
  let context: Record<string, unknown> = {}

  modifiedAction.$context = context

  return modifiedAction
}
