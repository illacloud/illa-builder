import { ComponentNode } from "@/redux/currentApp/components/componentsState"

export interface IRenderChildrenCanvasProps {
  currentComponentNode: ComponentNode
  columnNumber: number
  handleUpdateHeight: (height: number) => void
  canResizeCanvas?: boolean
  containerPadding?: string
}
