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

export const updateAppContributeReducer: CaseReducer<
  DashboardApp,
  PayloadAction<boolean>
> = (state, action) => {
  state.config.publishedToMarketplace = action.payload
}

export const updateAppPublicReducer: CaseReducer<
  DashboardApp,
  PayloadAction<boolean>
> = (state, action) => {
  state.config.public = action.payload
}

export const updateAppDeployedReducer: CaseReducer<
  DashboardApp,
  PayloadAction<boolean>
> = (state, action) => {
  state.deployed = action.payload
}
