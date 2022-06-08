import { combineReducers, configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import resourceReducer from "@/redux/currentApp/resource/resourceSlice"
import actionReducer from "@/redux/currentApp/action/actionSlice"
import inspectReducer from "@/redux/currentApp/editor/inspect/inspectSlice"
import dashboardResourceReducer from "@/redux/dashboard/resources/dashboardResourceSlice"
import dashboardAppReducer from "@/redux/dashboard/apps/dashboardAppSlice"
import currentUserReducer from "@/redux/currentUser/currentUserSlice"
import liveFamilyReducer from "@/redux/liveFamily/liveFamilySlice"
import appInfoReducer from "@/redux/currentApp/appInfo/appInfoSlice"
import builderInfoReducer from "@/redux/builderInfo/builderInfoSlice"

const editorReducer = combineReducers({
  inspect: inspectReducer,
})

const appReducer = combineReducers({
  editor: editorReducer,
  action: actionReducer,
  resource: resourceReducer,
  appInfo: appInfoReducer,
})

const dashboardReducer = combineReducers({
  dashboardResources: dashboardResourceReducer,
  dashboardApps: dashboardAppReducer,
})

const store = configureStore({
  reducer: {
    currentApp: appReducer,
    dashboard: dashboardReducer,
    currentUser: currentUserReducer,
    liveFamily: liveFamilyReducer,
    builderInfo: builderInfoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
export type RootState = ReturnType<typeof store.getState>
