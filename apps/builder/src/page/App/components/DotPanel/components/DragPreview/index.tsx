import { FC, memo } from "react"
import { useDragLayer } from "react-dnd"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { getDragPreview } from "@/page/App/components/DotPanel/utils/getDragShadow"
import { DragInfo } from "@/page/App/components/ScaleSquare/components/DragContainer/interface"
import { DragCollectedProps, DragPreviewProps } from "./interface"
import { dragPreviewStyle } from "./style"

const DragPreview: FC<DragPreviewProps> = (props) => {
  const {
    containerLeft,
    containerTop,
    unitW,
    containerScrollTop,
    parentNodeDisplayName,
    columnNumber,
  } = props

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
    {
      containerTop,
      containerLeft,
      containerScrollTop,
    },
    columnNumber,
  )

  if (!mousePositionInfo) return null
  return (
    <div
      css={dragPreviewStyle(
        mousePositionInfo.y * UNIT_HEIGHT,
        mousePositionInfo.x * unitW,
        mousePositionInfo.w * unitW,
        mousePositionInfo.previewH * UNIT_HEIGHT,
      )}
    />
  )
}

export default memo(DragPreview)
