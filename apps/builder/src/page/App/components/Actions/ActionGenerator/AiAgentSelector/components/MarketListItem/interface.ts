import {
  Agent,
  MarketAiAgent,
} from "@illa-public/market-agent/MarketAgentCard/interface"
import { CSSProperties } from "react"

export interface MarketListItemProps {
  item: MarketAiAgent
  onSelected: (item: Agent) => void
  style?: CSSProperties
}
