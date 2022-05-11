import { combineReducers } from "redux"
import undoable from "redux-undo"
import demoReducer from "./demoReducer"
import dragReducer from "./dragReducer"

const editorReducer = combineReducers({
  demo: demoReducer,
  drag: dragReducer,
})

export default undoable(editorReducer)
