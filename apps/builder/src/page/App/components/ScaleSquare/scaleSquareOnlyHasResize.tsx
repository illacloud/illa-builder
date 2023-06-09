import { cloneDeep } from "lodash"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { MouseEvent, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { getResizeHandler } from "@/page/App/components/ScaleSquare/ResizingContainer/utils"
import { changeSelectedDisplayName } from "@/page/App/components/ScaleSquare/utils/changeSelectedDisplayName"
import {
  getHoveredComponents,
  getIsILLAEditMode,
  getIsLikeProductMode,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getComponentAttachUsers } from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import {
  getComponentDisplayNameMapDepth,
  getShowWidgetNameParentMap,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { CopyManager } from "@/utils/copyManager"
import { FocusManager } from "@/utils/focusManager"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { isMAC } from "@/utils/userAgent"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { ScaleSquareProps, ScaleSquareType } from "./interface"
import { MoveBar } from "./moveBar"
import { applyDashedLineStyle, applyWrapperPendingStyle } from "./style"
import { getRealShapeAndPosition } from "./utils/getRealShapeAndPosition"
import { useDisplayNameInMoveBarSelector } from "./utils/useGetDisplayNameInMoveBar"
import { useMouseHover } from "./utils/useMouseHover"
import { useScaleStateSelector } from "./utils/useScaleStateSelector"

export const ScaleSquareOnlyHasResize = (props: ScaleSquareProps) => {
  const {
    componentNode,
    unitW,
    unitH,
    containerPadding,
    containerHeight,
    collisionEffect,
    blockColumns,
  } = props

  const canRenderDashedLine = !collisionEffect.has(componentNode.displayName)

  const { handleMouseEnter, handleMouseLeave } = useMouseHover()

  const { x, y, w, h } = getRealShapeAndPosition(componentNode, unitH, unitW)

  const displayNameInMoveBar = useDisplayNameInMoveBarSelector(
    componentNode.displayName,
    componentNode.type,
  )

  const shortcut = useContext(ShortCutContext)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const isShowCanvasDot = useSelector(isShowDot)
  const isEditMode = useSelector(getIsILLAEditMode)
  const isLikeProductionMode = useSelector(getIsLikeProductMode)
  const errors = useSelector(getExecutionError)
  const selectedComponents = useSelector(getSelectedComponents)
  const hoveredComponents = useSelector(getHoveredComponents)
  const displayNameMapDepth = useSelector(getComponentDisplayNameMapDepth)
  const widgetDisplayNameRelationMap = useSelector(getShowWidgetNameParentMap)

  const isMouseOver =
    hoveredComponents[hoveredComponents.length - 1] ===
    componentNode.displayName
  const componentsAttachedUsers = useSelector(
    getComponentAttachUsers,
  ) as Record<string, CollaboratorsInfo[]>
  const currentUsesInfo = useSelector(getCurrentUser)
  const attachedUserList =
    componentsAttachedUsers[componentNode.displayName] || []
  const filteredComponentAttachedUserList = attachedUserList.filter(
    (user) => `${user.id}` !== `${currentUsesInfo.userId}`,
  )
  const hasError = useMemo(() => {
    const displayName = componentNode.displayName
    const widgetErrors = errors[displayName] ?? {}
    return Object.keys(widgetErrors).length > 0
  }, [componentNode.displayName, errors])

  const isSelected = useMemo(() => {
    return selectedComponents.some((displayName) => {
      return displayName === componentNode.displayName
    })
  }, [componentNode.displayName, selectedComponents])

  const scaleSquareState: ScaleSquareType = useScaleStateSelector(
    componentNode.displayName,
  )

  const handleOnSelection = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      FocusManager.switchFocus("canvas")
      if (!isEditMode) return
      e.stopPropagation()
      if ((isMAC() && e.metaKey) || e.shiftKey || (!isMAC() && e.ctrlKey)) {
        let currentSelectedDisplayName = cloneDeep(selectedComponents)

        const index = currentSelectedDisplayName.findIndex(
          (displayName) => displayName === componentNode.displayName,
        )
        if (index !== -1) {
          currentSelectedDisplayName.splice(index, 1)
        } else {
          currentSelectedDisplayName.push(componentNode.displayName)
        }
        changeSelectedDisplayName(
          currentSelectedDisplayName,
          widgetDisplayNameRelationMap,
          componentNode.displayName,
          displayNameMapDepth,
        )

        currentSelectedDisplayName = Array.from(
          new Set(currentSelectedDisplayName),
        )
        dispatch(
          configActions.updateSelectedComponent(currentSelectedDisplayName),
        )
        return
      }
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
    },
    [
      componentNode.displayName,
      dispatch,
      displayNameMapDepth,
      isEditMode,
      selectedComponents,
      widgetDisplayNameRelationMap,
    ],
  )

  const handleOnResizeStop: ResizeCallback = useCallback(
    (e, dir, ref, delta) => {
      const { width, height } = delta
      let finalWidth = Math.round((w + width) / unitW)
      let finalHeight = Math.round((h + height) / unitH)
      finalWidth =
        finalWidth < componentNode.minW ? componentNode.minW : finalWidth
      finalHeight =
        finalHeight < componentNode.minH ? componentNode.minH : finalHeight

      dispatch(
        componentsActions.updateComponentLayoutInfoReducer({
          displayName: componentNode.displayName,
          layoutInfo: {
            x,
            y,
            w: finalWidth,
            h: finalHeight,
          },
        }),
      )
      dispatch(executionActions.setDraggingNodeIDsReducer([]))

      dispatch(configActions.updateShowDot(false))
    },
    [
      componentNode.displayName,
      componentNode.minH,
      componentNode.minW,
      dispatch,
      h,
      unitH,
      unitW,
      w,
      x,
      y,
    ],
  )

  const handleResizeStart: ResizeStartCallback = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(
        executionActions.setDraggingNodeIDsReducer([componentNode.displayName]),
      )

      dispatch(configActions.updateShowDot(true))
    },
    [componentNode, dispatch],
  )

  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
    },
    [componentNode.displayName, dispatch],
  )

  const hasEditors = !!filteredComponentAttachedUserList.length

  return (
    <Resizable
      bounds="parent"
      size={{
        width: w,
        height: h,
      }}
      minWidth={componentNode.minW * unitW}
      minHeight={componentNode.minH * unitH}
      handleComponent={getResizeHandler(
        RESIZE_DIRECTION.ALL,
        isSelected,
        scaleSquareState,
      )}
      onResizeStart={handleResizeStart}
      onResizeStop={handleOnResizeStop}
    >
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
                CopyManager.copyComponentNode([componentNode])
                CopyManager.paste("duplicate")
              }}
            />
            <DropListItem
              deleted
              value="delete"
              title={t("editor.context_menu.delete")}
              onClick={() => {
                shortcut.showDeleteDialog(
                  [componentNode.displayName],
                  "widget",
                  {
                    source: "manage_delete",
                  },
                )
              }}
            />
          </DropList>
        }
      >
        <div
          className="wrapperPending"
          css={applyWrapperPendingStyle(
            hasEditors,
            isSelected,
            hasError,
            false,
            isEditMode,
            false,
            isLikeProductionMode,
            isMouseOver,
          )}
          onClick={handleOnSelection}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onContextMenu={handleContextMenu}
          data-displayname={componentNode.displayName}
        >
          <MoveBar
            isError={hasError}
            isMouseOver={isMouseOver}
            displayName={displayNameInMoveBar}
            maxWidth={w}
            selected={isSelected}
            widgetTop={y}
            widgetHeight={h}
            containerPadding={containerPadding || 0}
            containerHeight={containerHeight}
            widgetType={componentNode.type}
            userList={filteredComponentAttachedUserList}
          />

          <TransformWidgetWrapper
            componentNode={componentNode}
            blockColumns={blockColumns}
          />
          {canRenderDashedLine && (
            <div
              css={applyDashedLineStyle(isSelected, isShowCanvasDot, false)}
            />
          )}
        </div>
      </Dropdown>
    </Resizable>
  )
}
