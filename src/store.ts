import { configureStore, combineReducers } from "@reduxjs/toolkit"
import logger from "redux-logger"
import resourceReducer from "@/redux/action/resource/resourceSlice"
import actionListReducer from "@/redux/action/actionList/actionListSlice"
import dashboardReducer from "@/redux/dashboard/dashboardSlice"
import modeReducer from "@/redux/editor/mode/modeSlice"
import dslReducer from "@/redux/editor/dsl/dslSlice"
import widgetStatesReducer from "@/redux/editor/widgetStates/widgetStatesSlice"
import panelConfigReducer from "@/redux/editor/panelConfig/panelConfigSlice";

const editor = combineReducers({
  mode: modeReducer,
  dsl: dslReducer,
  widgetStates: widgetStatesReducer,
  panelConfig: panelConfigReducer,
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
