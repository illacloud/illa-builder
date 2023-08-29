import { ProductMarketApp } from "@illa-public/market-app/service/interface"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { DashboardMarketAppState } from "@/redux/dashboard/marketApps/marketAppState"


export const updateMarketAppListReducer: CaseReducer<
  DashboardMarketAppState,
  PayloadAction<ProductMarketApp[]>
> = (state, action) => {
  state.list = action.payload
}

export const addMarketAppListReducer: CaseReducer<
  DashboardMarketAppState,
  PayloadAction<ProductMarketApp[]>
> = (state, action) => {
  state.list.push(...action.payload)
}