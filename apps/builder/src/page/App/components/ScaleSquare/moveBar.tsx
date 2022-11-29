import { FC, useMemo } from "react"
import {
  applyMoveBarWrapperStyle,
  dragPointIconWrapperStyle,
  freezeIconStyle,
  freezeTipsStyle,
  MOVE_BAR_HEIGHT,
  moveBarDisplayNameStyle,
  warningStyle,
} from "@/page/App/components/ScaleSquare/style"
import {
  DragIcon,
  LockIcon,
  WarningCircleIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import {
  MoveBarPositionShape,
  MoveBarProps,
} from "@/page/App/components/ScaleSquare/interface"
import { useSelector } from "react-redux"
import { getFreezeState } from "@/redux/config/configSelector"
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

  const isFreezeCanvas = useSelector(getFreezeState)

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
        isFreezeCanvas,
      )}
      id="moveBar"
    >
      {isFreezeCanvas ? (
        <>
          <LockIcon css={freezeIconStyle} />
          <span css={freezeTipsStyle}>{t("freeze_collision")}</span>
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
