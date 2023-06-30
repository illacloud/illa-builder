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
        IllaUndoRedoManager.pushToRedoStack(
          JSON.parse(JSON.stringify(newAction)),
        )
      } else {
        IllaUndoRedoManager.pushToUndoStack(
          JSON.parse(JSON.stringify(newAction)),
        )
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
        IllaUndoRedoManager.pushToRedoStack(
          JSON.parse(JSON.stringify(newAction)),
        )
      } else {
        IllaUndoRedoManager.pushToUndoStack(
          JSON.parse(JSON.stringify(newAction)),
        )
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
        IllaUndoRedoManager.pushToRedoStack(
          JSON.parse(JSON.stringify(newAction)),
        )
      } else {
        IllaUndoRedoManager.pushToUndoStack(
          JSON.parse(JSON.stringify(newAction)),
        )
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
      }
      if (action.from === REDUX_ACTION_FROM.UNDO) {
        IllaUndoRedoManager.pushToRedoStack(
          JSON.parse(JSON.stringify(newAction)),
        )
      } else {
        IllaUndoRedoManager.pushToUndoStack(
          JSON.parse(JSON.stringify(newAction)),
        )
      }
    }
  }
}
