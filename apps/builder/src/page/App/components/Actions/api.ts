import { isILLAAPiError } from "@illa-public/illa-net"
import {
  ActionContent,
  ActionItem,
  GlobalDataActionContent,
} from "@illa-public/public-types"
import { v4 } from "uuid"
import { createMessage, omit } from "@illa-design/react"
import i18n from "@/i18n/config"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { fetchCreateAction, fetchDeleteAction } from "@/services/action"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

const message = createMessage()

export async function onCopyActionItem(action: ActionItem<ActionContent>) {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const newAction = omit(action, ["displayName", "actionID"])
  const displayName = DisplayNameGenerator.generateDisplayName(
    action.actionType === "globalData" ? "state" : action.actionType,
  )
  const data: Omit<ActionItem<ActionContent>, "actionID"> = {
    ...newAction,
    displayName,
  }
  if (action.actionType === "globalData") {
    store.dispatch(
      componentsActions.setGlobalStateReducer({
        key: data.displayName,
        value: (data.content as GlobalDataActionContent).initialValue,
        oldKey: "",
      }),
    )
    return
  }
  if (isGuideMode) {
    const createActionData: ActionItem<ActionContent> = {
      ...data,
      actionID: v4(),
    }
    store.dispatch(actionActions.addActionItemReducer(createActionData))
    message.success({
      content: i18n.t("editor.action.action_list.message.success_created"),
    })
    return
  }
  try {
    const response = await fetchCreateAction(data)
    message.success({
      content: i18n.t("editor.action.action_list.message.success_created"),
    })
    store.dispatch(actionActions.addActionItemReducer(response.data))
  } catch (e) {
    if (isILLAAPiError(e)) {
      message.error({
        content: i18n.t("editor.action.action_list.message.failed"),
      })
      DisplayNameGenerator.removeDisplayName(displayName)
    } else {
      DisplayNameGenerator.removeDisplayName(displayName)
    }
  }
}

export async function onDeleteActionItem(action: ActionItem<ActionContent>) {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const { actionID, displayName } = action
  if (isGuideMode) {
    store.dispatch(configActions.resetSelectedActionReducer(displayName))

    store.dispatch(
      actionActions.removeActionItemReducer({
        actionID: actionID,
        displayName,
      }),
    )
    message.success({
      content: i18n.t("editor.action.action_list.message.success_deleted"),
    })
    return
  }
  try {
    await fetchDeleteAction(actionID)
    store.dispatch(configActions.resetSelectedActionReducer(displayName))

    store.dispatch(
      actionActions.removeActionItemReducer({
        actionID: actionID,
        displayName,
      }),
    )
    message.success({
      content: i18n.t("editor.action.action_list.message.success_deleted"),
    })
  } catch (e) {
    if (isILLAAPiError(e)) {
      message.error({
        content: i18n.t("editor.action.action_list.message.failed"),
      })
    }
  }
}
