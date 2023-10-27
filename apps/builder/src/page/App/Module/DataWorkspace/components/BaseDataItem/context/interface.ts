import { ReactNode } from "react"

export interface Injected {
  handleUpdateExpandedWidget: (
    displayName: string,
    currentExpanded: boolean,
  ) => void
  expandedStatus: Map<string, boolean>
}

export interface Props {
  children: ReactNode
}
