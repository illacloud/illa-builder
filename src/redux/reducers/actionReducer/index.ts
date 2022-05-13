import { combineReducers } from "redux"
import queryListReducer, { QueryListState } from "./queryListReducer"
import editorReducer, { EditorState } from "./editorReducer"

export interface ActionState {
  editor: EditorState
  queryList: QueryListState
}

const actionReducer = combineReducers({
  editor: editorReducer,
  queryList: queryListReducer
})

export default actionReducer
