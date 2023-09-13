import { Agent } from "@illa-public/market-agent"
import { CSSProperties } from "react"

export interface TeamListItemProps {
  item: Agent
  onSelected: (item: Agent) => void
  style?: CSSProperties
}
