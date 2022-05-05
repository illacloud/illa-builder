import { combineReducers } from "redux"

import countReducer from "./DataWorkspace/count"
import dslReducer from "./CanvasContainer/dslReducer"

export const rootReducer = combineReducers({
  counter: countReducer,
  dslState: dslReducer,
})
