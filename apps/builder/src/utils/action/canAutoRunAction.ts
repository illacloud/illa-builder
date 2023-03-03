import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { generateDynamicAttrPaths } from "@/utils/executionTreeHelper/generateRawAction"

export const canAutoRunActionWhenInit = (action: ActionItem<ActionContent>) => {
  let hasDynamicPath = false
  const dynamicAttrPaths: string[] = []
  generateDynamicAttrPaths(action, dynamicAttrPaths)
  hasDynamicPath = dynamicAttrPaths.length > 0
  return (
    (action.triggerMode === "automate" ||
      action.actionType === "transformer") &&
    !hasDynamicPath
  )
}
