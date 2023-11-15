import { Agent } from "@illa-public/market-agent"

export interface AgentPanelSectionProps {
  agents: Agent[]
  changeLoading: (isLoading: boolean) => void
  title: string
  hasMore: boolean
}
