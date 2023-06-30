import { AnyAction } from "@reduxjs/toolkit"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
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
        IllaUndoRedoManager.pushToRedoStack(newAction)
      } else {
        IllaUndoRedoManager.pushToUndoStack(newAction)
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
        IllaUndoRedoManager.pushToRedoStack(newAction)
      } else {
        IllaUndoRedoManager.pushToUndoStack(newAction)
      }
      break
    }
    case "resetComponentProps": {
    }
  }
}
