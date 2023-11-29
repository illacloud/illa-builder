import { Agent } from "@illa-public/public-types"

export interface AgentPanelSectionProps {
  agents: Agent[]
  changeLoading: (isLoading: boolean) => void
  title: string
  hasMore: boolean
}
