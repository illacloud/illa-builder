import { combineReducers } from "@reduxjs/toolkit"
import actionReducer from "./action/actionSlice"
import appInfoReducer from "./appInfo/appInfoSlice"
import collaboratorsReducer from "./collaborators/collaboratorsSlice"
import componentsReducer from "./components/componentsSlice"
import cursorSlice from "./cursor/cursorSlice"
import dragShadowReducer from "./dragShadow/dragShadowSlice"
import executionReducer from "./executionTree/executionSlice"
import layoutInfoReducer from "./layoutInfo/layoutInfoSlice"

export const appReducer = combineReducers({
  components: componentsReducer,
  action: actionReducer,
  appInfo: appInfoReducer,
  collaborators: collaboratorsReducer,
  execution: executionReducer,
  cursor: cursorSlice,
  dragShadow: dragShadowReducer,
  layoutInfo: layoutInfoReducer,
})
