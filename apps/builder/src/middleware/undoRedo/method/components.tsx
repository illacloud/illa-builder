import { AnyAction } from "@reduxjs/toolkit"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
import { UpdateComponentContainerPayload } from "@/redux/currentApp/editor/components/componentsPayload"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { RootState } from "@/store"
import IllaUndoRedoManager from "@/utils/undoRedo/undo"

export const componentsSnapShot = (
  reduxAction: string,
  action: AnyAction,
  _prevRootState: RootState,
  _nextRootState: RootState,
) => {
  switch (reduxAction) {
    // COMPONENT
    case "addComponentReducer": {
      const newAction = {
        type: "components/deleteComponentNodeReducer",
        payload: {
          displayNames: action.payload.map(
            (item: ComponentNode) => item.displayName,
          ),
          source: "undoRedo", // TODO: 待更新
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
          return searchDSLByDisplayName(displayName, _prevRootState)
        })
        .filter((item: ComponentNode | null) => item != undefined)
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
    case "updateComponentLayoutInfoReducer": {
      const originActionComponentNode = searchDSLByDisplayName(
        action.payload.displayName,
        _prevRootState,
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
    case "updateComponentContainerReducer": {
      const originNodeLayoutInfos = (
        action.payload as UpdateComponentContainerPayload
      ).updateSlices
        .map((item) => {
          return searchDSLByDisplayName(item.displayName, _prevRootState)
        })
        .filter((item) => item !== null) as ComponentNode[]
      const newUpdateSlices = originNodeLayoutInfos.map((item) => {
        return {
          displayName: item.displayName,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        }
      })
      const newAction = {
        type: "components/updateComponentContainerReducer",
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
    case "updateComponentPropsReducer": {
      const { displayName } = action.payload
      const originNode = searchDSLByDisplayName(displayName, _prevRootState)
      if (!originNode) break
      const newAction = {
        type: "components/updateComponentPropsReducer",
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

      const currentTargeNode = searchDSLByDisplayName(pageName, _prevRootState)
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
    case "addSectionViewReducer": {
      const { parentNodeName } = action.payload

      const originParentNode = searchDSLByDisplayName(
        parentNodeName,
        _nextRootState,
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
      const originParentNode = searchDSLByDisplayName(
        parentNodeName,
        _prevRootState,
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
      const { pageName } = action.payload
      const originPage = searchDSLByDisplayName(pageName, _prevRootState)
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
  }
}
