import {
  ListenerEffectAPI,
  TypedStartListening,
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit"
import { logger } from "redux-logger"
import { guideAsync } from "@/middleware/guideAsync"
import { reduxAsync } from "@/middleware/reduxAsync"
import builderInfoReducer from "@/redux/builderInfo/builderInfoSlice"
import configReducer from "@/redux/config/configSlice"
import actionReducer from "@/redux/currentApp/action/actionSlice"
import appInfoReducer from "@/redux/currentApp/appInfo/appInfoSlice"
import collaboratorsReducer from "@/redux/currentApp/collaborators/collaboratorsSlice"
import componentsReducer from "@/redux/currentApp/editor/components/componentsSlice"
import dottedLineSquareReducer from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import dragShadowReducer from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import executionReducer from "@/redux/currentApp/executionTree/executionSlice"
import currentUserReducer from "@/redux/currentUser/currentUserSlice"
import dashboardAppReducer from "@/redux/dashboard/apps/dashboardAppSlice"
import guideReducer from "@/redux/guide/guideSlice"
import liveFamilyReducer from "@/redux/liveFamily/liveFamilySlice"
import resourceReducer from "@/redux/resource/resourceSlice"
import teamReducer from "@/redux/team/teamSlice"

const listenerMiddleware = createListenerMiddleware()

const editorReducer = combineReducers({
  components: componentsReducer,
  dragShadow: dragShadowReducer,
  dottedLineSquare: dottedLineSquareReducer,
})

const appReducer = combineReducers({
  editor: editorReducer,
  action: actionReducer,
  appInfo: appInfoReducer,
  collaborators: collaboratorsReducer,
  execution: executionReducer,
})

const dashboardReducer = combineReducers({
  dashboardApps: dashboardAppReducer,
})

const middlewares = [reduxAsync, guideAsync]

if (import.meta.env.DEV) {
  middlewares.push(logger)
}
const store = configureStore({
  reducer: {
    config: configReducer,
    currentApp: appReducer,
    dashboard: dashboardReducer,
    currentUser: currentUserReducer,
    liveFamily: liveFamilyReducer,
    builderInfo: builderInfoReducer,
    resource: resourceReducer,
    team: teamReducer,
    guide: guideReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["execution/setExecutionResultReducer"],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(middlewares),
})

export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening
