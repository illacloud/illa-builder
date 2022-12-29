import { ReactNode } from "react"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface BasicContainerProps {
  children?: ReactNode
  minHeight?: number
  componentNode: ComponentNode
  canResizeY?: boolean
  padding?: number
  safeRowNumber?: number
  addedRowNumber: number
  blockColumns?: number
}
