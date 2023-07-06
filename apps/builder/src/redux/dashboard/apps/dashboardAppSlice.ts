import { createSlice } from "@reduxjs/toolkit"
import {
  addDashboardAppReducer,
  modifyConfigDashboardAppReducer,
  removeDashboardAppReducer,
  renameDashboardAppReducer,
  updateDashboardAppListReducer,
  updateDashboardAppReducer,
} from "@/redux/dashboard/apps/dashboardAppReducer"
import { DashboardAppsInitialState } from "@/redux/dashboard/apps/dashboardAppState"

const dashboardAppSlice = createSlice({
  name: "apps",
  initialState: DashboardAppsInitialState,
  reducers: {
    addDashboardAppReducer,
    removeDashboardAppReducer,
    renameDashboardAppReducer,
    updateDashboardAppReducer,
    updateDashboardAppListReducer,
    modifyConfigDashboardAppReducer,
  },
})

export const dashboardAppActions = dashboardAppSlice.actions
export default dashboardAppSlice.reducer
