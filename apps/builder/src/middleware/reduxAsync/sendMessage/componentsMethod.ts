import { ComponentTreeNode } from "@illa-public/public-types"
import { PayloadAction } from "@reduxjs/toolkit"
import {
  Connection,
  getTextMessagePayload,
  transformComponentReduxPayloadToWsPayload,
} from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import {
  UpdateComponentNodeLayoutInfoPayload,
  UpdateComponentPositionPayload,
  UpdateComponentSlicePropsPayload,
} from "@/redux/currentApp/components/componentsPayload"
import { getNeedDeleteSectionViewDisplayNames } from "@/redux/currentApp/components/componentsReducer"
import {
  getComponentMap,
  searchComponentFromMap,
  searchDSLFromTree,
} from "@/redux/currentApp/components/componentsSelector"
import {
  AddModalComponentPayload,
  AddSectionViewPayload,
  AddTargetPageSectionPayload,
  DeleteComponentNodePayload,
  DeletePageNodePayload,
  DeleteSectionViewPayload,
  DeleteSubPageViewNodePayload,
  DeleteTargetPageSectionPayload,
  SortComponentNodeChildrenPayload,
  UpdateComponentDisplayNamePayload,
  UpdateComponentNodeHeightPayload,
  UpdateComponentPropsPayload,
  UpdateComponentReflowPayload,
  UpdateCurrentPageStylePayload,
  UpdateSectionViewPropsPayload,
  UpdateTargetPageLayoutPayload,
  UpdateTargetPagePropsPayload,
} from "@/redux/currentApp/components/componentsState"
import { RootState } from "@/store"
import { buildTreeByMapNode } from "@/utils/componentNode/flatTree"

