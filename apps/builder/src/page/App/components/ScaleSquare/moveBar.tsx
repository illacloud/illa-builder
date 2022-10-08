import { FC, useMemo } from "react"
import {
  applyMoveBarWrapperStyle,
  dragPointIconWrapperStyle,
  freezyIconStyle,
  freezyTipsStyle,
  MOVE_BAR_HEIGHT,
  moveBarDisplayNameStyle,
  warningStyle,
} from "@/page/App/components/ScaleSquare/style"
import { DragIcon, LockIcon, WarningCircleIcon } from "@illa-design/icon"
import {
  MoveBarPositionShape,
  MoveBarProps,
} from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { useSelector } from "react-redux"
import { getFreezyState } from "@/redux/config/configSelector"
import { useTranslation } from "react-i18next"

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

  const { t } = useTranslation()

  const isFreezyCanvas = useSelector(getFreezyState)

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
        isFreezyCanvas,
      )}
      id="moveBar"
    >
      {isFreezyCanvas ? (
        <>
          <LockIcon css={freezyIconStyle} />
          <span css={freezyTipsStyle}>{t("freeze_collision")}</span>
        </>
      ) : (
        <>
          <DragIcon css={dragPointIconWrapperStyle} />
          <span css={moveBarDisplayNameStyle}>{displayName}</span>
        </>
      )}
      {isError && (
        <WarningCircleIcon
          color={globalColor(`--${illaPrefix}-white-05`)}
          css={warningStyle}
        />
      )}
    </div>
  )
}
