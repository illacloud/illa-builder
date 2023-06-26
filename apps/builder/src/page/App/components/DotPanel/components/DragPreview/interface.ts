import { XYCoord } from "react-dnd"
import { DragInfo } from "@/page/App/components/ScaleSquare/components/DragContainer/interface"

export interface DragPreviewProps {
  containerTop: number
  containerLeft: number
  containerScrollTop: number
  unitW: number
  parentNodeDisplayName: string
  columnNumber: number
}

export interface DragCollectedProps {
  isDragging: boolean
  item: DragInfo
  clientOffset: XYCoord | null
  differenceFromInitialOffset: XYCoord | null
  initialClientOffset: XYCoord | null
  initialSourceClientOffset: XYCoord | null
}
