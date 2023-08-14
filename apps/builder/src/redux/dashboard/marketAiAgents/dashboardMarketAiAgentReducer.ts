import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { DashboardMarketAiAgentState } from "@/redux/dashboard/marketAiAgents/dashboardMarketAiAgentState"
import { MarketAgentList } from "@/services/marketPlace"

export const initMarketAiAgentListReducer: CaseReducer<
  DashboardMarketAiAgentState,
  PayloadAction<MarketAgentList>
> = (state, action) => {
  return action.payload
}

export const updateMarketAiAgentListReducer: CaseReducer<
  DashboardMarketAiAgentState,
  PayloadAction<MarketAgentList>
> = (state, action) => {
  if (!state) {
    return action.payload
  }
  if (action.payload.pageIndex > 1) {
    return {
      ...action.payload,
      products: state.products.concat(action.payload.products),
    }
  } else {
    return action.payload
  }
}

export const modifyMarketAiAgentReducer: CaseReducer<
  DashboardMarketAiAgentState,
  PayloadAction<Partial<MarketAgentList>>
> = (state, action) => {
  return {
    ...state,
    ...action.payload,
  }
}
