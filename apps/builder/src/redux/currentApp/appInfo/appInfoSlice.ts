import { createSlice } from "@reduxjs/toolkit"
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice"
import {
  updateAppContributeReducer,
  updateAppDeployedReducer,
  updateAppInfoReducer,
  updateAppPublicReducer,
} from "@/redux/currentApp/appInfo/appInfoReducer"
import {
  DashboardApp,
  DashboardAppInitialState,
} from "@/redux/dashboard/apps/dashboardAppState"

const appInfoSlice = createSlice<
  DashboardApp,
  SliceCaseReducers<DashboardApp>,
  "appInfo"
>({
  name: "appInfo",
  initialState: DashboardAppInitialState,
  reducers: {
    updateAppInfoReducer,
    updateAppContributeReducer,
    updateAppPublicReducer,
    updateAppDeployedReducer,
  },
})

export const appInfoActions = appInfoSlice.actions
export default appInfoSlice.reducer
