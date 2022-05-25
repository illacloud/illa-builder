import { configureStore, combineReducers } from "@reduxjs/toolkit"
import logger from "redux-logger"
import resourceReducer from "@/redux/action/resource/resourceSlice"
import actionListReducer from "@/redux/action/actionList/actionListSlice"
import dashboardReducer from "@/redux/dashboard/dashboardSlice"
import demoReducer from "@/redux/editor/demoReducer"
import modeReducer from "@/redux/editor/mode/modeReducer"
import dragReducer from "@/redux/editor/dragReducer"
import dslReducer from "@/redux/editor/dsl"
import widgetStatesReducer from "@/redux/editor/widgetStates/widgetStatesSlice"

const editor = combineReducers({
  demo: demoReducer,
  mode: modeReducer,
  drag: dragReducer,
  dsl: dslReducer,
  widgetStates: widgetStatesReducer,
})

const actionReducer = combineReducers({
  actionList: actionListReducer,
  resource: resourceReducer,
})

const store = configureStore({
  reducer: {
    editor,
    action: actionReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store

export type RootState = ReturnType<typeof store.getState>
