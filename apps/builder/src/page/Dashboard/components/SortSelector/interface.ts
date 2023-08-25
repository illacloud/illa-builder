import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent/service"

export interface SortSelectorProps {
  onSortChange: (sort: MARKET_AGENT_SORTED_OPTIONS) => void
  sort: MARKET_AGENT_SORTED_OPTIONS
}
