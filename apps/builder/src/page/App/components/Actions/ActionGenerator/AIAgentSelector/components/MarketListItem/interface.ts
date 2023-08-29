import {
  Agent,
  MarketAIAgent,
} from "@illa-public/market-agent/MarketAgentCard/interface"
import { CSSProperties } from "react"

export interface MarketListItemProps {
  item: MarketAIAgent
  onSelected: (item: Agent) => void
  style?: CSSProperties
}
