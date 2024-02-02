import { ComponentTreeNode } from "@illa-public/public-types"
import { AnyAction } from "@reduxjs/toolkit"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
import { UpdateComponentPositionPayload } from "@/redux/currentApp/components/componentsPayload"
import {
  getComponentMap,
  getOriginalGlobalData,
  searchDSLByDisplayName,
  searchDSLFromTree,
} from "@/redux/currentApp/components/componentsSelector"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import { RootState } from "@/store"
import { buildTreeByMapNode } from "@/utils/componentNode/flatTree"
import IllaUndoRedoManager from "@/utils/undoRedo/undo"

export const componentsSnapShot = (
  reduxAction: string,
  action: AnyAction,
  prevRootState: RootState,
  nextRootState: RootState,
) => {
  const prevComponents = getComponentMap(prevRootState)
  const nextComponents = getComponentMap(nextRootState)
  switch (reduxAction) {
    // COMPONENT
    case "addComponentReducer": {
      const newAction = {
        type: "components/deleteComponentNodeReducer",
        payload: {
          displayNames: action.payload.map(
            (item: ComponentTreeNode) => item.displayName,
          ),
          source: "undoRedo",
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "deleteComponentNodeReducer": {
      const originActionComponentNode = action.payload.displayNames
        .map((displayName: string) => {
          return buildTreeByMapNode(displayName, prevComponents)
        })
        .filter((item: ComponentTreeNode | null) => item != undefined)
      const newAction = {
        type: "components/addComponentReducer",
        payload: originActionComponentNode,
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "addModalComponentReducer": {
      const newAction = {
        type: "components/deleteComponentNodeReducer",
        payload: {
          displayNames: [action.payload.modalComponentNode.displayName],
          source: "undoRedo",
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "updateComponentLayoutInfoReducer": {
      const originActionComponentNode = searchDSLByDisplayName(
        action.payload.displayName,
        prevRootState,
      )
      if (!originActionComponentNode) break
      const newAction = {
        type: "components/updateComponentLayoutInfoReducer",
        payload: {
          displayName: action.payload.displayName,
          layoutInfo: {
            x: originActionComponentNode.x,
            y: originActionComponentNode.y,
            w: originActionComponentNode.w,
            h: originActionComponentNode.h,
          },
          parentNode: originActionComponentNode.parentNode,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "updateComponentPositionReducer": {
      const layoutInfos = getClientWidgetLayoutInfo(prevRootState)
      const originNodeLayoutInfos = (
        action.payload as UpdateComponentPositionPayload
      ).updateSlices.map((item) => {
        return layoutInfos[item.displayName]
      })
      const newUpdateSlices = originNodeLayoutInfos.map((item) => {
        return {
          displayName: item.displayName,
          x: item.layoutInfo.x,
          y: item.layoutInfo.y,
          w: item.layoutInfo.w,
          h: item.layoutInfo.h,
        }
      })
      const newAction = {
        type: "components/updateComponentPositionReducer",
        payload: {
          oldParentNodeDisplayName: action.payload.newParentNodeDisplayName,
          newParentNodeDisplayName: action.payload.oldParentNodeDisplayName,
          updateSlices: newUpdateSlices,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "updateComponentDisplayNameReducer": {
      const { displayName, newDisplayName } = action.payload

      const newAction = {
        type: "components/updateComponentDisplayNameReducer",
        payload: {
          displayName: newDisplayName,
          newDisplayName: displayName,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "setComponentPropsReducer":
    case "updateComponentPropsReducer": {
      const { displayName, notUseUndoRedo } = action.payload
      if (notUseUndoRedo) break
      const originNode = searchDSLByDisplayName(displayName, prevRootState)
      if (!originNode) break
      const newAction = {
        type: "components/setComponentPropsReducer",
        payload: {
          displayName,
          updateSlice: originNode.props,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    // PAGE
    case "addTargetPageSectionReducer": {
      const { pageName, addedSectionName } = action.payload
      const newAction = {
        type: "components/deleteTargetPageSectionReducer",
        payload: {
          pageName,
          deleteSectionName: addedSectionName,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "deleteTargetPageSectionReducer": {
      const { pageName, deleteSectionName } = action.payload
      const prevComponentTree = buildTreeByMapNode("root", prevComponents)

      const currentTargeNode = searchDSLFromTree(prevComponentTree, pageName)
      if (!currentTargeNode) break
      const originSectionNode = currentTargeNode.childrenNode.find(
        (node) => node.showName === deleteSectionName,
      )
      if (!originSectionNode) break

      const newAction = {
        type: "components/addTargetPageSectionReducer",
        payload: {
          pageName,
          addedSectionName: deleteSectionName,
          originSectionNode,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "addSectionViewConfigByConfigReducer":
    case "addSectionViewReducer": {
      const { parentNodeName } = action.payload

      const originParentNode = searchDSLByDisplayName(
        parentNodeName,
        nextRootState,
      )
      if (!originParentNode) break
      const { props } = originParentNode
      if (!props) break
      const { viewSortedKey } = props
      if (!Array.isArray(viewSortedKey)) break

      const lastViewSortedKey = (viewSortedKey as string[]).at(-1)
      if (!lastViewSortedKey) break
      const newAction = {
        type: "components/deleteSectionViewReducer",
        payload: {
          viewDisplayName: lastViewSortedKey,
          parentNodeName,
          originPageSortedKey: viewSortedKey,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "deleteSectionViewReducer": {
      const { parentNodeName, viewDisplayName } = action.payload
      const prevComponentTree = buildTreeByMapNode("root", prevComponents)

      const originParentNode = searchDSLFromTree(
        prevComponentTree,
        parentNodeName,
      )

      if (!originParentNode) break

      const viewNode = originParentNode.childrenNode.find(
        (node) => node.displayName === viewDisplayName,
      )
      if (!viewNode) break
      const originChildrenNode = viewNode.childrenNode

      const newAction = {
        type: "components/addSectionViewReducer",
        payload: {
          parentNodeName,
          sectionName: originParentNode.showName,
          originChildrenNode: originChildrenNode,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "updateTargetPagePropsReducer": {
      const { pageName, notUseUndoRedo } = action.payload
      if (notUseUndoRedo) break
      const originPage = searchDSLByDisplayName(pageName, prevRootState)
      if (!originPage) break
      const newAction = {
        type: "components/updateTargetPagePropsReducer",
        payload: {
          pageName,
          newProps: originPage.props,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "addPageNodeWithSortOrderReducer": {
      const { displayName } = action.payload
      const rootNode = buildTreeByMapNode("root", nextComponents)

      if (!rootNode || !rootNode.props) break

      const newAction = {
        type: "components/deletePageNodeReducer",
        payload: {
          displayName: displayName,
          originPageSortedKey: rootNode.props.pageSortedKey,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "deletePageNodeReducer": {
      const originPageNode = searchDSLByDisplayName(
        action.payload.displayName,
        prevRootState,
      )
      if (!originPageNode) break
      const newAction = {
        type: "components/addPageNodeWithSortOrderReducer",
        payload: originPageNode,
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "updateTargetPageLayoutReducer": {
      const { pageName } = action.payload
      const prevComponentTree = buildTreeByMapNode("root", prevComponents)
      const originPageNode = searchDSLFromTree(prevComponentTree, pageName)
      if (!originPageNode || !originPageNode.props) break
      const newAction = {
        type: "components/updateTargetPageLayoutReducer",
        payload: {
          pageName: pageName,
          layout: originPageNode.props.layout,
          originPageNode,
        },
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "deleteSubPageViewNodeReducer": {
      const newAction = {
        type: "components/addSubPageReducer",
        payload: {
          pageName: action.payload.pageName,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "addSubPageReducer": {
      const { pageName } = action.payload
      const pageNode = searchDSLFromTree(
        buildTreeByMapNode("root", nextComponents),
        pageName,
      )
      const bodySectionNode = pageNode?.childrenNode.find(
        (node) => node.showName === "bodySection",
      )
      if (!bodySectionNode) break
      const viewConfigs = bodySectionNode.props!.sectionViewConfigs
      const lastViewConfig = viewConfigs[viewConfigs.length - 1]
      if (!lastViewConfig) break
      const newAction = {
        type: "components/deleteSubPageViewNodeReducer",
        payload: {
          pageName: action.payload.pageName,
          subPagePath: lastViewConfig.path,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "updateSubPagePathReducer": {
      const { pageName, subPagePath, oldSubPagePath } = action.payload
      const newAction = {
        type: "components/updateSubPagePathReducer",
        payload: {
          pageName: pageName,
          subPagePath: oldSubPagePath,
          oldSubPagePath: subPagePath,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "updateDefaultSubPagePathReducer": {
      const { pageName } = action.payload
      const prevComponentTree = buildTreeByMapNode("root", prevComponents)
      const pageNode = searchDSLFromTree(prevComponentTree, pageName)
      const oldBodySectionNode = pageNode?.childrenNode.find(
        (node) => node.showName === "bodySection",
      )
      if (!oldBodySectionNode) break
      const defaultViewKey = oldBodySectionNode.props!.defaultViewKey
      const newAction = {
        type: "components/updateDefaultSubPagePathReducer",
        payload: {
          pageName: pageName,
          subPagePath: defaultViewKey,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "updateCurrentPageStyleReducer": {
      const { pageName, style, sectionName } = action.payload
      const prevComponentTree = buildTreeByMapNode("root", prevComponents)

      const pageNode = searchDSLFromTree(prevComponentTree, pageName)
      const updateKeys = Object.keys(style)
      if (!pageNode) break
      const sectionNode = pageNode.childrenNode?.find(
        (node) => node.showName === sectionName,
      )
      if (!sectionNode) break
      const needBackStyle: Record<string, any> = {}
      updateKeys.forEach((key) => {
        needBackStyle[key] = sectionNode.props?.style?.[key] ?? undefined
      })
      const newAction = {
        type: "components/updateCurrentPageStyleReducer",
        payload: {
          pageName: pageName,
          style: needBackStyle,
          sectionName: sectionName,
        },
        from: action.from,
      }

      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([newAction])
      } else {
        IllaUndoRedoManager.pushToUndoStack([newAction])
      }
      break
    }
    case "deleteCurrentPageStyleReducer": {
      const { pageName, sectionName } = action.payload
      const prevComponentTree = buildTreeByMapNode("root", prevComponents)
      const pageNode = searchDSLFromTree(prevComponentTree, pageName)
      if (!pageNode) break
      const sectionNode = pageNode.childrenNode?.find(
        (node) => node.showName === sectionName,
      )
      if (!sectionNode) break
      const sectionNodeStyle = sectionNode.props?.style
      if (!sectionNodeStyle) break
      const newAction = {
        type: "components/updateCurrentPageStyleReducer",
        payload: {
          pageName: pageName,
          style: sectionNodeStyle,
          sectionName: sectionName,
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "setGlobalStateReducer": {
      const { key, oldKey, value } = action.payload
      let newAction
      if (!oldKey) {
        newAction = {
          type: "components/deleteGlobalStateByKeyReducer",
          payload: { key },
          from: action.from,
        }
      } else {
        newAction = {
          type: "components/setGlobalStateReducer",
          payload: { key: oldKey, oldKey: key, value },
          from: action.from,
        }
      }

      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
    case "deleteGlobalStateByKeyReducer": {
      const prevGlobalState = getOriginalGlobalData(prevRootState)
      const { key } = action.payload
      const targetGlobalState = prevGlobalState[key]
      const newAction = {
        type: "components/setGlobalStateReducer",
        payload: {
          key,
          value: targetGlobalState,
          oldKey: "",
        },
        from: action.from,
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      } else {
        IllaUndoRedoManager.pushToUndoStack([
          JSON.parse(JSON.stringify(newAction)),
        ])
      }
      break
    }
  }
}
