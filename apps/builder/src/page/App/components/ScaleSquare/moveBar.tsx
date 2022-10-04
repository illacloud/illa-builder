import { FC, useMemo } from "react"
import {
  applyMoveBarWrapperStyle,
  dragPointIconWrapperStyle,
  MOVE_BAR_HEIGHT,
  moveBarDisplayNameStyle,
  warningStyle,
} from "@/page/App/components/ScaleSquare/style"
import { DragIcon, WarningCircleIcon } from "@illa-design/icon"
import {
  MoveBarPositionShape,
  MoveBarProps,
} from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const MoveBar: FC<MoveBarProps> = (props) => {
  const {
    displayName,
    isError,
    maxWidth,
    selected,
    isEditor,
    widgetTop,
    widgetHeight,
    containerHeight,
    containerPadding,
  } = props
  const position: MoveBarPositionShape = useMemo(() => {
    if (widgetTop + containerPadding >= MOVE_BAR_HEIGHT) {
      return {
        direction: "top",
        position: -MOVE_BAR_HEIGHT,
      }
    }
    if (
      containerHeight - (widgetTop + widgetHeight) + containerPadding >=
      MOVE_BAR_HEIGHT
    ) {
      return {
        direction: "bottom",
        position: -MOVE_BAR_HEIGHT,
      }
    }
    return {
      direction: "top",
      position: 0,
    }
  }, [containerHeight, containerPadding, widgetHeight, widgetTop])
  return (
    <div
      css={applyMoveBarWrapperStyle(
        maxWidth,
        isError,
        selected,
        isEditor,
        position,
      )}
      id="moveBar"
    >
      <DragIcon css={dragPointIconWrapperStyle} />
      <span css={moveBarDisplayNameStyle}>{displayName}</span>
      {isError && (
        <WarningCircleIcon
          color={globalColor(`--${illaPrefix}-white-05`)}
          css={warningStyle}
        />
      )}
    </div>
  )
}
