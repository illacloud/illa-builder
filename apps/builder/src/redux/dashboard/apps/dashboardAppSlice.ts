import { createSlice } from "@reduxjs/toolkit"
import {
  addDashboardAppReducer,
  removeDashboardAppReducer,
  renameDashboardAppReducer,
  updateDashboardAppListReducer,
} from "@/redux/dashboard/apps/dashboardAppReducer"
import { DashboardAppsInitialState } from "@/redux/dashboard/apps/dashboardAppState"

const dashboardAppSlice = createSlice({
  name: "apps",
  initialState: DashboardAppsInitialState,
  reducers: {
    addDashboardAppReducer,
    removeDashboardAppReducer,
    renameDashboardAppReducer,
    updateDashboardAppListReducer,
  },
})

export const dashboardAppActions = dashboardAppSlice.actions
export default dashboardAppSlice.reducer
