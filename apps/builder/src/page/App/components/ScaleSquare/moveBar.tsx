import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  DragIcon,
  LockIcon,
  WarningCircleIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { Trigger } from "@illa-design/react"
import { ReactComponent as DocIcon } from "@/assets/doc.svg"
import { CollaboratorsList } from "@/page/App/components/ScaleSquare/CollaboratorsList"
import {
  MoveBarPositionShape,
  MoveBarProps,
} from "@/page/App/components/ScaleSquare/interface"
import {
  MOVE_BAR_HEIGHT,
  applyMoveBarWrapperStyle,
  docIconStyle,
  docTipsWrapperStyle,
  dragPointIconWrapperStyle,
  freezeIconStyle,
  freezeTipsStyle,
  moveBarDisplayNameStyle,
  warningStyle,
} from "@/page/App/components/ScaleSquare/style"
import { getFreezeState } from "@/redux/config/configSelector"
import { getComponentAttachUsers } from "@/redux/currentApp/collaborators/collaboratorsSelector"

interface WidgetDocProps {
  widgetType: string
}

export const WidgetDoc: FC<WidgetDocProps> = (props) => {
  const { t } = useTranslation()
  switch (props.widgetType) {
    case "LIST_WIDGET":
      return (
        <Trigger
          content={
            <div css={docTipsWrapperStyle}>
              <span>{t("widget.list.doc1")}</span>
              <span>{t("widget.list.doc2")}</span>
            </div>
          }
          trigger="hover"
          colorScheme="white"
          position="right-start"
        >
          <span css={docIconStyle}>
            <DocIcon />
          </span>
        </Trigger>
      )

    default:
      return null
  }
}

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
    widgetType,
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
          {selected && <CollaboratorsList displayName={displayName} />}
        </>
      )}
      {isError && (
        <WarningCircleIcon
          color={globalColor(`--${illaPrefix}-white-05`)}
          css={warningStyle}
        />
      )}
      <WidgetDoc widgetType={widgetType} />
    </div>
  )
}
