import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"
import { HTMLAttributes } from "react"

export interface TeamAgentCardProps extends HTMLAttributes<HTMLDivElement> {
  agentInfo: Agent
}
