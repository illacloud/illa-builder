import { ProductMarketApp } from "@illa-public/market-app/service/interface"

export interface DashboardMarketAppState {
  list: ProductMarketApp[]
}

export const MarketAppInitial: DashboardMarketAppState = {
  list: [],
}