import { ReactNode } from "react"

export interface WrapperContainerProps {
  displayName: string
  parentNodeDisplayName: string
  widgetHeight: number
  children: ReactNode
}
