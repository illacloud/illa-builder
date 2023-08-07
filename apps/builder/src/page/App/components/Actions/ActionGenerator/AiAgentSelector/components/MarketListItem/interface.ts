import { CSSProperties } from "react"
import { Agent, MarketAiAgent } from "@/redux/aiAgent/aiAgentState"

export interface MarketListItemProps {
  item: MarketAiAgent
  onSelected: (item: Agent) => void
  style?: CSSProperties
}