export const componentsAsync = (
  reduxAction: string,
  currentAppID: string,
  action: PayloadAction<any>,
  teamID: string,
  uid: string,
  prevRootState: RootState,
  nextRootState: RootState,
) => {
  const { payload } = action
  const prevComponents = getComponentMap(prevRootState)
  const nextComponents = getComponentMap(nextRootState)
  switch (reduxAction) {
    case "addComponentReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.CREATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          payload,
        ),
      )
      break
    }
    case "addModalComponentReducer": {
      const payload = action.payload as AddModalComponentPayload
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)

      const parentNode = searchDSLFromTree(
        nextComponentTree,
        payload.modalComponentNode.parentNode!,
      )
      if (!parentNode) return
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.CREATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [payload.modalComponentNode],
        ),
      )
      break
    }
    case "updateComponentReflowReducer": {
      const updateComponentReflowPayload: UpdateComponentReflowPayload[] =
        payload
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)

      const allEffectComponentDisplayName: string[] =
        updateComponentReflowPayload
          .flatMap((payload) => {
            return payload.childNodes
          })
          .map((node) => node.displayName)
      const allEffectComponentNode = allEffectComponentDisplayName
        .map((displayName) => searchDSLFromTree(nextComponentTree, displayName))
        .filter((node) => node !== null) as ComponentTreeNode[]
      const updateComponentReflowWSPayload =
        transformComponentReduxPayloadToWsPayload(allEffectComponentNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateComponentReflowWSPayload,
        ),
      )
      break
    }
    case "sortComponentNodeChildrenReducer": {
      const sortComponentNodeChildrenPayload: SortComponentNodeChildrenPayload =
        payload
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const parentNode = searchDSLFromTree(
        nextComponentTree,
        sortComponentNodeChildrenPayload.parentDisplayName,
      )
      if (!parentNode) return
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.DELETE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [parentNode.displayName!],
        ),
      )
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.CREATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [parentNode],
        ),
      )
      break
    }
    case "updateComponentPositionReducer": {
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const updateComponentContainerPayload: UpdateComponentPositionPayload =
        payload
      const {
        updateSlices,
        oldParentNodeDisplayName,
        newParentNodeDisplayName,
      } = updateComponentContainerPayload
      const allDisplayNames = updateSlices.map((slice) => slice.displayName)
      const allNodes = allDisplayNames
        .map(
          (displayName) =>
            searchDSLFromTree(
              nextComponentTree,
              displayName,
            ) as ComponentTreeNode,
        )
        .filter((node) => node !== null) as ComponentTreeNode[]
      if (oldParentNodeDisplayName !== newParentNodeDisplayName) {
        Connection.getTextRoom("app", currentAppID)?.send(
          getTextMessagePayload(
            TextSignal.MOVE_STATE,
            TextTarget.COMPONENTS,
            false,
            null,
            teamID,
            uid,
            allNodes.map((node) => {
              return {
                displayName: node.displayName,
                parentNode: node.parentNode,
                childrenNode: node.childrenNode,
              }
            }),
          ),
        )
      }
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          transformComponentReduxPayloadToWsPayload(allNodes),
        ),
      )

      break
    }
    case "setComponentPropsReducer":
    case "updateComponentPropsReducer": {
      const updatePayload: UpdateComponentPropsPayload = payload
      const finalNode = searchComponentFromMap(
        nextComponents,
        updatePayload.displayName,
      )
      if (finalNode != null) {
        Connection.getTextRoom("app", currentAppID)?.send(
          getTextMessagePayload(
            TextSignal.UPDATE_STATE,
            TextTarget.COMPONENTS,
            true,
            action,
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
    }
    case "batchUpdateMultiComponentSlicePropsReducer": {
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const batchUpdatePayload: UpdateComponentSlicePropsPayload[] = payload
      const allDisplayNames = batchUpdatePayload.map(
        ({ displayName }) => displayName,
      )
      const allNodes = allDisplayNames
        .map((displayName) => {
          return searchDSLFromTree(nextComponentTree, displayName)
        })
        .filter((node) => node != null) as ComponentTreeNode[]
      const wsPayload = transformComponentReduxPayloadToWsPayload(allNodes)

      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          wsPayload,
        ),
      )
      break
    }
    case "updateMultiComponentPropsReducer": {
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const updateMultiPayload: UpdateComponentPropsPayload[] = payload
      const finalNodes = updateMultiPayload
        .map(({ displayName }) => {
          return searchDSLFromTree(nextComponentTree, displayName)
        })
        .filter((node) => node !== null) as ComponentTreeNode[]
      if (Array.isArray(finalNodes)) {
        const wsPayload = transformComponentReduxPayloadToWsPayload(finalNodes)
        Connection.getTextRoom("app", currentAppID)?.send(
          getTextMessagePayload(
            TextSignal.UPDATE_STATE,
            TextTarget.COMPONENTS,
            true,
            action,
            teamID,
            uid,
            wsPayload,
          ),
        )
      }
      break
    }
    case "deleteComponentNodeReducer": {
      const deletePayload: DeleteComponentNodePayload = payload
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.DELETE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          deletePayload.displayNames,
        ),
      )
      break
    }
    case "updateComponentDisplayNameReducer": {
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)

      const { displayName, newDisplayName } =
        action.payload as UpdateComponentDisplayNamePayload
      const findOldNode = searchDSLFromTree(nextComponentTree, newDisplayName)
      if (!findOldNode) break
      const parentNode = searchDSLFromTree(
        nextComponentTree,
        findOldNode.parentNode!,
      )
      if (!parentNode) break
      const WSPayload = transformComponentReduxPayloadToWsPayload([
        parentNode,
        ...(findOldNode.childrenNode || []),
      ])
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
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
    }
    case "updateTargetPageLayoutReducer": {
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const { pageName } = action.payload as UpdateTargetPageLayoutPayload
      const pageNode = searchDSLFromTree(nextComponentTree, pageName)
      if (!pageNode) break
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.DELETE_STATE,
          TextTarget.COMPONENTS,
          true,
          null,
          teamID,
          uid,
          [pageName],
        ),
      )
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.CREATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [pageNode],
        ),
      )
      break
    }
    case "deleteTargetPageSectionReducer": {
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const { pageName, deleteSectionName } =
        action.payload as DeleteTargetPageSectionPayload
      const prevComponentTree = buildTreeByMapNode("root", prevComponents)
      const originFinalNode = searchDSLFromTree(prevComponentTree, pageName)
      const finalNode = searchDSLFromTree(nextComponentTree, pageName)

      if (!finalNode || !originFinalNode) break
      const WSPayload = transformComponentReduxPayloadToWsPayload(finalNode)
      const targetPageChildrenNode = originFinalNode.childrenNode.find(
        (node) => node.showName === deleteSectionName,
      )
      if (!targetPageChildrenNode) return
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.DELETE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [targetPageChildrenNode.displayName],
        ),
      )

      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
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
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const { pageName, addedSectionName } =
        action.payload as AddTargetPageSectionPayload
      const pageNode = searchDSLFromTree(nextComponentTree, pageName)
      if (!pageNode) break
      const addSectionNode = pageNode.childrenNode.find(
        (node) => node.showName === addedSectionName,
      )
      if (!addSectionNode) break

      const WSPagePayload = transformComponentReduxPayloadToWsPayload(pageNode)

      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          null,
          teamID,
          uid,
          WSPagePayload,
        ),
      )
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.CREATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [addSectionNode],
        ),
      )
      break
    }
    case "updateTargetPagePropsReducer": {
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const { pageName } = action.payload as UpdateTargetPagePropsPayload
      const pageNode = searchDSLFromTree(nextComponentTree, pageName)

      if (!pageNode) break
      const WSPagePayload = transformComponentReduxPayloadToWsPayload(pageNode)

      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          WSPagePayload,
        ),
      )
      break
    }
    case "updateViewportSizeReducer":
    case "updateRootNodePropsReducer": {
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const WSPagePayload =
        transformComponentReduxPayloadToWsPayload(nextComponentTree)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          WSPagePayload,
        ),
      )
      break
    }
    case "addPageNodeWithSortOrderReducer": {
      const rootNode = buildTreeByMapNode("root", nextComponents)
      const node = action.payload as ComponentTreeNode
      if (!rootNode || !node) break
      const rootNodeUpdateWSPayload =
        transformComponentReduxPayloadToWsPayload(rootNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          null,
          teamID,
          uid,
          rootNodeUpdateWSPayload,
        ),
      )
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.CREATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [node],
        ),
      )
      break
    }
    case "deletePageNodeReducer": {
      const deletePayload = payload as DeletePageNodePayload
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const rootNodeUpdateWSPayload =
        transformComponentReduxPayloadToWsPayload(rootNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          null,
          teamID,
          uid,
          rootNodeUpdateWSPayload,
        ),
      )
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.DELETE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [deletePayload.displayName],
        ),
      )
      break
    }
    case "addSectionViewConfigByConfigReducer":
    case "addSectionViewReducer": {
      const { parentNodeName } = payload as AddSectionViewPayload
      const rootNode = buildTreeByMapNode("root", nextComponents)

      if (!rootNode) break
      const targetNode = searchDSLFromTree(rootNode, parentNodeName)
      if (!targetNode) break
      const { props } = targetNode
      const { viewSortedKey } = props as Record<string, any>
      const lastSortedKey = viewSortedKey.at(-1)
      if (!lastSortedKey) return
      const sectionNode = targetNode.childrenNode.find((item) => {
        return item.displayName === lastSortedKey
      })
      if (!sectionNode) return
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(targetNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          null,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.CREATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [sectionNode],
        ),
      )
      break
    }
    case "deleteSectionViewReducer": {
      const { viewDisplayName, parentNodeName } =
        payload as DeleteSectionViewPayload
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const targetNode = searchDSLFromTree(rootNode, parentNodeName)
      if (!targetNode) break
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(targetNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.DELETE_STATE,
          TextTarget.COMPONENTS,
          true,
          null,
          teamID,
          uid,
          [viewDisplayName],
        ),
      )
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "updateSectionViewPropsReducer": {
      const { parentNodeName } = payload as UpdateSectionViewPropsPayload
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const targetNode = searchDSLFromTree(rootNode, parentNodeName)
      if (!targetNode) break
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(targetNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "updateComponentNodeHeightReducer": {
      const { displayName } = payload as UpdateComponentNodeHeightPayload
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const targetNode = searchDSLFromTree(rootNode, displayName)
      if (!targetNode) break
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(targetNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
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
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const targetNodes = displayNames
        .map((displayName) => searchDSLFromTree(rootNode, displayName))
        .filter((node) => node !== null) as ComponentTreeNode[]
      if (targetNodes.length < 1) break
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(targetNodes)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "batchUpdateComponentLayoutInfoWhenReflowReducer": {
      const displayNames = (
        payload as UpdateComponentNodeLayoutInfoPayload[]
      ).map((item) => item.displayName)
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const targetNodes = displayNames
        .map((displayName) => searchDSLFromTree(rootNode, displayName))
        .filter((node) => node !== null) as ComponentTreeNode[]
      if (targetNodes.length < 1) break
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(targetNodes)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          false,
          null,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "updateComponentLayoutInfoReducer": {
      const displayName = (payload as UpdateComponentNodeLayoutInfoPayload)
        .displayName
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const targetNode = searchDSLFromTree(rootNode, displayName)
      if (!targetNode) break
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(targetNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "setGlobalStateReducer": {
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(rootNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "deleteGlobalStateByKeyReducer": {
      const rootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(rootNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "deleteSubPageViewNodeReducer": {
      const prevComponentTree = buildTreeByMapNode("root", prevComponents)
      const rootNode = prevComponentTree
      const nextRootNode = buildTreeByMapNode("root", nextComponents)
      if (!rootNode) break
      const { pageName, subPagePath } = payload as DeleteSubPageViewNodePayload
      const deleteDisplayNames = getNeedDeleteSectionViewDisplayNames(
        prevComponents,
        pageName,
        subPagePath,
      )
      const needUpdateParentNode = deleteDisplayNames
        .map((displayName) => {
          const currentNode = searchDSLFromTree(rootNode, displayName)
          if (!currentNode) return null
          return searchDSLFromTree(nextRootNode, currentNode.parentNode!)
        })
        .filter((node) => node !== null) as ComponentTreeNode[]
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(needUpdateParentNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.DELETE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          deleteDisplayNames,
        ),
      )

      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          null,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "updateSubPagePathReducer":
    case "updateDefaultSubPagePathReducer": {
      const { pageName } = payload as DeleteSubPageViewNodePayload
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const pageNode = searchDSLFromTree(nextComponentTree, pageName)
      if (!pageNode) return
      const needUpdateNodes = pageNode.childrenNode?.filter((node) => {
        return node.type !== "MODAL_SECTION_NODE"
      })
      if (!Array.isArray(needUpdateNodes)) return
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(needUpdateNodes)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      break
    }
    case "addSubPageReducer": {
      const { pageName } = payload as { pageName: string }
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)

      const pageNode = searchDSLFromTree(nextComponentTree, pageName)
      if (!pageNode) break
      const bodySection = pageNode.childrenNode.find(
        (node) => node.showName === "bodySection",
      )
      if (!bodySection) break
      const sectionChildrenNode = bodySection.childrenNode
      if (!Array.isArray(sectionChildrenNode)) break
      const addedSectionViewNode =
        sectionChildrenNode[sectionChildrenNode.length - 1]

      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(bodySection)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          null,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.CREATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          [addedSectionViewNode],
        ),
      )
    }

    case "updateCurrentPageStyleReducer": {
      const { pageName, sectionName } = payload as UpdateCurrentPageStylePayload
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const pageNode = searchDSLFromTree(nextComponentTree, pageName)
      if (!pageNode) break
      const sectionNode = pageNode.childrenNode.find(
        (node) => node.showName === sectionName,
      )
      if (!sectionNode) return
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(sectionNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
    }

    case "deleteCurrentPageStyleReducer": {
      const { pageName, sectionName } = payload as UpdateCurrentPageStylePayload
      const nextComponentTree = buildTreeByMapNode("root", nextComponents)
      const pageNode = searchDSLFromTree(nextComponentTree, pageName)
      if (!pageNode) break
      const sectionNode = pageNode.childrenNode.find(
        (node) => node.showName === sectionName,
      )
      if (!sectionNode) return
      const updateWSPayload =
        transformComponentReduxPayloadToWsPayload(sectionNode)
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.COMPONENTS,
          true,
          action,
          teamID,
          uid,
          updateWSPayload,
        ),
      )
    }
  }
}
