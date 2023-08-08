import { Agent } from "@/redux/aiAgent/aiAgentState"
import { MARKET_AGENT_SORTED_OPTIONS } from "@/services/agent"

export interface MarketAgentListProps {
  onSelect: (item: Agent) => void
  search: string
  sortBy: MARKET_AGENT_SORTED_OPTIONS
}
