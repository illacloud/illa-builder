import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { getCurrentUserId } from "@illa-public/user-data"
import { klona } from "klona"
import { get } from "lodash-es"
import { FC, MouseEvent, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { AutoHeightWithLimitedContainer } from "@/page/App/components/ScaleSquare/components/AutoHeightWithLimitedContainer"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"
import {
  getHoveredComponents,
  getIsILLAEditMode,
  getIsLikeProductMode,
  getSelectedComponentDisplayNames,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getComponentAttachUsers,
  getTargetCurrentUsersExpendMe,
} from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { getComponentDisplayNameMapDepth } from "@/redux/currentApp/components/componentsSelector"
import { getFirstDragShadowInfo } from "@/redux/currentApp/dragShadow/dragShadowSelector"
import {
  getExecutionError,
  getExecutionResult,
  getIsDragging,
  getResizingComponentIDs,
} from "@/redux/currentApp/executionTree/executionSelector"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import store from "@/store"
import { CopyManager } from "@/utils/copyManager"
import { FocusManager } from "@/utils/focusManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { isMAC } from "@/utils/userAgent"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { useMouseHover } from "../../utils/useMouseHover"
import { DragContainer } from "../DragContainer"
import { MoveBar } from "../MoveBar/moveBar"
import { PositionContainer } from "../PositionContainer"
import ResizeHandler from "./ResizeHandler"
import { ResizingAndDragContainerProps } from "./interface"
import { resizingContainerStyle, resizingPlaceholderStyle } from "./style"

export const ResizingAndDragContainer: FC<ResizingAndDragContainerProps> = (
  props,
) => {
  const {
    unitW,
    displayName,
    children,
    widgetHeight,
    widgetTop,
    widgetLeft,
    widgetWidth,
    widgetType,
    columnNumber,
    parentNodeDisplayName,
  } = props

  const { t } = useTranslation()
  const shortcut = useContext(ShortCutContext)
  const firstDragShadow = useSelector(getFirstDragShadowInfo)

  const isResizingWithOthers = firstDragShadow.some((dragShadow) => {
    return dragShadow?.displayNames?.includes(displayName)
  })

  const isEditMode = useSelector(getIsILLAEditMode)
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const executionResult = useSelector(getExecutionResult)
  const layoutInfoResult = useSelector(getClientWidgetLayoutInfo)
  const currentWidgetLayoutInfo = layoutInfoResult[displayName]
  const currentWidgetProps = get(executionResult, displayName, {})
  const isShownDot = useSelector(isShowDot)
  const isDraggingStateInGlobal = useSelector(getIsDragging)

  const isAutoLimitedMode =
    get(currentWidgetProps, `dynamicHeight`, "fixed") === "limited"

  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  const { handleMouseEnter, handleMouseLeave } = useMouseHover()
  const dispatch = useDispatch()
  const currentUserID = useSelector(getCurrentUserId)
  const errors = useSelector(getExecutionError)
  const hasError = useMemo(() => {
    const keys = Object.keys(errors)
    return (
      keys.length > 0 &&
      keys.some((key) => {
        return (
          Array.isArray(errors[key]) &&
          errors[key].length > 0 &&
          key.startsWith(displayName)
        )
      })
    )
  }, [displayName, errors])
  const resizingIDs = useSelector(getResizingComponentIDs)
  const isResizingCurrent = resizingIDs.includes(displayName)
  const isGlobalResizing = resizingIDs.length > 0
  const canDrag = widgetType !== "MODAL_WIDGET"

  const resizeDirection = useMemo(() => {
    const direction =
      currentWidgetProps.resizeDirection ??
      widgetBuilder(currentWidgetProps.$widgetType)?.config?.resizeDirection
    return direction || RESIZE_DIRECTION.ALL
  }, [currentWidgetProps.$widgetType, currentWidgetProps.resizeDirection])

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
    if (isGlobalResizing || !isEditMode) return
    const displayNameMapDepth = getComponentDisplayNameMapDepth(rootState)
    const widgetExecutionLayoutInfo = getClientWidgetLayoutInfo(rootState)
    FocusManager.switchFocus("canvas", {
      displayName: displayName,
      type: "component",
      clickPosition: [],
    })

    e.stopPropagation()

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

  return !isResizingWithOthers ? (
    <>
      <PositionContainer x={widgetLeft} y={widgetTop} displayName={displayName}>
        <Dropdown
          disabled={!isEditMode}
          position="right-start"
          trigger="contextmenu"
          dropList={
            <DropList w="184px">
              <DropListItem
                value="duplicate"
                title={t("editor.context_menu.duplicate")}
                onClick={() => {
                  CopyManager.copyComponentNodeByDisplayName([displayName])
                  CopyManager.paste("duplicate")
                }}
              />
              <DropListItem
                deleted
                value="delete"
                title={t("editor.context_menu.delete")}
                onClick={() => {
                  shortcut.showDeleteDialog([displayName], "widget", {
                    source: "manage_delete",
                  })
                }}
              />
            </DropList>
          }
          onVisibleChange={(visible) => {
            if (visible) {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
                element: "component_management_canvas",
                parameter1: widgetType,
              })
            }
          }}
        >
          <div
            data-displayname={displayName}
            data-parentnode={parentNodeDisplayName}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnSelection}
            onContextMenu={handleContextMenu}
            css={resizingContainerStyle(
              {
                width: widgetWidth,
                height: widgetHeight,
                minWidth: DEFAULT_MIN_COLUMN * unitW,
                minHeight:
                  (currentWidgetLayoutInfo?.layoutInfo.minH ?? 3) * UNIT_HEIGHT,
              },
              {
                isLikeProductionMode,
                isSelected,
                hasEditors: componentsAttachedUsers.length > 0,
                isHover: isMouseOver,
                isDragging: false,
                shownDot: isShownDot,
              },
            )}
          >
            <DragContainer
              displayName={displayName}
              parentNodeDisplayName={parentNodeDisplayName}
              canDrag={canDrag}
              unitWidth={unitW}
              columnNumber={columnNumber}
            >
              {!isLikeProductionMode &&
                (isSelected ||
                  isMouseOver ||
                  componentsAttachedUsers.length > 0 ||
                  isShownDot) && (
                  <MoveBar
                    isError={hasError}
                    displayName={displayName}
                    maxWidth={widgetWidth}
                    widgetTop={widgetTop}
                    widgetType={widgetType}
                    userList={componentsAttachedUsers}
                    columnNumber={columnNumber}
                  />
                )}
              {isResizingCurrent ? (
                <div css={resizingPlaceholderStyle} />
              ) : (
                <>
                  {children}
                  {isEditMode &&
                    isSelected &&
                    !isDraggingStateInGlobal &&
                    isAutoLimitedMode && (
                      <AutoHeightWithLimitedContainer
                        containerHeight={widgetHeight}
                        displayName={displayName}
                      />
                    )}
                </>
              )}
            </DragContainer>
            {isSelected && !isLikeProductionMode && (
              <ResizeHandler
                resizeDirection={resizeDirection}
                displayName={displayName}
              />
            )}
          </div>
        </Dropdown>
      </PositionContainer>
    </>
  ) : null
}
