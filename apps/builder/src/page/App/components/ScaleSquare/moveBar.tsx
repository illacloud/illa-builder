import { FC, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import useMeasure from "react-use-measure"
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
  displayNameContainerStyle,
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
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"

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

  const componentsAttachedUsers = useSelector(
    getComponentAttachUsers,
  ) as Record<string, CollaboratorsInfo[]>
  const attachedUserList = componentsAttachedUsers[displayName] || []
  const testLists = [
    ...attachedUserList,
    ...attachedUserList,
    ...attachedUserList,
    ...attachedUserList,
    ...attachedUserList,
  ]

  const { t } = useTranslation()
  const isFreezeCanvas = useSelector(getFreezeState)
  const [currentState, setCurrentState] = useState<string>("right")
  const [containerRef, bounds] = useMeasure()
  const containerWidthRef = useRef(0)

  useEffect(() => {
    if (bounds.width >= containerWidthRef.current) {
      currentState !== "right" && setCurrentState("right")
    } else {
      currentState !== "left" && setCurrentState("left")
    }
    containerWidthRef.current = bounds.width
  }, [bounds.width, currentState])

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

  const minWidth =
    testLists.length >= 3
      ? 48
      : testLists.length * 14 + (testLists.length || 1 - 1) * 4 + 12 || 12

  return (
    <div
      css={applyMoveBarWrapperStyle(
        maxWidth,
        minWidth,
        isError,
        selected,
        isEditor,
        position,
        isFreezeCanvas,
      )}
      id="moveBar"
      ref={containerRef}
    >
      {isFreezeCanvas ? (
        <>
          <LockIcon css={freezeIconStyle} />
          <span css={freezeTipsStyle}>{t("freeze_collision")}</span>
        </>
      ) : (
        <>
          <div css={displayNameContainerStyle}>
            <DragIcon css={dragPointIconWrapperStyle} />
            <span css={moveBarDisplayNameStyle}>{displayName}</span>
          </div>
          {selected && (
            <CollaboratorsList
              users={testLists}
              disableMargin={bounds.width <= (testLists.length >= 2 ? 52 : 26)}
              currentState={currentState}
              containerWidth={bounds.width}
            />
          )}
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
