import { createSlice } from "@reduxjs/toolkit"
import {
  updateAppContributeReducer,
  updateAppDeployedReducer,
  updateAppInfoReducer,
  updateAppPublicReducer,
} from "@/redux/currentApp/appInfo/appInfoReducer"
import { DashboardAppInitialState } from "./appInfoState"

const appInfoSlice = createSlice({
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
