import { AnyAction } from "@reduxjs/toolkit"
import { omit } from "lodash"
import { v4 } from "uuid"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import {
  fetchCreateAction,
  fetchDeleteAction,
  fetchUpdateAction,
} from "@/services/action"
import store from "@/store"
import { DisplayNameGenerator } from "../generators/generateDisplayName"

const message = createMessage()

const addActionItemWhenUndoRedo = async (action: ActionItem<ActionContent>) => {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  const newAction = omit(action, ["displayName", "actionId"])
  const displayName = DisplayNameGenerator.isAlreadyGenerate(action.displayName)
    ? DisplayNameGenerator.generateDisplayName(action.actionType)
    : DisplayNameGenerator.updateOrGenerateDisplayName(action.displayName)
  const data: Omit<ActionItem<ActionContent>, "actionId"> = {
    ...newAction,
    displayName,
  }
  if (isGuideMode) {
    const createActionData: ActionItem<ActionContent> = {
      ...data,
      actionId: v4(),
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

const removeActionItemWhenUndoRedo = async (actionID: string) => {
  const isGuideMode = getIsILLAGuideMode(store.getState())
  if (!isGuideMode) {
    try {
      await fetchDeleteAction(actionID)
    } catch (e) {
      throw e
    }
  }
}

const updateActionItemReducerWhenUndoRedo = async (
  action: ActionItem<ActionContent>,
) => {
  const isGuideMode = getIsILLAGuideMode(store.getState())

  if (!isGuideMode) {
    try {
      await fetchUpdateAction(action)
    } catch (e) {
      throw e
    }
  }
}

const updateActionDisplayNameReducerWhenUndoRedo = async (
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

export const reduxActionDependOnRestAPI = async (
  actions: AnyAction[],
  from: REDUX_ACTION_FROM,
) => {
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i]
    switch (action.type) {
      case "action/addActionItemReducer": {
        try {
          const newPayload = await addActionItemWhenUndoRedo(action.payload)
          store.dispatch({
            ...action,
            payload: newPayload,
            from,
          })
          message.success({
            content: `frame.message.${from}.suc`,
          })
        } catch (e) {
          message.error({
            content: i18n.t(`frame.message.${from}.failed`),
          })
        }

        break
      }
      case "action/removeActionItemReducer": {
        try {
          await removeActionItemWhenUndoRedo(action.payload.actionID)
          store.dispatch({
            ...action,
            from,
          })
          message.success({
            content: `frame.message.${from}.suc`,
          })
        } catch (e) {
          message.error({
            content: i18n.t(`frame.message.${from}.failed`),
          })
        }
        break
      }
      case "action/updateActionItemReducer": {
        try {
          await updateActionItemReducerWhenUndoRedo(action.payload)
          store.dispatch({
            ...action,
            from,
          })
        } catch (e) {
          message.error({
            content: i18n.t(`frame.message.${from}.failed`),
          })
        }
      }
      case "action/updateActionDisplayNameReducer": {
        try {
          await updateActionDisplayNameReducerWhenUndoRedo(
            action.payload.oldDisplayName,
            action.payload.newDisplayName,
          )
          store.dispatch({
            ...action,
            from,
          })
        } catch (e) {
          message.error({
            content: i18n.t(`frame.message.${from}.failed`),
          })
        }
      }
      default: {
        store.dispatch({
          ...action,
          from,
        })
      }
    }
  }
}
