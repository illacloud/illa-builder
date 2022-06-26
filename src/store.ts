import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  TypedStartListening,
  ListenerEffectAPI,
} from "@reduxjs/toolkit"
import logger from "redux-logger"
import resourceReducer from "@/redux/resource/resourceSlice"
import actionReducer from "@/redux/currentApp/action/actionSlice"
import dashboardResourceReducer from "@/redux/dashboard/resources/dashboardResourceSlice"
import dashboardAppReducer from "@/redux/dashboard/apps/dashboardAppSlice"
import currentUserReducer from "@/redux/currentUser/currentUserSlice"
import liveFamilyReducer from "@/redux/liveFamily/liveFamilySlice"
import appInfoReducer from "@/redux/currentApp/appInfo/appInfoSlice"
import builderInfoReducer from "@/redux/builderInfo/builderInfoSlice"
import configReducer from "@/redux/currentApp/config/configSlice"
import componentsReducer from "@/redux/currentApp/editor/components/componentsSlice"
import dragShadowReducer from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import dottedLineSquareReducer from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import executionReducer from "@/redux/currentApp/executionTree/execution/executionSlice"
import dependenciesReducer from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"

const listenerMiddleware = createListenerMiddleware()

const executionTreeReducer = combineReducers({
  execution: executionReducer,
  dependencies: dependenciesReducer,
})

const editorReducer = combineReducers({
  components: componentsReducer,
  dragShadow: dragShadowReducer,
  dottedLineSquare: dottedLineSquareReducer,
})

const appReducer = combineReducers({
  // not sync
  config: configReducer,
  // sync
  editor: editorReducer,
  action: actionReducer,
  resource: resourceReducer,
  appInfo: appInfoReducer,
  executionTree: executionTreeReducer,
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger)
      .prepend(listenerMiddleware.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening
