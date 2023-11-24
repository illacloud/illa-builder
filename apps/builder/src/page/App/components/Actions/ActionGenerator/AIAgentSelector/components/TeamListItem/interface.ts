import { Agent } from "@illa-public/public-types"
import { CSSProperties } from "react"

export interface TeamListItemProps {
  item: Agent
  onSelected: (item: Agent) => void
  style?: CSSProperties
}
