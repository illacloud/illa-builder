import { cloneDeep, get } from "lodash"
import { FC, MouseEvent, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { useMouseHover } from "@/page/App/components/ScaleSquare/utils/useMouseHover"
import {
  getHoveredComponents,
  getIsILLAEditMode,
  getIsLikeProductMode,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getComponentAttachUsers,
  getTargetCurrentUsersExpendMe,
} from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { getComponentDisplayNameMapDepth } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { RootState } from "@/store"
import { FocusManager } from "@/utils/focusManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { isMAC } from "@/utils/userAgent"
import { MoveBar } from "../MoveBar/moveBar"
import { WrapperContainerProps } from "./interface"
import { applyWrapperPendingStyle, hoverHotSpotStyle } from "./style"

export const WrapperContainer: FC<WrapperContainerProps> = (props) => {
  const {
    displayName,
    parentNodeDisplayName,
    widgetHeight,
    widgetWidth,
    widgetType,
    widgetTop,
    children,
  } = props
  const { handleMouseEnter, handleMouseLeave } = useMouseHover()
  const hoveredComponents = useSelector(getHoveredComponents)
  const isLikeProductionMode = useSelector(getIsLikeProductMode)
  const canShowDot = useSelector(isShowDot)
  const executionResult = useSelector(getExecutionResult)
  const { t } = useTranslation()
  const shortcut = useContext(ShortCutContext)

  const isMouseOver =
    hoveredComponents[hoveredComponents.length - 1] === displayName

  const filteredComponentAttachedUserList = useSelector<
    RootState,
    CollaboratorsInfo[]
  >((rootState) => {
    const currentUserInfo = getCurrentUser(rootState)
    const currentUserID = currentUserInfo.userId
    const componentsAttachedUsers = getComponentAttachUsers(rootState)
    return getTargetCurrentUsersExpendMe(
      componentsAttachedUsers,
      displayName,
      currentUserID,
    )
  })
  const dispatch = useDispatch()
  const displayNameMapDepth = useSelector(getComponentDisplayNameMapDepth)
  const selectedComponents = useSelector(getSelectedComponents)
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
      FocusManager.switchFocus("canvas")
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
      selectedComponents,
    ],
  )

  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      FocusManager.switchFocus("canvas")
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
              //  TODO: duplication
              // CopyManager.copyComponentNode([componentNode])
              // CopyManager.paste("duplicate")
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
          />
          {children}
        </div>
      </div>
    </Dropdown>
  )
}
