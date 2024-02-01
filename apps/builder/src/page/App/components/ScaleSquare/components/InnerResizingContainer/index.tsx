import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { getCurrentUserId } from "@illa-public/user-data"
import { klona } from "klona/json"
import { get } from "lodash-es"
import { FC, MouseEvent, memo, useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getHoveredComponents,
  getIsILLAEditMode,
  getIsLikeProductMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getComponentAttachUsers,
  getTargetCurrentUsersExpendMe,
} from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { getComponentDisplayNameMapDepth } from "@/redux/currentApp/components/componentsSelector"
import {
  getExecutionError,
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
  getResizingComponentIDs,
} from "@/redux/currentApp/executionTree/executionSelector"
import store, { RootState } from "@/store"
import { FocusManager } from "@/utils/focusManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { isMAC } from "@/utils/userAgent"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { useMouseHover } from "../../utils/useMouseHover"
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
    parentNodeDisplayName,
  } = props
  const { handleMouseEnter, handleMouseLeave } = useMouseHover()
  const dispatch = useDispatch()
  const executionResult = useSelector(getExecutionResult)
  const currentUserID = useSelector(getCurrentUserId)
  const hasError = useSelector<RootState, boolean>((rootState) => {
    const errors = getExecutionError(rootState)
    const widgetErrors = errors[displayName] ?? {}
    return Object.keys(widgetErrors).length > 0
  })
  const resizingIDs = useSelector(getResizingComponentIDs)
  const isResizingCurrent = resizingIDs.includes(displayName)
  const isGlobalResizing = resizingIDs.length > 0
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

  const handleOnSelection = (e: MouseEvent<HTMLDivElement>) => {
    const rootState = store.getState()
    const isEditMode = getIsILLAEditMode(rootState)
    const displayNameMapDepth = getComponentDisplayNameMapDepth(rootState)
    const widgetExecutionLayoutInfo = getExecutionWidgetLayoutInfo(rootState)

    e.stopPropagation()

    if (isGlobalResizing || !isEditMode) return
    FocusManager.switchFocus("canvas", {
      displayName: displayName,
      type: "component",
      clickPosition: [],
    })
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SELECT, {
      element: "component",
      parameter1: "click",
    })

    if ((isMAC() && e.metaKey) || e.shiftKey || (!isMAC() && e.ctrlKey)) {
      let currentSelectedDisplayName = klona(selectedComponents)
      const index = currentSelectedDisplayName.findIndex(
        (currentDisplayName) => displayName === currentDisplayName,
      )
      if (index !== -1) {
        currentSelectedDisplayName.splice(index, 1)
      } else {
        currentSelectedDisplayName.push(displayName)
      }

      const depths = currentSelectedDisplayName.map((displayName) => {
        return displayNameMapDepth[displayName]
      })
      let isEqual = depths.every((depth) => depth === depths[0])
      if (!isEqual) {
        return
      }
      if (currentSelectedDisplayName.length > 1) {
        const firstParentNode =
          widgetExecutionLayoutInfo[currentSelectedDisplayName[0]].parentNode
        const isSameParentNode = currentSelectedDisplayName.every(
          (displayName) => {
            const parentNode = widgetExecutionLayoutInfo[displayName].parentNode
            return parentNode === firstParentNode
          },
        )
        if (!isSameParentNode) {
          const lastParentNode =
            widgetExecutionLayoutInfo[
              currentSelectedDisplayName[currentSelectedDisplayName.length - 1]
            ].parentNode
          currentSelectedDisplayName = currentSelectedDisplayName.filter(
            (displayName) => {
              const currentParentNode =
                widgetExecutionLayoutInfo[displayName].parentNode
              return lastParentNode === currentParentNode
            },
          )
        }
      }
      currentSelectedDisplayName = Array.from(
        new Set(currentSelectedDisplayName),
      )
      dispatch(
        configActions.updateSelectedComponent(currentSelectedDisplayName),
      )
      return
    }

    dispatch(configActions.updateSelectedComponent([displayName]))
  }

  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      FocusManager.switchFocus("canvas", {
        displayName: displayName,
        type: "component",
        clickPosition: [],
      })
      e.stopPropagation()
      dispatch(configActions.updateSelectedComponent([displayName]))
    },
    [displayName, dispatch],
  )

  return (
    <div
      data-displayname={displayName}
      data-parentnode={parentNodeDisplayName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnSelection}
      onContextMenu={handleContextMenu}
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
