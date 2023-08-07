import { Agent } from "@/redux/aiAgent/aiAgentState"

export interface MarketAgentListProps {
  onSelect: (item: Agent) => void
  search: string
}
