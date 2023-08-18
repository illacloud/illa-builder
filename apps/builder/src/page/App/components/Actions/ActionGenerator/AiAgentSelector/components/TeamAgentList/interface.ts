import { CSSProperties } from "react"
import { Agent } from "@/redux/aiAgent/aiAgentState"

export interface TeamAgentListComponentProps {
  data: Agent[]
  index: number
  isScrolling?: boolean
  style: CSSProperties
}

export interface TeamAgentListProps {
  onSelect: (item: Agent) => void
  search: string
}
