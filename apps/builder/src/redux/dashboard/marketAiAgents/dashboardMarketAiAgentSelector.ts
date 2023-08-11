import { createSelector } from "@reduxjs/toolkit"
import { MARKET_PAGE_SIZE } from "@/page/Dashboard/DashboardAiAgent/context"
import { RootState } from "@/store"

export const getDashboardMarketAiAgent = (state: RootState) => {
  return state.dashboard.dashboardMarketAiAgents
}

export const getDashboardMarketAiAgentList = (state: RootState) => {
  return state.dashboard.dashboardMarketAiAgents.products
}

export const getHasMoreMarketAgent = createSelector(
  [getDashboardMarketAiAgent],
  (data) => {
    return !(
      data.products.length < MARKET_PAGE_SIZE ||
      data.pageIndex * MARKET_PAGE_SIZE >= data.total
    )
  },
)
