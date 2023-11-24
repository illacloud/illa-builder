import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent"
import { Agent } from "@illa-public/public-types"

export interface MarketAgentListProps {
  onSelect: (item: Agent) => void
  search: string
  sortBy: MARKET_AGENT_SORTED_OPTIONS
}
