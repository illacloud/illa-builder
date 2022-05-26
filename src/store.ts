import {
  configureStore,
  combineReducers,
  ThunkAction,
  AnyAction,
} from "@reduxjs/toolkit"
import logger from "redux-logger"
import resourceReducer from "@/redux/action/resource/resourceSlice"
import actionListReducer from "@/redux/action/actionList/actionListSlice"
import dashboardReducer from "@/redux/dashboard/dashboardSlice"
import modeReducer from "@/redux/editor/mode/modeSlice"
import dslReducer from "@/redux/editor/dsl/dslSlice"
import widgetStatesReducer from "@/redux/editor/widgetStates/widgetStatesSlice"
import { useDispatch } from "react-redux"

const editor = combineReducers({
  mode: modeReducer,
  dsl: dslReducer,
  widgetStates: widgetStatesReducer,
})

const action = combineReducers({
  actionList: actionListReducer,
  resource: resourceReducer,
})

const store = configureStore({
  reducer: {
    editor,
    action,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
