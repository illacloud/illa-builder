import { FC, memo } from "react"
import { useDragLayer } from "react-dnd"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { getDragPreview } from "@/page/App/components/DotPanel/utils/getDragShadow"
import { DragInfo } from "@/page/App/components/ScaleSquare/components/DragContainer/interface"
import { DragCollectedProps, DragPreviewProps } from "./interface"
import { dragPreviewStyle } from "./style"

const DragPreview: FC<DragPreviewProps> = (props) => {
  const { unitW, parentNodeDisplayName, columnNumber } = props

  const collectedProps = useDragLayer<DragCollectedProps, DragInfo>(
    (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
        clientOffset: monitor.getClientOffset(),
        differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
        initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
      }
    },
  )

  const mousePositionInfo = getDragPreview(
    parentNodeDisplayName,
    unitW,
    collectedProps,
    columnNumber,
  )

  if (!mousePositionInfo) return null
  const { shape, canDrop } = mousePositionInfo
  return (
    <div
      css={dragPreviewStyle(
        shape.y * UNIT_HEIGHT,
        shape.x * unitW,
        shape.w * unitW,
        shape.previewH * UNIT_HEIGHT,
        canDrop,
      )}
    />
  )
}

export default memo(DragPreview)
