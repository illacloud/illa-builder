import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"

export const updateAppInfoReducer: CaseReducer<
  DashboardApp,
  PayloadAction<DashboardApp>
> = (state, action) => {
  return action.payload
}

export const updateAppNameReducer: CaseReducer<
  DashboardApp,
  PayloadAction<DashboardApp>
> = (state, action) => {
  return action.payload
}
