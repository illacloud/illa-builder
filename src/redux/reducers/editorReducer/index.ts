import { combineReducers } from "redux"
import undoable from "redux-undo"
import demoReducer from "./demoReducer"
import modeReducer from "./modeReducer"
import dragReducer from "./dragReducer"
import dslReducer from "./dslReducer"
import widgetStatesReducer from "./widgetStatesReducer"

const editorReducer = combineReducers({
  demo: demoReducer,
  mode: modeReducer,
  drag: dragReducer,
  dslState: dslReducer,
  widgetStates: widgetStatesReducer,
})

export default undoable(editorReducer)
