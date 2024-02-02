import { currentUserReducer, teamReducer } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import {
  ListenerEffectAPI,
  TypedStartListening,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit"
import { guideAsync } from "@/middleware/guideAsync"
import { reduxAsync } from "@/middleware/reduxAsync"
import aiAgent from "@/redux/aiAgent/dashboardTeamAIAgentSlice"
import builderInfoReducer from "@/redux/builderInfo/builderInfoSlice"
import configReducer from "@/redux/config/configSlice"
import currentAppHistoryReducer from "@/redux/currentAppHistory/currentAppHistorySlice"
import guideReducer from "@/redux/guide/guideSlice"
import resourceReducer from "@/redux/resource/resourceSlice"
import { mixpanelReport } from "./middleware/mixpanelReport"
import { UndoRedo } from "./middleware/undoRedo"
import { appReducer } from "./redux/currentApp/slice"

const listenerMiddleware = createListenerMiddleware()

const middlewares = [reduxAsync, UndoRedo, guideAsync]

if (isCloudVersion) {
  middlewares.unshift(mixpanelReport)
}

const store = configureStore({
  reducer: {
    config: configReducer,
    currentApp: appReducer,
    currentAppHistory: currentAppHistoryReducer,
    builderInfo: builderInfoReducer,
    resource: resourceReducer,
    guide: guideReducer,
    currentUser: currentUserReducer,
    team: teamReducer,
    aiAgent: aiAgent,
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
