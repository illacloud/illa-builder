import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface IRenderChildrenCanvasProps {
  currentComponentNode: ComponentNode
  columnNumber: number
  handleUpdateHeight: (height: number) => void
  canResizeCanvas?: boolean
}
