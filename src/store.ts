import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import actionReducer from "@/redux/action"
import dashboardReducer from "@/redux/dashboard/dashboardSlice"
import { combineReducers } from "redux"
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

const store = configureStore({
  reducer: {
    editor,
    action: actionReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
