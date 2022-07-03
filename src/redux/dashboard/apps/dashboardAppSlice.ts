import { createSlice } from "@reduxjs/toolkit"
import { DashboardAppsInitialState } from "@/redux/dashboard/apps/dashboardAppState"
import {
  addDashboardAppReducer,
  removeDashboardAppReducer,
  renameDashboardAppReducer,
  updateDashboardAppListReducer,
  getDashboardAppShareLink,
} from "@/redux/dashboard/apps/dashboardAppReducer"

const dashboardAppSlice = createSlice({
  name: "apps",
  initialState: DashboardAppsInitialState,
  reducers: {
    addDashboardAppReducer,
    removeDashboardAppReducer,
    renameDashboardAppReducer,
    updateDashboardAppListReducer,
    getDashboardAppShareLink,
  },
})

export const dashboardAppActions = dashboardAppSlice.actions
export default dashboardAppSlice.reducer
