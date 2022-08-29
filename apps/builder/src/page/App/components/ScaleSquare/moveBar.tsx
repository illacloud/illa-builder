import { FC } from "react"
import {
  applyMoveBarWrapperStyle,
  dragPointIconWrapperStyle,
  moveBarDisplayNameStyle,
  warningStyle,
} from "@/page/App/components/ScaleSquare/style"
import { DragIcon, WarningCircleIcon } from "@illa-design/icon"
import { MoveBarProps } from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const MoveBar: FC<MoveBarProps> = (props) => {
  const { displayName, isError, maxWidth, selected, isEditor } = props
  return (
    <div
      css={applyMoveBarWrapperStyle(maxWidth, isError, selected, isEditor)}
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
