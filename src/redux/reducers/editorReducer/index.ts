import { combineReducers } from "redux"
import undoable, { StateWithHistory } from "redux-undo"
import demoReducer, { DemoState } from "./demoReducer"
import dragReducer, { DragState } from "./dragReducer"

export interface EditorState {
  demo: DemoState
  drag: DragState
}

const editorReducer = combineReducers({
  demo: demoReducer,
  drag: dragReducer,
})

export type EditorReduxState = StateWithHistory<EditorState>
export default undoable(editorReducer)
