import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"
import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent/service"

export interface MarketAgentListProps {
  onSelect: (item: Agent) => void
  search: string
  sortBy: MARKET_AGENT_SORTED_OPTIONS
}
