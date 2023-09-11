import { Agent } from "@illa-public/market-agent"
import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent"

export interface MarketAgentListProps {
  onSelect: (item: Agent) => void
  search: string
  sortBy: MARKET_AGENT_SORTED_OPTIONS
}
