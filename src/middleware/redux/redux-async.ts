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
import {
  ComponentCopyPayload,
  ComponentDraggingPayload,
  ComponentDropPayload,
  ComponentResizePayload,
} from "@/redux/currentApp/editor/components/componentsPayload"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import {
  DeleteComponentNodePayload,
  UpdateComponentPropsPayload,
} from "@/redux/currentApp/editor/components/componentsState"

export const reduxAsync: Redux.Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const typeList = type.split("/")
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  const currentAppID = store.getState().currentApp.appInfo.appId ?? ""
  if (typeList[typeList.length - 1] === "remote") {
    const newType = `${reduxType}/${reduxAction}`
    action.type = newType
    if (
      newType === "apps/removeDashboardAppReducer" &&
      payload === currentAppID
    ) {
      const wsUrl = Connection.roomMap.get(currentAppID) ?? ""
      if (wsUrl) {
        Connection.leaveRoom("app", currentAppID)
      }
      window.location.href = "/404"
    }
    return next(action)
  }
  const resp = next(action)
  //  TODO: @aruseito ws send message when ws contected
  try {
    switch (reduxType) {
      case "components":
        switch (reduxAction) {
          case "addComponentReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_CREATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "updateSingleComponentReducer":
            const singleComponentPayload: ComponentDropPayload = payload
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                singleComponentPayload.isMove
                  ? Signal.SIGNAL_MOVE_STATE
                  : Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                [singleComponentPayload.componentNode],
              ),
            )
            break
          case "updateComponentDraggingState":
            const dragPayload: ComponentDraggingPayload = payload
            const dragNode = searchDsl(
              getCanvas(store.getState()),
              dragPayload.displayName,
            )
            if (dragNode != null) {
              Connection.getRoom("app", currentAppID)?.send(
                getPayload(
                  Signal.SIGNAL_UPDATE_STATE,
                  Target.TARGET_COMPONENTS,
                  true,
                  {
                    type,
                    payload,
                  },
                  [dragNode],
                ),
              )
            }
            break
          case "copyComponentNodeReducer":
            const copyPayload: ComponentCopyPayload = payload
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_CREATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                [copyPayload.componentNode],
              ),
            )
            break
          case "updateComponentPropsReducer":
            const updatePayload: UpdateComponentPropsPayload = payload
            const finalNode = searchDsl(
              getCanvas(store.getState()),
              updatePayload.displayName,
            )
            if (finalNode != null) {
              Connection.getRoom("app", currentAppID)?.send(
                getPayload(
                  Signal.SIGNAL_UPDATE_STATE,
                  Target.TARGET_COMPONENTS,
                  true,
                  {
                    type,
                    payload,
                  },
                  [finalNode],
                ),
              )
            }
            break
          case "updateComponentResizeState":
            const resizePayload: ComponentResizePayload = payload
            const resizeNode = searchDsl(
              getCanvas(store.getState()),
              resizePayload.displayName,
            )
            if (resizeNode != null) {
              Connection.getRoom("app", currentAppID)?.send(
                getPayload(
                  Signal.SIGNAL_UPDATE_STATE,
                  Target.TARGET_COMPONENTS,
                  true,
                  {
                    type,
                    payload,
                  },
                  [resizeNode],
                ),
              )
            }
            break
          case "deleteComponentNodeReducer":
            const deletePayload: DeleteComponentNodePayload = payload
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_DELETE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                deletePayload.displayNames,
              ),
            )
            break
        }
        break
      case "dependencies":
        switch (reduxAction) {
          case "setDependenciesReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_PUT_STATE,
                Target.TARGET_DEPENDENCIES,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
        }
        break
      case "dragShadow":
        switch (reduxAction) {
          case "addOrUpdateDragShadowReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_ONLY_BROADCAST,
                Target.TARGET_DRAG_SHADOW,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "removeDragShadowReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_ONLY_BROADCAST,
                Target.TARGET_DRAG_SHADOW,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
        }
        break
      case "dottedLineSquare":
        switch (reduxAction) {
          case "addOrUpdateDottedLineSquareReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_ONLY_BROADCAST,
                Target.TARGET_DOTTED_LINE_SQUARE,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "removeDottedLineSquareReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_ONLY_BROADCAST,
                Target.TARGET_DOTTED_LINE_SQUARE,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
        }
        break
      case "displayName":
        switch (reduxAction) {
          case "addDisplayNameReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_CREATE_OR_UPDATE_STATE,
                Target.TARGET_DISPLAY_NAME,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "removeDisplayNameReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_DELETE_STATE,
                Target.TARGET_DISPLAY_NAME,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "removeDisplayNameMultiReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_DELETE_STATE,
                Target.TARGET_DISPLAY_NAME,
                true,
                {
                  type,
                  payload,
                },
                payload,
              ),
            )
            break
        }
        break
      case "action":
        switch (reduxAction) {
          case "addActionItemReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_ONLY_BROADCAST,
                Target.TARGET_ACTION,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "removeActionItemReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_ONLY_BROADCAST,
                Target.TARGET_ACTION,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "updateActionItemReducer":
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_ONLY_BROADCAST,
                Target.TARGET_ACTION,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
        }
        break
      case "apps":
        switch (reduxAction) {
          case "addDashboardAppReducer":
            Connection.getRoom("dashboard", "")?.send(
              getPayload(
                Signal.SIGNAL_CREATE_STATE,
                Target.TARGET_APPS,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "removeDashboardAppReducer":
            Connection.getRoom("dashboard", "")?.send(
              getPayload(
                Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
                Target.TARGET_APPS,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          case "renameDashboardAppReducer":
            Connection.getRoom("dashboard", "")?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_APPS,
                true,
                {
                  type,
                  payload,
                },
                [payload],
              ),
            )
            break
          default:
            break
        }
        break
      case "resource":
        switch (reduxAction) {
          case "addResourceItemReducer": {
            const appId = store.getState().currentApp.appInfo.appId
            if (typeof appId === "number" && appId >= 0) {
              Connection.getRoom("app", currentAppID)?.send(
                getPayload(
                  Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
                  Target.TARGET_RESOURCE,
                  true,
                  {
                    type,
                    payload,
                  },
                  [payload],
                ),
              )
            } else {
              Connection.getRoom("dashboard", "")?.send(
                getPayload(
                  Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
                  Target.TARGET_RESOURCE,
                  true,
                  {
                    type,
                    payload,
                  },
                  [payload],
                ),
              )
            }
            break
          }
          case "updateResourceItemReducer": {
            if (typeof currentAppID === "number" && currentAppID >= 0) {
              Connection.getRoom("app", `${currentAppID}`)?.send(
                getPayload(
                  Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
                  Target.TARGET_RESOURCE,
                  true,
                  {
                    type,
                    payload,
                  },
                  [payload],
                ),
              )
            } else {
              Connection.getRoom("dashboard", "")?.send(
                getPayload(
                  Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
                  Target.TARGET_RESOURCE,
                  true,
                  {
                    type,
                    payload,
                  },
                  [payload],
                ),
              )
            }

            break
          }
          case "removeResourceItemReducer": {
            if (typeof currentAppID === "number" && currentAppID >= 0) {
              Connection.getRoom("app", `${currentAppID}`)?.send(
                getPayload(
                  Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
                  Target.TARGET_RESOURCE,
                  true,
                  {
                    type,
                    payload,
                  },
                  [payload],
                ),
              )
            } else {
              Connection.getRoom("dashboard", "")?.send(
                getPayload(
                  Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
                  Target.TARGET_RESOURCE,
                  true,
                  {
                    type,
                    payload,
                  },
                  [payload],
                ),
              )
            }

            break
          }
        }
        break
      default:
        break
    }
  } catch (e) {
    console.log(e)
  }
  return resp
}
