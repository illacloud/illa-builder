import { createSlice } from "@reduxjs/toolkit"
import {
  addMarketAppListReducer,
  updateMarketAppListReducer,
} from "@/redux/dashboard/marketApps/marketAppReducer"
import { MarketAppInitial } from "@/redux/dashboard/marketApps/marketAppState"


const marketAppSlice = createSlice({
  name: "marketApps",
  initialState: MarketAppInitial,
  reducers: {
    updateMarketAppListReducer,
    addMarketAppListReducer,
  },
})

export const dashboardMarketAppActions = marketAppSlice.actions
export default marketAppSlice.reducer