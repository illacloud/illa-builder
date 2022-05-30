import { RootState } from "@/store"

export const getDashboardResources = (state: RootState) => {
  state.dashboard.dashboardResources.list
}
