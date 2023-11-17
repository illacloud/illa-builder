import { AppInfoShape } from "@illa-public/public-types"
import { createSlice } from "@reduxjs/toolkit"
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice"
import {
  updateAppContributeReducer,
  updateAppDeployedReducer,
  updateAppInfoReducer,
  updateAppPublicReducer,
} from "@/redux/currentApp/appInfo/appInfoReducer"
import { DashboardAppInitialState } from "./appInfoState"

const appInfoSlice = createSlice<
  AppInfoShape,
  SliceCaseReducers<AppInfoShape>,
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
