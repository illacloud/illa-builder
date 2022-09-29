import { ActionType } from "@/redux/currentApp/action/actionState"
import i18n from "@/i18n/config"
import { ResourceType } from "@/redux/resource/resourceState"

export function getActionTypeFromResourceType(
  resourceType: ResourceType | null | undefined,
): ActionType | null {
  return resourceType as ActionType
}

export function getActionNameFromActionType(actionType: ActionType) {
  if (actionType) {
    return i18n.t(`editor.action.resource.${actionType}.name`)
  } else {
    return ""
  }
}

export function getResourceNameFromResourceType(
  resourceType: ResourceType | null | undefined,
) {
  if (resourceType) {
    return i18n.t(`editor.action.resource.${resourceType}.name`)
  } else {
    return ""
  }
}

export function getResourceTypeFromActionType(
  actionType: ActionType | null | undefined,
): ResourceType | null {
  if (actionType === "transformer") {
    return null
  } else {
    return actionType as ResourceType
  }
}
