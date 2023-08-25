import { createSlice } from "@reduxjs/toolkit"
import { updateMarketAgentListReducer } from "@/redux/dashboard/marketAIAgents/marketAgentReducer"
import { MarketAgentInitial } from "@/redux/dashboard/marketAIAgents/marketAgentState"

const marketAgentSlice = createSlice({
  name: "marketAgents",
  initialState: MarketAgentInitial,
  reducers: {
    updateMarketAgentListReducer,
  },
})

export const dashboardMarketAgentActions = marketAgentSlice.actions
export default marketAgentSlice.reducer
