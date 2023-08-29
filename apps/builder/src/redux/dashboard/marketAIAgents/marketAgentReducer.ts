import { MarketAiAgent } from "@illa-public/market-agent/MarketAgentCard/interface"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { DashboardMarketAgentState } from "@/redux/dashboard/marketAIAgents/marketAgentState"


export const updateMarketAgentListReducer: CaseReducer<
  DashboardMarketAgentState,
  PayloadAction<MarketAiAgent[]>
> = (state, action) => {
  state.list = action.payload
}

export const addMarketAgentListReducer: CaseReducer<
  DashboardMarketAgentState,
  PayloadAction<MarketAiAgent[]>
> = (state, action) => {
  state.list.push(...action.payload)
}