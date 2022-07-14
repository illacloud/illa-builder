import * as Redux from "redux"
import { addOrUpdateDragShadowReducer } from "@/redux/currentApp/editor/dragShadow/dragShadowReducer"
import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import {
  copyComponentNodeReducer,
  deleteComponentNodeReducer,
  updateComponentDraggingState,
  updateComponentPropsReducer,
  updateComponentResizeState,
} from "@/redux/currentApp/editor/components/componentsReducer"

export const reduxAsync: Redux.Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const resp = next(action)
  const typeList = type.split("/")
  if (typeList[typeList.length] === "remote") {
    return
  }
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  switch (reduxType) {
    case "components":
      switch (reduxAction) {
        case "updateComponentDraggingState":
          break
        case "copyComponentNodeReducer":
          break
        case "updateComponentPropsReducer":
          break
        case "updateComponentResizeState":
          break
        case "deleteComponentNodeReducer":
          break
      }
      break
    case "dependencies":
      switch (reduxAction) {
        case "setDependenciesReducer":
          Connection.getRoom(
            "app",
            store.getState().currentApp.appInfo.id ?? "",
          )?.send(
            getPayload(
              Signal.SIGNAL_UPDATE_STATE,
              Target.TARGET_DEPENDENCIES,
              true,
              [payload],
            ),
          )
          break
      }
      break
    case "dragShadow":
      switch (reduxAction) {
        case "addOrUpdateDragShadowReducer":
          Connection.getRoom(
            "app",
            store.getState().currentApp.appInfo.id ?? "",
          )?.send(
            getPayload(
              Signal.SIGNAL_CREATE_OR_UPDATE,
              Target.TARGET_DRAG_SHADOW,
              true,
              [payload],
            ),
          )
          break
        case "removeDragShadowReducer":
          Connection.getRoom(
            "app",
            store.getState().currentApp.appInfo.id ?? "",
          )?.send(
            getPayload(
              Signal.SIGNAL_DELETE_STATE,
              Target.TARGET_DRAG_SHADOW,
              true,
              [payload],
            ),
          )
          break
      }
      break
    case "dottedLineSquare":
      switch (reduxAction) {
        case "addOrUpdateDottedLineSquareReducer":
          Connection.getRoom(
            "app",
            store.getState().currentApp.appInfo.id ?? "",
          )?.send(
            getPayload(
              Signal.SIGNAL_CREATE_OR_UPDATE,
              Target.TARGET_DOTTED_LINE_SQUARE,
              true,
              [payload],
            ),
          )
          break
        case "removeDottedLineSquareReducer":
          Connection.getRoom(
            "app",
            store.getState().currentApp.appInfo.id ?? "",
          )?.send(
            getPayload(
              Signal.SIGNAL_DELETE_STATE,
              Target.TARGET_DOTTED_LINE_SQUARE,
              true,
              [payload],
            ),
          )
          break
      }
      break
    case "displayName":
      switch (reduxAction) {
        case "addDisplayNameReducer":
          Connection.getRoom(
            "app",
            store.getState().currentApp.appInfo.id ?? "",
          )?.send(
            getPayload(
              Signal.SIGNAL_CREATE_OR_UPDATE,
              Target.TARGET_DISPLAY_NAME,
              true,
              [payload],
            ),
          )
          break
        case "removeDisplayNameReducer":
          Connection.getRoom(
            "app",
            store.getState().currentApp.appInfo.id ?? "",
          )?.send(
            getPayload(
              Signal.SIGNAL_DELETE_STATE,
              Target.TARGET_DISPLAY_NAME,
              true,
              [payload],
            ),
          )
          break
        case "removeDisplayNameMultiReducer":
          Connection.getRoom(
            "app",
            store.getState().currentApp.appInfo.id ?? "",
          )?.send(
            getPayload(
              Signal.SIGNAL_DELETE_STATE,
              Target.TARGET_DISPLAY_NAME,
              true,
              payload,
            ),
          )
          break
      }
      break
    case "app":
      switch (reduxAction) {
        case "addDashboardAppReducer":
          Connection.getRoom("dashboard", "")?.send(
            getPayload(Signal.SIGNAL_CREATE_STATE, Target.TARGET_APPS, true, [
              payload,
            ]),
          )
          break
        case "removeDashboardAppReducer":
          Connection.getRoom("dashboard", "")?.send(
            getPayload(Signal.SIGNAL_DELETE_STATE, Target.TARGET_APPS, true, [
              payload,
            ]),
          )
          break
        case "renameDashboardAppReducer":
          Connection.getRoom("dashboard", "")?.send(
            getPayload(Signal.SIGNAL_UPDATE_STATE, Target.TARGET_APPS, true, [
              payload,
            ]),
          )
          break
        default:
          break
      }
      break
    case "resources":
      switch (reduxAction) {
        case "addResourceItemReducer":
          Connection.getRoom("dashboard", "")?.send(
            getPayload(
              Signal.SIGNAL_CREATE_STATE,
              Target.TARGET_RESOURCE,
              true,
              [payload],
            ),
          )
          break
        case "updateResourceItemReducer":
          Connection.getRoom("dashboard", "")?.send(
            getPayload(
              Signal.SIGNAL_UPDATE_STATE,
              Target.TARGET_RESOURCE,
              true,
              [payload],
            ),
          )
          break
        case "removeResourceItemReducer":
          Connection.getRoom("dashboard", "")?.send(
            getPayload(
              Signal.SIGNAL_DELETE_STATE,
              Target.TARGET_RESOURCE,
              true,
              [payload],
            ),
          )
          break
      }
      break
    default:
      break
  }
  return resp
}
