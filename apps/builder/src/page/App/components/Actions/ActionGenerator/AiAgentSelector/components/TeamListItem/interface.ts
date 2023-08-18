import { CSSProperties } from "react"
import { Agent } from "@/redux/aiAgent/aiAgentState"

export interface TeamListItemProps {
  item: Agent
  onSelected: (item: Agent) => void
  style?: CSSProperties
}
