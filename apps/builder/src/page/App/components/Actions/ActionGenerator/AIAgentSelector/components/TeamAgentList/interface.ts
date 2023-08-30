import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"

export interface TeamAgentListComponentProps {
  data: Agent[]
  index: number
  isScrolling?: boolean
}

export interface TeamAgentListProps {
  onSelect: (item: Agent) => void
  search: string
}
