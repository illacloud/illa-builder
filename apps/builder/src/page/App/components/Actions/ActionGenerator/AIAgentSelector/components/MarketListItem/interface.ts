import { MarketAIAgent } from "@illa-public/market-agent"
import { Agent } from "@illa-public/public-types"
import { CSSProperties } from "react"

export interface MarketListItemProps {
  item: MarketAIAgent
  onSelected: (item: Agent) => void
  style?: CSSProperties
}
