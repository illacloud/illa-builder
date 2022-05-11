import { combineReducers } from "redux"

import countReducer from "./DataWorkspace/count"
import dslReducer from "./CanvasContainer/dslReducer"
import editorReducer from "./CanvasContainer/editorReducer"
import widgetStatesReducer  from "./CanvasContainer/widgetStatesReducer"

export const rootReducer = combineReducers({
  counter: countReducer,
  dslState: dslReducer,
  editor: editorReducer,
  widgetStates: widgetStatesReducer,
})
