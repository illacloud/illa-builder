import * as Redux from "redux"
import {
  Connection,
  getPayload,
  transformComponentReduxPayloadToWsPayload,
} from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import {
  DeleteComponentNodePayload,
  UpdateComponentPropsPayload,
  UpdateComponentReflowPayload,
  UpdateComponentDisplayNamePayload,
  ComponentNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { UpdateComponentsShapePayload } from "@/redux/currentApp/editor/components/componentsPayload"

export const reduxAsync: Redux.Middleware = store => next => action => {
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
  //  TODO: @aruseito ws send message when connected
  try {
    switch (reduxType) {
      case "components":
        switch (reduxAction) {
          case "addComponentReducer":
            const addComponentWSPayload = transformComponentReduxPayloadToWsPayload(
              payload as ComponentNode[],
            )
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_CREATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                addComponentWSPayload,
              ),
            )
            break
          case "updateComponentsShape":
            const singleComponentPayload: UpdateComponentsShapePayload = payload
            const singleComponentWSPayload = transformComponentReduxPayloadToWsPayload(
              singleComponentPayload.components,
            )
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
                singleComponentWSPayload,
              ),
            )
            break
          case "updateComponentReflowReducer":
            const updateComponentReflowPayload: UpdateComponentReflowPayload = payload
            const updateComponentReflowWSPayload = transformComponentReduxPayloadToWsPayload(
              updateComponentReflowPayload.childNodes,
            )
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                updateComponentReflowWSPayload,
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
                  [
                    {
                      before: updatePayload.displayName,
                      after: finalNode,
                    },
                  ],
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
          case "resetComponentPropsReducer":
            const resetPayload: ComponentNode = payload
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                [
                  {
                    before: resetPayload.displayName,
                    after: resetPayload,
                  },
                ],
              ),
            )
            break
          case "updateComponentDisplayNameReducer":
            const updateDisplayNamePayload: UpdateComponentDisplayNamePayload = payload
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                [
                  {
                    before: updateDisplayNamePayload.displayName,
                    after: updateDisplayNamePayload.newDisplayName,
                  },
                ],
              ),
            )
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
