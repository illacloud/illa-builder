import { cloneDeep } from "lodash"
import * as Redux from "redux"
import {
  Connection,
  getPayload,
  transformComponentReduxPayloadToWsPayload,
} from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import {
  UpdateComponentContainerPayload,
  UpdateComponentNodeLayoutInfoPayload,
  UpdateComponentSlicePropsPayload,
} from "@/redux/currentApp/editor/components/componentsPayload"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import {
  AddModalComponentPayload,
  AddSectionViewPayload,
  AddTargetPageSectionPayload,
  ComponentNode,
  CopyComponentPayload,
  DeleteComponentNodePayload,
  DeletePageNodePayload,
  DeleteSectionViewPayload,
  DeleteTargetPageSectionPayload,
  UpdateComponentDisplayNamePayload,
  UpdateComponentNodeHeightPayload,
  UpdateComponentPropsPayload,
  UpdateComponentReflowPayload,
  UpdateSectionViewPropsPayload,
  UpdateTargetPageLayoutPayload,
  UpdateTargetPagePropsPayload,
  sortComponentNodeChildrenPayload,
} from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { ILLARoute } from "@/router"

export const reduxAsync: Redux.Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const typeList = type.split("/")
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  const currentAppID = store.getState().currentApp.appInfo.appId ?? ""
  const { id: teamID = "", uid = "" } =
    getCurrentTeamInfo(store.getState()) ?? {}
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
      ILLARoute.navigate("/404", {
        replace: true,
      })
    }
    if (newType === "enter/remote") {
      if (currentAppID !== "") {
        action.type = "collaborators/setInRoomUsers"
      }
    }
    if (newType === "attachComponent/remote") {
      if (currentAppID !== "") {
        action.type = "collaborators/updateComponentAttachedUsers"
        action.payload = payload.componentAttachedUsers
      }
    }
    return next(action)
  }
  const originalStore = cloneDeep(store.getState())
  const resp = next(action)
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
                teamID,
                uid,
                payload,
              ),
            )
            break
          case "addModalComponentReducer": {
            const payload = action.payload as AddModalComponentPayload

            const parentNode = searchDsl(
              getCanvas(store.getState()),
              payload.modalComponentNode.parentNode,
            )
            if (!parentNode) return
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_CREATE_OR_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                null,
                teamID,
                uid,
                [parentNode],
              ),
            )
            const allChildrenNodes = parentNode.childrenNode
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_CREATE_OR_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                allChildrenNodes,
              ),
            )
            break
          }
          case "copyComponentReducer":
            const copyComponentPayload = (
              payload as CopyComponentPayload[]
            ).map((copyShape) => copyShape.newComponentNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_CREATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                copyComponentPayload,
              ),
            )
            break
          case "updateComponentReflowReducer":
            const updateComponentReflowPayload: UpdateComponentReflowPayload[] =
              payload
            const allEffectComponentNodes: ComponentNode[] =
              updateComponentReflowPayload.flatMap((payload) => {
                return payload.childNodes
              })
            const updateComponentReflowWSPayload =
              transformComponentReduxPayloadToWsPayload(allEffectComponentNodes)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                updateComponentReflowWSPayload,
              ),
            )
            break
          case "sortComponentNodeChildrenReducer":
            const sortComponentNodeChildrenPayload: sortComponentNodeChildrenPayload =
              payload
            const sortComponentNodeChildrenWSPayload =
              transformComponentReduxPayloadToWsPayload(
                sortComponentNodeChildrenPayload.newChildrenNode,
              )
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_MOVE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                sortComponentNodeChildrenWSPayload,
              ),
            )
            break
          case "updateComponentContainerReducer":
            const updateComponentContainerPayload: UpdateComponentContainerPayload =
              payload
            const componentNodes =
              updateComponentContainerPayload.updateSlice.map(
                (slice) => slice.component,
              )
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_MOVE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                componentNodes,
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
                  teamID,
                  uid,
                  [
                    {
                      before: {
                        displayName: updatePayload.displayName,
                      },
                      after: finalNode,
                    },
                  ],
                ),
              )
            }
            break
          case "batchUpdateMultiComponentSlicePropsReducer": {
            const batchUpdatePayload: UpdateComponentSlicePropsPayload[] =
              payload
            const allDisplayNames = batchUpdatePayload.map(
              ({ displayName }) => displayName,
            )
            const allNodes = allDisplayNames
              .map((displayName) => {
                return searchDsl(
                  getCanvas(store.getState()),
                  displayName,
                ) as ComponentNode
              })
              .filter((node) => node !== null) as ComponentNode[]
            const wsPayload =
              transformComponentReduxPayloadToWsPayload(allNodes)

            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                wsPayload,
              ),
            )
            break
          }
          case "updateMultiComponentPropsReducer":
            const updateMultiPayload: UpdateComponentPropsPayload[] = payload
            const finalNodes = updateMultiPayload
              .map(({ displayName }) => {
                return searchDsl(getCanvas(store.getState()), displayName)
              })
              .filter((node) => node !== null) as ComponentNode[]
            if (Array.isArray(finalNodes)) {
              const wsPayload =
                transformComponentReduxPayloadToWsPayload(finalNodes)
              Connection.getRoom("app", currentAppID)?.send(
                getPayload(
                  Signal.SIGNAL_UPDATE_STATE,
                  Target.TARGET_COMPONENTS,
                  true,
                  {
                    type,
                    payload,
                  },
                  teamID,
                  uid,
                  wsPayload,
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
                teamID,
                uid,
                deletePayload.displayNames,
              ),
            )
            break
          case "resetComponentPropsReducer":
            const resetWsPayload = transformComponentReduxPayloadToWsPayload(
              payload as ComponentNode,
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
                teamID,
                uid,
                resetWsPayload,
              ),
            )
            break
          case "updateComponentDisplayNameReducer":
            const { displayName, newDisplayName } =
              action.payload as UpdateComponentDisplayNamePayload
            const canvasNode = getCanvas(store.getState())
            const findOldNode = searchDsl(canvasNode, newDisplayName)
            if (!findOldNode) break
            const parentNode = searchDsl(canvasNode, findOldNode.parentNode)
            if (!parentNode) break
            const WSPayload = transformComponentReduxPayloadToWsPayload([
              parentNode,
              ...(findOldNode.childrenNode || []),
            ])
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                [
                  {
                    before: {
                      displayName: displayName,
                    },
                    after: {
                      ...findOldNode,
                      displayName: newDisplayName,
                    },
                  },
                  ...WSPayload,
                ],
              ),
            )
            break
          case "updateTargetPageLayoutReducer": {
            const { pageName } = action.payload as UpdateTargetPageLayoutPayload
            const canvasNode = getCanvas(store.getState())
            const pageNode = searchDsl(canvasNode, pageName)
            if (!pageNode) break
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_DELETE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                null,
                teamID,
                uid,
                [pageName],
              ),
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
                teamID,
                uid,
                [pageNode],
              ),
            )
            break
          }
          case "deleteTargetPageSectionReducer": {
            const { pageName, deleteSectionName } =
              action.payload as DeleteTargetPageSectionPayload
            const originFinalNode = searchDsl(
              getCanvas(originalStore),
              pageName,
            )
            const finalNode = searchDsl(getCanvas(store.getState()), pageName)

            if (!finalNode || !originFinalNode) break
            const WSPayload =
              transformComponentReduxPayloadToWsPayload(finalNode)
            const targetPageChildrenNode = originFinalNode.childrenNode.find(
              (node) => node.showName === deleteSectionName,
            )
            if (!targetPageChildrenNode) return
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_DELETE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                [targetPageChildrenNode.displayName],
              ),
            )

            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                null,
                teamID,
                uid,
                WSPayload,
              ),
            )
            break
          }
          case "addTargetPageSectionReducer": {
            const { pageName, addedSectionName } =
              action.payload as AddTargetPageSectionPayload
            const pageNode = searchDsl(getCanvas(store.getState()), pageName)
            if (!pageNode) break
            const addSectionNode = pageNode.childrenNode.find(
              (node) => node.showName === addedSectionName,
            )
            if (!addSectionNode) break

            const WSPagePayload =
              transformComponentReduxPayloadToWsPayload(pageNode)

            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                null,
                teamID,
                uid,
                WSPagePayload,
              ),
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
                teamID,
                uid,
                [addSectionNode],
              ),
            )
            break
          }
          case "updateTargetPagePropsReducer": {
            const { pageName } = action.payload as UpdateTargetPagePropsPayload
            const pageNode = searchDsl(getCanvas(store.getState()), pageName)

            if (!pageNode) break
            const WSPagePayload =
              transformComponentReduxPayloadToWsPayload(pageNode)

            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                WSPagePayload,
              ),
            )
            break
          }
          case "updateViewportSizeReducer":
          case "updateRootNodePropsReducer": {
            const rootNode = getCanvas(store.getState())
            if (!rootNode) break
            const WSPagePayload =
              transformComponentReduxPayloadToWsPayload(rootNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                WSPagePayload,
              ),
            )
            break
          }
          case "addPageNodeWithSortOrderReducer": {
            const rootNode = getCanvas(store.getState())
            const nodes = action.payload as ComponentNode[]
            if (!rootNode || !Array.isArray(nodes) || nodes.length === 0) break
            const rootNodeUpdateWSPayload =
              transformComponentReduxPayloadToWsPayload(rootNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                null,
                teamID,
                uid,
                rootNodeUpdateWSPayload,
              ),
            )
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_CREATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                { type, payload },
                teamID,
                uid,
                nodes,
              ),
            )
            break
          }
          case "deletePageNodeReducer": {
            const deletePayload = payload as DeletePageNodePayload
            const rootNode = getCanvas(store.getState())
            if (!rootNode) break
            const rootNodeUpdateWSPayload =
              transformComponentReduxPayloadToWsPayload(rootNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                null,
                teamID,
                uid,
                rootNodeUpdateWSPayload,
              ),
            )
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_DELETE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                [deletePayload.displayName],
              ),
            )
            break
          }
          case "addSectionViewReducer": {
            const { parentNodeName, containerNode } =
              payload as AddSectionViewPayload
            const rootNode = getCanvas(store.getState())

            if (!rootNode) break
            const targetNode = searchDsl(rootNode, parentNodeName)
            if (!targetNode) break
            const updateWSPayload =
              transformComponentReduxPayloadToWsPayload(targetNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                null,
                teamID,
                uid,
                updateWSPayload,
              ),
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
                teamID,
                uid,
                [containerNode],
              ),
            )
            break
          }
          case "deleteSectionViewReducer": {
            const { viewDisplayName, parentNodeName } =
              payload as DeleteSectionViewPayload
            const rootNode = getCanvas(store.getState())
            if (!rootNode) break
            const targetNode = searchDsl(rootNode, parentNodeName)
            if (!targetNode) break
            const updateWSPayload =
              transformComponentReduxPayloadToWsPayload(targetNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_DELETE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                null,
                teamID,
                uid,
                [viewDisplayName],
              ),
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
                teamID,
                uid,
                updateWSPayload,
              ),
            )
            break
          }
          case "updateSectionViewPropsReducer": {
            const { parentNodeName } = payload as UpdateSectionViewPropsPayload
            const rootNode = getCanvas(store.getState())
            if (!rootNode) break
            const targetNode = searchDsl(rootNode, parentNodeName)
            if (!targetNode) break
            const updateWSPayload =
              transformComponentReduxPayloadToWsPayload(targetNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                updateWSPayload,
              ),
            )
            break
          }
          case "updateComponentNodeHeightReducer": {
            const { displayName } = payload as UpdateComponentNodeHeightPayload
            const rootNode = getCanvas(store.getState())
            if (!rootNode) break
            const targetNode = searchDsl(rootNode, displayName)
            if (!targetNode) break
            const updateWSPayload =
              transformComponentReduxPayloadToWsPayload(targetNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                updateWSPayload,
              ),
            )
            break
          }
          case "batchUpdateComponentLayoutInfoReducer": {
            const displayNames = (
              payload as UpdateComponentNodeLayoutInfoPayload[]
            ).map((item) => item.displayName)
            const rootNode = getCanvas(store.getState())
            if (!rootNode) break
            const targetNodes = displayNames
              .map((displayName) => searchDsl(rootNode, displayName))
              .filter((node) => node !== null) as ComponentNode[]
            if (targetNodes.length < 1) break
            const updateWSPayload =
              transformComponentReduxPayloadToWsPayload(targetNodes)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                updateWSPayload,
              ),
            )
          }
          case "updateComponentLayoutInfoReducer": {
            const displayName = (
              payload as UpdateComponentNodeLayoutInfoPayload
            ).displayName
            const rootNode = getCanvas(store.getState())
            if (!rootNode) break
            const targetNode = searchDsl(rootNode, displayName)
            if (!targetNode) break
            const updateWSPayload =
              transformComponentReduxPayloadToWsPayload(targetNode)
            Connection.getRoom("app", currentAppID)?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_COMPONENTS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
                updateWSPayload,
              ),
            )
            break
          }
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
                teamID,
                uid,
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
                teamID,
                uid,
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
                teamID,
                uid,
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
                teamID,
                uid,
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
                teamID,
                uid,
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
                teamID,
                uid,
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
                teamID,
                uid,
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
                teamID,
                uid,
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
                teamID,
                uid,
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
                teamID,
                uid,
                [payload],
              ),
            )
            break
          case "modifyConfigDashboardAppReducer":
            Connection.getRoom("dashboard", "")?.send(
              getPayload(
                Signal.SIGNAL_UPDATE_STATE,
                Target.TARGET_APPS,
                true,
                {
                  type,
                  payload,
                },
                teamID,
                uid,
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
                  teamID,
                  uid,
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
                  teamID,
                  uid,
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
                  teamID,
                  uid,
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
                  teamID,
                  uid,
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
                  teamID,
                  uid,
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
                  teamID,
                  uid,
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
