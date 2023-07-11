import { ReactNode } from "react"

export interface ResizingContainerProps {
  width: number
  height: number
  minWidth: number
  minHeight: number
  displayName: string
  children: ReactNode
}
