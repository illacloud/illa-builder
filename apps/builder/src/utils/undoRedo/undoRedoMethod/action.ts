import { ActionContent } from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import { omit } from "lodash-es"
import { v4 } from "uuid"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import {
  fetchCreateAction,
  fetchDeleteAction,
  fetchUpdateAction,
} from "@/services/action"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const addActionItemWhenUndoRedo = async (
  action: ActionItem<ActionContent>,
) => {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const newAction = omit(action, ["displayName", "actionID"])
  const displayName = DisplayNameGenerator.isAlreadyGenerate(action.displayName)
    ? DisplayNameGenerator.generateDisplayName(action.actionType)
    : DisplayNameGenerator.updateOrGenerateDisplayName(action.displayName)
  const data: Omit<ActionItem<ActionContent>, "actionID"> = {
    ...newAction,
    displayName,
  }
  if (isGuideMode) {
    const createActionData: ActionItem<ActionContent> = {
      ...data,
      actionID: v4(),
    }
    return createActionData
  }
  try {
    const response = await fetchCreateAction(data)
    return response.data
  } catch (e) {
    DisplayNameGenerator.removeDisplayName(displayName)
    throw e
  }
}

export const removeActionItemWhenUndoRedo = async (displayName: string) => {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const actionList = getActionList(store.getState())
  const targetAction = actionList.find(
    (item) => item.displayName === displayName,
  )
  if (!targetAction) {
    throw new Error("action not found")
  }
  if (!isGuideMode) {
    try {
      await fetchDeleteAction(targetAction.actionID)
    } catch (e) {
      throw e
    }
  }
}

export const updateActionItemReducerWhenUndoRedo = async (
  action: ActionItem<ActionContent>,
) => {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const actionList = getActionList(store.getState())
  const targetAction = actionList.find(
    (item) => action.displayName === item.displayName,
  )
  if (!targetAction) {
    throw new Error("action not found")
  }
  if (!isGuideMode) {
    try {
      await fetchUpdateAction(action)
    } catch (e) {
      throw e
    }
  }
}

export const updateActionDisplayNameReducerWhenUndoRedo = async (
  oldDisplayName: string,
  newDisplayName: string,
) => {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const actionList = getActionList(store.getState())
  const action = actionList.find(
    (action) => action.displayName === oldDisplayName,
  )
  if (!isGuideMode && action) {
    try {
      await fetchUpdateAction({ ...action, displayName: newDisplayName })
    } catch (e) {
      throw e
    }
  }
}
