import { currentUserReducer, teamReducer } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
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
import dragShadowReducer from "@/redux/currentApp/dragShadow/dragShadowSlice"
import componentsReducer from "@/redux/currentApp/editor/components/componentsSlice"
import executionReducer from "@/redux/currentApp/executionTree/executionSlice"
import currentAppHistoryReducer from "@/redux/currentAppHistory/currentAppHistorySlice"
import dashboardAppReducer from "@/redux/dashboard/apps/dashboardAppSlice"
import dashboardTeamAIAgentReducer from "@/redux/dashboard/teamAIAgents/dashboardTeamAIAgentSlice"
import guideReducer from "@/redux/guide/guideSlice"
import resourceReducer from "@/redux/resource/resourceSlice"
import { mixpanelReport } from "./middleware/mixpanelReport"
import { UndoRedo } from "./middleware/undoRedo"
import cursorSlice from "./redux/currentApp/cursor/cursorSlice"

const listenerMiddleware = createListenerMiddleware()

const editorReducer = combineReducers({
  components: componentsReducer,
})

const appReducer = combineReducers({
  editor: editorReducer,
  action: actionReducer,
  appInfo: appInfoReducer,
  collaborators: collaboratorsReducer,
  execution: executionReducer,
  cursor: cursorSlice,
  dragShadow: dragShadowReducer,
})

const dashboardReducer = combineReducers({
  dashboardApps: dashboardAppReducer,
  dashboardTeamAIAgents: dashboardTeamAIAgentReducer,
})

const middlewares = [reduxAsync, UndoRedo, guideAsync]

if (import.meta.env.ILLA_APP_ENV === "development") {
  middlewares.push(logger)
}

if (isCloudVersion) {
  middlewares.unshift(mixpanelReport)
}

const store = configureStore({
  reducer: {
    config: configReducer,
    currentApp: appReducer,
    dashboard: dashboardReducer,
    currentAppHistory: currentAppHistoryReducer,
    builderInfo: builderInfoReducer,
    resource: resourceReducer,
    guide: guideReducer,
    currentUser: currentUserReducer,
    team: teamReducer,
  },
  devTools: import.meta.env.ILLA_APP_ENV === "development",
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
