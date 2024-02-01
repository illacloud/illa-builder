import { getCurrentUserId } from "@illa-public/user-data"
import { get } from "lodash-es"
import { FC, memo, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  getHoveredComponents,
  getIsLikeProductMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import {
  getComponentAttachUsers,
  getTargetCurrentUsersExpendMe,
} from "@/redux/currentApp/collaborators/collaboratorsSelector"
import {
  getExecutionError,
  getExecutionResult,
  getResizingComponentIDs,
} from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { MoveBar } from "../MoveBar/moveBar"
import ResizeHandler from "./ResizeHandler"
import { ResizingContainerProps } from "./interface"
import { resizingContainerStyle, resizingPlaceholderStyle } from "./style"

const InnerResizingContainer: FC<ResizingContainerProps> = (props) => {
  const {
    children,
    minHeight,
    minWidth,
    width,
    height,
    displayName,
    widgetType,
    columnNumber,
    widgetTop,
  } = props
  const executionResult = useSelector(getExecutionResult)
  const currentUserID = useSelector(getCurrentUserId)
  const hasError = useSelector<RootState, boolean>((rootState) => {
    const errors = getExecutionError(rootState)
    const widgetErrors = errors[displayName] ?? {}
    return Object.keys(widgetErrors).length > 0
  })
  const resizingIDs = useSelector(getResizingComponentIDs)
  const isResizingCurrent = resizingIDs.includes(displayName)

  const currentWidgetProps = get(executionResult, displayName, {})

  const resizeDirection = useMemo(() => {
    const direction =
      currentWidgetProps.resizeDirection ??
      widgetBuilder(currentWidgetProps.$widgetType)?.config?.resizeDirection
    return direction || RESIZE_DIRECTION.ALL
  }, [currentWidgetProps.$widgetType, currentWidgetProps.resizeDirection])

  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  const hoveredComponents = useSelector(getHoveredComponents)
  const isMouseOver =
    hoveredComponents[hoveredComponents.length - 1] === displayName

  const isLikeProductionMode = useSelector(getIsLikeProductMode)
  const attachedUsers = useSelector(getComponentAttachUsers)

  const componentsAttachedUsers = useMemo(() => {
    return getTargetCurrentUsersExpendMe(
      attachedUsers,
      displayName,
      currentUserID,
    )
  }, [attachedUsers, currentUserID, displayName])
  return (
    <div
      css={resizingContainerStyle(
        {
          width,
          height,
          minWidth,
          minHeight,
        },
        {
          isLikeProductionMode,
          isSelected,
          hasEditors: componentsAttachedUsers.length > 0,
          isHover: isMouseOver,
          isDragging: false,
        },
      )}
    >
      {!isLikeProductionMode &&
        (isSelected || isMouseOver || componentsAttachedUsers.length > 0) && (
          <MoveBar
            isError={hasError}
            displayName={displayName}
            maxWidth={width}
            widgetTop={widgetTop}
            widgetType={widgetType}
            userList={componentsAttachedUsers}
            columnNumber={columnNumber}
          />
        )}
      {isResizingCurrent ? <div css={resizingPlaceholderStyle} /> : children}

      {isSelected && !isLikeProductionMode && (
        <ResizeHandler
          resizeDirection={resizeDirection}
          displayName={displayName}
        />
      )}
    </div>
  )
}

InnerResizingContainer.displayName = "NewResizingContainer"

export default memo(InnerResizingContainer)
