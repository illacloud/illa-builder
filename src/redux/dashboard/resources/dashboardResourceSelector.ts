import { RootState } from "@/store"

export const getDashboardResources = (state: RootState) => {
  return state.dashboard.dashboardResources.list
}
