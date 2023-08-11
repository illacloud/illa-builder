import { createSlice } from "@reduxjs/toolkit"
import { updateMarketAiAgentListReducer } from "@/redux/dashboard/marketAiAgents/dashboardMarketAiAgentReducer"
import { MarketAiAgentInitial } from "@/redux/dashboard/marketAiAgents/dashboardMarketAiAgentState"

const dashboardMarketAiAgentSlice = createSlice({
  name: "marketAiAgents",
  initialState: MarketAiAgentInitial,
  reducers: {
    updateMarketAiAgentListReducer,
  },
})

export const dashboardMarketAiAgentActions = dashboardMarketAiAgentSlice.actions
export default dashboardMarketAiAgentSlice.reducer
