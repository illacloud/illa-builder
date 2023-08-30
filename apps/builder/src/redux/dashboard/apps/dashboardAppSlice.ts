import { createSlice } from "@reduxjs/toolkit"
import {
  addDashboardAppReducer,
  removeDashboardAppReducer,
  updateDashboardAppContributeReducer,
  updateDashboardAppDeployedReducer,
  updateDashboardAppListReducer,
  updateDashboardAppPublicReducer,
  updateDashboardAppReducer,
} from "@/redux/dashboard/apps/dashboardAppReducer"
import { DashboardAppsInitialState } from "@/redux/dashboard/apps/dashboardAppState"

const dashboardAppSlice = createSlice({
  name: "apps",
  initialState: DashboardAppsInitialState,
  reducers: {
    addDashboardAppReducer,
    updateDashboardAppDeployedReducer,
    removeDashboardAppReducer,
    updateDashboardAppReducer,
    updateDashboardAppListReducer,
    updateDashboardAppPublicReducer,
    updateDashboardAppContributeReducer,
  },
})

export const dashboardAppActions = dashboardAppSlice.actions
export default dashboardAppSlice.reducer
