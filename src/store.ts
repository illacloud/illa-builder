import { combineReducers, configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import resourceReducer from "@/redux/action/resource/resourceSlice"
import actionListReducer from "@/redux/action/actionList/actionListSlice"
import modeReducer from "@/redux/editor/mode/modeSlice"
import dslReducer from "@/redux/editor/dsl/dslSlice"
import widgetStatesReducer from "@/redux/editor/widgetStates/widgetStatesSlice"

import appSlice from "@/redux/dashboard/apps/appSlice"
import resourceSlice from "@/redux/dashboard/resources/resourceSlice"

const editorReducer = combineReducers({
  mode: modeReducer,
  dsl: dslReducer,
  widgetStates: widgetStatesReducer,
})

const actionReducer = combineReducers({
  actionList: actionListReducer,
  resource: resourceReducer,
})

const dashboardReducer = combineReducers({
  resources: resourceSlice.reducer,
  apps: appSlice.reducer,
})

const store = configureStore({
  reducer: {
    editor: editorReducer,
    action: actionReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
export type RootState = ReturnType<typeof store.getState>
