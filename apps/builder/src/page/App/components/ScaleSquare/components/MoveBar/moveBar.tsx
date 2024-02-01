import { FC, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import {
  DragPointIcon,
  Trigger,
  WarningCircleIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import DocIcon from "@/assets/doc.svg?react"
import { SCROLL_CONTAINER_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import { CollaboratorsList } from "@/page/App/components/ScaleSquare/components/CollaboratorsList"
import {
  MIN_MOVE_BAR_WIDTH,
  MOVE_BAR_HEIGHT,
  MOVE_BAR_SVG_WIDTH,
} from "@/page/App/components/ScaleSquare/constant/moveBar"
import { useDisplayNameInMoveBarSelector } from "@/page/App/components/ScaleSquare/utils/useGetDisplayNameInMoveBar"
import { getIsLikeProductMode } from "@/redux/config/configSelector"
import {
  AVATAR_GAP,
  AVATAR_WIDTH,
  MIN_DISABLE_MARGIN_WIDTH,
} from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import { MoveBarProps } from "./interface"
import {
  applyMoveBarWrapperStyle,
  displayNameContainerStyle,
  docIconStyle,
  docTipsWrapperStyle,
  dragPointIconWrapperStyle,
  moveBarDisplayNameStyle,
  warningStyle,
} from "./style"

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
  const { displayName, isError, maxWidth, widgetTop, widgetType, userList } =
    props

  const [currentState, setCurrentState] = useState<string>("right")
  const [containerRef, bounds] = useMeasure()
  const containerWidthRef = useRef(0)
  const isLikeProductionMode = useSelector(getIsLikeProductMode)
  const displayNameInMoveBar = useDisplayNameInMoveBarSelector(
    displayName,
    widgetType,
  )

  useEffect(() => {
    if (bounds.width > containerWidthRef.current) {
      currentState !== "right" && setCurrentState("right")
    }
    if (bounds.width < containerWidthRef.current) {
      currentState !== "left" && setCurrentState("left")
    }
    containerWidthRef.current = bounds.width
  }, [bounds.width, currentState])

  const topPosition =
    widgetTop + SCROLL_CONTAINER_PADDING >= MOVE_BAR_HEIGHT
      ? -MOVE_BAR_HEIGHT
      : 0

  const minWidth =
    userList.length >= 3
      ? MIN_MOVE_BAR_WIDTH
      : userList.length * AVATAR_WIDTH +
          (userList.length || 1 - 1) * AVATAR_GAP +
          MOVE_BAR_SVG_WIDTH || MOVE_BAR_SVG_WIDTH

  const disableMargin =
    bounds.width <=
    (userList.length >= 2 ? MIN_MOVE_BAR_WIDTH : MIN_DISABLE_MARGIN_WIDTH)

  return (
    <div
      css={applyMoveBarWrapperStyle(
        maxWidth,
        minWidth,
        isError,
        isLikeProductionMode,
        topPosition,
      )}
      id="moveBar"
      ref={containerRef}
    >
      <>
        <div css={displayNameContainerStyle}>
          <DragPointIcon css={dragPointIconWrapperStyle} />
          <span css={moveBarDisplayNameStyle}>{displayNameInMoveBar}</span>
        </div>
        <CollaboratorsList
          users={userList}
          disableMargin={disableMargin}
          currentState={currentState}
          containerWidth={bounds.width}
        />
      </>
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
