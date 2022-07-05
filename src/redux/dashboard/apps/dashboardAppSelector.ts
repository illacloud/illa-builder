import { RootState } from "@/store"

export const getDashboardApps = (state: RootState) => {
  return state.dashboard.dashboardApps.list
}

export const getDashboardAppShareLink = (state: RootState) => {
  return state.dashboard.dashboardApps.url
}
