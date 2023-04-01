import { ReactNode } from "react"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface ResizingContainerProps {
  unitW: number
  unitH: number
  componentNode: ComponentNode
  childrenNode: ComponentNode[]
  children: ReactNode
  isDragging: boolean
}
