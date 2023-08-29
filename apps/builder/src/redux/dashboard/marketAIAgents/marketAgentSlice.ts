import { createSlice } from "@reduxjs/toolkit"
import {
  addMarketAgentListReducer,
  updateMarketAgentListReducer,
} from "@/redux/dashboard/marketAIAgents/marketAgentReducer"
import { MarketAgentInitial } from "@/redux/dashboard/marketAIAgents/marketAgentState"

const marketAgentSlice = createSlice({
  name: "marketAgents",
  initialState: MarketAgentInitial,
  reducers: {
    updateMarketAgentListReducer,
    addMarketAgentListReducer,
  },
})

export const dashboardMarketAgentActions = marketAgentSlice.actions
export default marketAgentSlice.reducer