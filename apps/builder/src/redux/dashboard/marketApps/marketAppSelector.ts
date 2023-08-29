import { RootState } from "@/store"

export const getDashboardMarketAppsList = (state: RootState) => {
  return state.dashboard.dashboardMarketApps.list
}
