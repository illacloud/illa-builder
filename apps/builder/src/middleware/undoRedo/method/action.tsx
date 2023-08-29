import { AnyAction } from "@reduxjs/toolkit"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { RootState } from "@/store"
import IllaUndoRedoManager from "@/utils/undoRedo/undo"

export const actionsSnapShot = (
  reduxAction: string,
  action: AnyAction,
  _prevRootState: RootState,
  _nextRootState: RootState,
) => {
  switch (reduxAction) {
    case "addActionItemReducer": {
      const newAction = {
        type: "action/removeActionItemReducer",
        payload: {
          actionID: action.payload.actionID,
          displayName: action.payload.displayName,
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
    case "removeActionItemReducer": {
      const originAction = getActionList(_prevRootState).find(
        (item) => item.displayName === action.payload.displayName,
      )
      const newAction = {
        type: "action/addActionItemReducer",
        payload: originAction,
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
    case "updateActionItemReducer": {
      const originAction = getActionList(_prevRootState).find(
        (item) => item.displayName === action.payload.displayName,
      )
      const newAction = {
        type: "action/updateActionItemReducer",
        payload: originAction,
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
    case "updateActionDisplayNameReducer": {
      const newAction = {
        type: "action/updateActionDisplayNameReducer",
        payload: {
          newDisplayName: action.payload.oldDisplayName,
          oldDisplayName: action.payload.newDisplayName,
          actionID: action.payload.actionID,
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
