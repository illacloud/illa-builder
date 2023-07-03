import { AnyAction } from "@reduxjs/toolkit"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import store from "@/store"
import { changeDisplayNameHelperWhenUndoRedo } from "../componentNode/changeDisplayNameHelper"
import {
  addActionItemWhenUndoRedo,
  removeActionItemWhenUndoRedo,
  updateActionDisplayNameReducerWhenUndoRedo,
  updateActionItemReducerWhenUndoRedo,
} from "./undoRedoMethod/action"

const message = createMessage()

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
      case "components/addComponentReducer": {
        const originNode = action.payload
        const newOriginNodeByChangeDisplayName = originNode.map(
          (item: ComponentNode) => changeDisplayNameHelperWhenUndoRedo(item),
        )

        store.dispatch({
          ...action,
          from,
          payload: newOriginNodeByChangeDisplayName,
        })
        message.success({
          content: `frame.message.${from}.suc`,
        })
        break
      }
      case "components/addTargetPageSectionReducer": {
        if (action.payload.originSectionNode) {
          const newOriginNodeByChangeDisplayName =
            changeDisplayNameHelperWhenUndoRedo(
              action.payload.originSectionNode,
            )
          store.dispatch({
            ...action,
            from,
            payload: {
              ...action.payload,
              originSectionNode: newOriginNodeByChangeDisplayName,
            },
          })
          message.success({
            content: `frame.message.${from}.suc`,
          })
        }
        break
      }
      case "components/addSectionViewReducer": {
        if (Array.isArray(action.payload.originChildrenNode)) {
          const newOriginNodeByChangeDisplayName =
            action.payload.originChildrenNode.map((item: ComponentNode) =>
              changeDisplayNameHelperWhenUndoRedo(item),
            )
          store.dispatch({
            ...action,
            from,
            payload: {
              ...action.payload,
              originChildrenNode: newOriginNodeByChangeDisplayName,
            },
          })
          message.success({
            content: `frame.message.${from}.suc`,
          })
        }
        break
      }
      case "components/deleteComponentNodeReducer":
      case "components/updateComponentLayoutInfoReducer":
      case "components/updateComponentContainerReducer":
      case "components/updateComponentPropsReducer":
      case "components/updateComponentDisplayNameReducer":
      case "components/updateTargetPagePropsReducer":
      case "components/deleteSectionViewReducer":
      default: {
        store.dispatch({
          ...action,
          from,
        })
      }
    }
  }
}
