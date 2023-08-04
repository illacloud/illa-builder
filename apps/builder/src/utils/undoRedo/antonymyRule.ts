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
        } catch (e) {
          message.error({
            content: i18n.t(`frame.message.${from}.failed`),
          })
          return
        }

        break
      }
      case "action/removeActionItemReducer": {
        try {
          await removeActionItemWhenUndoRedo(action.payload.displayName)
          store.dispatch({
            ...action,
            from,
          })
        } catch (e) {
          message.error({
            content: i18n.t(`frame.message.${from}.failed`),
          })
          return
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
          return
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
        } catch (e) {
          message.error({
            content: i18n.t(`frame.message.${from}.failed`),
          })
          return
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
        }
        break
      }
      case "components/addSectionViewConfigByConfigReducer":
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
        }
        break
      }
      case "components/addPageNodeWithSortOrderReducer": {
        const originNode = action.payload
        const newOriginNodeByChangeDisplayName =
          changeDisplayNameHelperWhenUndoRedo(originNode)
        store.dispatch({
          ...action,
          from,
          payload: {
            ...action.payload,
            originChildrenNode: newOriginNodeByChangeDisplayName,
          },
        })
        break
      }
      case "components/updateTargetPageLayoutReducer": {
        const originNode = action.payload.originPageNode
        const newOriginNodeByChangeDisplayName =
          changeDisplayNameHelperWhenUndoRedo(originNode)
        store.dispatch({
          ...action,
          from,
          payload: {
            ...action.payload,
            originChildrenNode: newOriginNodeByChangeDisplayName,
          },
        })
        break
      }
      default: {
        store.dispatch({
          ...action,
          from,
        })
      }
    }
  }
  message.success({
    content: i18n.t(`frame.message.${from}.suc`),
  })
}
