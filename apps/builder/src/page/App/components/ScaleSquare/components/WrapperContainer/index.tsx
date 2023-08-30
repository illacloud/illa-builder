import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { getCurrentUserId } from "@illa-public/user-data"
import { cloneDeep, get } from "lodash"
import { FC, MouseEvent, memo, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { useMouseHover } from "@/page/App/components/ScaleSquare/utils/useMouseHover"
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
import { getComponentDisplayNameMapDepth } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  getExecutionError,
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
  getIsResizing,
} from "@/redux/currentApp/executionTree/executionSelector"
import { isContainerType } from "@/utils/componentChecker"
import { CopyManager } from "@/utils/copyManager"
import { FocusManager } from "@/utils/focusManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { isMAC } from "@/utils/userAgent"
import { MoveBar } from "../MoveBar/moveBar"
import { WrapperContainerProps } from "./interface"
import { applyWrapperPendingStyle, hoverHotSpotStyle } from "./style"

const WrapperContainer: FC<WrapperContainerProps> = (props) => {
  const {
    displayName,
    parentNodeDisplayName,
    widgetHeight,
    widgetWidth,
    widgetType,
    widgetTop,
    children,
    columnNumber,
  } = props
  const { handleMouseEnter, handleMouseLeave } = useMouseHover()
  const hoveredComponents = useSelector(getHoveredComponents)
  const isLikeProductionMode = useSelector(getIsLikeProductMode)
  const canShowDot = useSelector(isShowDot)
  const executionResult = useSelector(getExecutionResult)
  const { t } = useTranslation()
  const shortcut = useContext(ShortCutContext)
  const widgetExecutionLayoutInfo = useSelector(getExecutionWidgetLayoutInfo)

  const isMouseOver =
    hoveredComponents[hoveredComponents.length - 1] === displayName

  const currentUserID = useSelector(getCurrentUserId)
  const componentsAttachedUsers = useSelector(getComponentAttachUsers)

  const filteredComponentAttachedUserList = useMemo(() => {
    return getTargetCurrentUsersExpendMe(
      componentsAttachedUsers,
      displayName,
      currentUserID,
    )
  }, [componentsAttachedUsers, currentUserID, displayName])
  const dispatch = useDispatch()
  const displayNameMapDepth = useSelector(getComponentDisplayNameMapDepth)
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const isResizing = useSelector(getIsResizing)
  const isEditMode = useSelector(getIsILLAEditMode)
  const errors = useSelector(getExecutionError)

  const hasEditors = !!filteredComponentAttachedUserList.length

  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  const realProps: Record<string, any> = get(executionResult, displayName, {})

  const hasError = useMemo(() => {
    const widgetErrors = errors[displayName] ?? {}
    return Object.keys(widgetErrors).length > 0
  }, [displayName, errors])
  const isAutoLimitedMode = realProps?.dynamicHeight === "limited"
  const isOverLap =
    isAutoLimitedMode &&
    (realProps?.dynamicMaxHeight === widgetHeight ||
      realProps?.dynamicMinHeight === widgetHeight)

  const handleOnSelection = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isResizing) return
      if (!isContainerType(widgetType)) {
        FocusManager.switchFocus("canvas", {
          displayName: displayName,
          type: "component",
          clickPosition: [],
        })
      }
      if (!isEditMode) return
      e.stopPropagation()
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SELECT, {
        element: "component",
        parameter1: "click",
      })
      if ((isMAC() && e.metaKey) || e.shiftKey || (!isMAC() && e.ctrlKey)) {
        let currentSelectedDisplayName = cloneDeep(selectedComponents)
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
              const parentNode =
                widgetExecutionLayoutInfo[displayName].parentNode
              return parentNode === firstParentNode
            },
          )
          if (!isSameParentNode) {
            const lastParentNode =
              widgetExecutionLayoutInfo[
                currentSelectedDisplayName[
                  currentSelectedDisplayName.length - 1
                ]
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
    },
    [
      dispatch,
      displayName,
      displayNameMapDepth,
      isEditMode,
      isResizing,
      selectedComponents,
      widgetExecutionLayoutInfo,
      widgetType,
    ],
  )

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
        css={hoverHotSpotStyle}
        data-displayname={displayName}
        data-parentnode={parentNodeDisplayName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOnSelection}
        onContextMenu={handleContextMenu}
      >
        <div
          css={applyWrapperPendingStyle(
            hasEditors,
            isSelected,
            hasError,
            isEditMode,
            isOverLap,
            isLikeProductionMode,
            isMouseOver,
            canShowDot,
          )}
        >
          <MoveBar
            isError={hasError}
            isMouseOver={isMouseOver}
            displayName={displayName}
            maxWidth={widgetWidth}
            selected={isSelected}
            widgetTop={widgetTop}
            widgetType={widgetType}
            userList={filteredComponentAttachedUserList}
            columnNumber={columnNumber}
          />
          {children}
        </div>
      </div>
    </Dropdown>
  )
}

WrapperContainer.displayName = "WrapperContainer"

export default memo(WrapperContainer)
