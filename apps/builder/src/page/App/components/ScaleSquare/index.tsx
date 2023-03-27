import { cloneDeep, get } from "lodash"
import { MouseEvent, memo, useCallback, useContext, useMemo } from "react"
import { useDrag } from "react-dnd"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { dragPreviewStyle } from "@/page/App/components/ComponentPanel/style"
import {
  DragCollectedInfo,
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { ScaleSquareProps } from "@/page/App/components/ScaleSquare/interface"
import { MoveBar } from "@/page/App/components/ScaleSquare/moveBar"
import {
  applyDashedLineStyle,
  applyWrapperPendingStyle,
  hoverHotspotStyle,
} from "@/page/App/components/ScaleSquare/style"
import { changeSelectedDisplayName } from "@/page/App/components/ScaleSquare/utils/changeSelectedDisplayName"
import {
  getHoveredComponents,
  getIsDragging,
  getIsILLAEditMode,
  getIsLikeProductMode,
  getIsResizing,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getComponentAttachUsers,
  getTargetCurrentUsersExpendMe,
} from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import {
  RelationMap,
  getComponentDisplayNameMapDepth,
  getFlattenArrayComponentNodes,
  getShowWidgetNameParentMap,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import store, { RootState } from "@/store"
import { CopyManager } from "@/utils/copyManager"
import {
  batchMergeLayoutInfoToComponent,
  endDragMultiNodes,
  startDragMultiNodes,
} from "@/utils/drag/drag"
import { FocusManager } from "@/utils/focusManager"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { isMAC } from "@/utils/userAgent"
import { AutoHeightWithLimitedContainer } from "@/widgetLibrary/PublicSector/AutoHeightWithLimitedContainer"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { ResizingContainer } from "./ResizingContainer"
import { getRealShapeAndPosition } from "./utils/getRealShapeAndPosition"
import { useDisplayNameInMoveBarSelector } from "./utils/useGetDisplayNameInMoveBar"
import { useMouseHover } from "./utils/useMouseHover"

const getRelativeRelation = (
  selectedComponents: string[],
  currentDisplayName: string,
  relationMap: RelationMap,
): { parentNode: string; childrenNode: string[]; containerType: string } => {
  const relation = relationMap[currentDisplayName]
  if (!relation) return relation

  if (!selectedComponents.includes(relation.parentNode)) {
    return getRelativeRelation(
      selectedComponents,
      relation.parentNode,
      relationMap,
    )
  }
  return relation
}

export const ScaleSquare = memo<ScaleSquareProps>((props: ScaleSquareProps) => {
  const {
    componentNode,
    unitW,
    unitH,
    containerPadding,
    containerHeight,
    collisionEffect,
    blockColumns,
    childrenNode,
  } = props

  const shortcut = useContext(ShortCutContext)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const canRenderDashedLine = !collisionEffect.has(componentNode.displayName)

  const { handleMouseEnter, handleMouseLeave } = useMouseHover()
  const { w, y, h } = getRealShapeAndPosition(componentNode, unitH, unitW)

  const executionResult = useSelector(getExecutionResult)
  const isDraggingStateInGlobal = useSelector(getIsDragging)
  const isResizingStateInGlobal = useSelector(getIsResizing)
  const isShowCanvasDot = useSelector(isShowDot)
  const hoveredComponents = useSelector(getHoveredComponents)
  const displayNameMapDepth = useSelector(getComponentDisplayNameMapDepth)
  const widgetDisplayNameRelationMap = useSelector(getShowWidgetNameParentMap)
  const isMouseOver =
    hoveredComponents[hoveredComponents.length - 1] ===
    componentNode.displayName

  const filteredComponentAttachedUserList = useSelector<
    RootState,
    CollaboratorsInfo[]
  >((rootState) => {
    const currentUserInfo = getCurrentUser(rootState)
    const currentUserID = currentUserInfo.userId
    const componentsAttachedUsers = getComponentAttachUsers(rootState)
    return getTargetCurrentUsersExpendMe(
      componentsAttachedUsers,
      componentNode.displayName,
      currentUserID,
    )
  })

  const isEditMode = useSelector(getIsILLAEditMode)
  const errors = useSelector(getExecutionError)
  const selectedComponents = useSelector(getSelectedComponents)
  const isLikeProductionMode = useSelector(getIsLikeProductMode)

  const realProps: Record<string, any> = get(
    executionResult,
    componentNode.displayName,
    {},
  )

  const isAutoLimitedMode = realProps?.dynamicHeight === "limited"
  const isOverLap =
    isAutoLimitedMode &&
    (realProps?.dynamicMaxHeight === h || realProps?.dynamicMinHeight === h)

  const displayNameInMoveBar = useDisplayNameInMoveBarSelector(
    componentNode.displayName,
    componentNode.type,
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
        if (currentSelectedDisplayName.length > 1) {
          const firstParentNode =
            executionResult[currentSelectedDisplayName[0]].$parentNode
          const isSameParentNode = currentSelectedDisplayName.every(
            (displayName) => {
              const parentNode = executionResult[displayName].$parentNode
              return parentNode === firstParentNode
            },
          )
          if (!isSameParentNode) {
            const lastParentNode =
              executionResult[
                currentSelectedDisplayName[
                  currentSelectedDisplayName.length - 1
                ]
              ].$parentNode
            currentSelectedDisplayName = currentSelectedDisplayName.filter(
              (displayName) => {
                const currentParentNode =
                  executionResult[displayName].$parentNode
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
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
    },
    [
      componentNode.displayName,
      dispatch,
      displayNameMapDepth,
      executionResult,
      isEditMode,
      selectedComponents,
      widgetDisplayNameRelationMap,
    ],
  )

  const handleUpdateComponentHeight = useCallback(
    (height: number) => {
      const finalHeight = Math.round(height / unitH)

      dispatch(
        componentsActions.updateComponentNodeHeightReducer({
          displayName: componentNode.displayName,
          height: finalHeight,
          oldHeight: componentNode.h,
        }),
      )
    },
    [componentNode.displayName, componentNode.h, dispatch, unitH],
  )

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag<
    DragInfo,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      canDrag: isEditMode && !isResizingStateInGlobal,
      end: (draggedItem, monitor) => {
        const dropResultInfo = monitor.getDropResult()
        const { draggedSelectedComponents } = draggedItem
        endDragMultiNodes(
          draggedSelectedComponents,
          dropResultInfo?.isDropOnCanvas ?? false,
          false,
        )
      },
      item: () => {
        const rootState = store.getState()
        const allComponentNodes = getFlattenArrayComponentNodes(rootState)
        const executionResult = getExecutionResult(rootState)
        let childrenNodes = allComponentNodes
          ? cloneDeep(allComponentNodes)
          : []
        if (Array.isArray(childrenNodes)) {
          const mergedChildrenNode = batchMergeLayoutInfoToComponent(
            executionResult,
            childrenNodes,
          )
          childrenNodes = cloneDeep(mergedChildrenNode)
        } else {
          childrenNodes = []
        }
        let draggedSelectedComponents: ComponentNode[]
        const relativeRelation = getRelativeRelation(
          selectedComponents,
          componentNode.displayName,
          widgetDisplayNameRelationMap,
        )
        if (
          selectedComponents.length > 1 &&
          (selectedComponents.includes(componentNode.displayName) ||
            !!relativeRelation)
        ) {
          draggedSelectedComponents = childrenNodes.filter((node) =>
            selectedComponents.includes(node.displayName),
          )
        } else {
          draggedSelectedComponents = childrenNodes.filter(
            (node) => node.displayName === componentNode.displayName,
          )
        }
        let findDisplayName = componentNode.displayName
        if (!!relativeRelation && selectedComponents.length > 1) {
          findDisplayName = relativeRelation.parentNode
        }
        const mergedItem = childrenNodes.find((node) => {
          return node.displayName === findDisplayName
        })!
        startDragMultiNodes(draggedSelectedComponents)
        return {
          item: mergedItem,
          childrenNodes,
          draggedSelectedComponents,
          currentColumnNumber: blockColumns,
        }
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        }
      },
    }),
    [
      componentNode,
      blockColumns,
      isEditMode,
      isResizingStateInGlobal,
      selectedComponents,
    ],
  )

  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      FocusManager.switchFocus("canvas")
      e.stopPropagation()
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
    },
    [componentNode.displayName, dispatch],
  )

  const hasEditors = !!filteredComponentAttachedUserList.length

  return componentNode.isDragging ? null : (
    <ResizingContainer
      unitW={unitW}
      unitH={unitH}
      componentNode={componentNode}
      childrenNode={childrenNode}
    >
      <div
        css={hoverHotspotStyle}
        data-displayname={componentNode.displayName}
        data-parentnode={componentNode.parentNode}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
                  CopyManager.paste()
                }}
              />
              <DropListItem
                deleted
                value="delete"
                title={t("editor.context_menu.delete")}
                onClick={() => {
                  shortcut.showDeleteDialog([componentNode.displayName])
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
              isDragging,
              isEditMode,
              isOverLap,
              isLikeProductionMode,
              isMouseOver,
            )}
            onClick={handleOnSelection}
            onContextMenu={handleContextMenu}
            ref={isEditMode ? dragRef : undefined}
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
                css={applyDashedLineStyle(
                  isSelected,
                  isShowCanvasDot,
                  isDragging,
                )}
              />
            )}
          </div>
        </Dropdown>
      </div>

      <div css={dragPreviewStyle} ref={dragPreviewRef} />
      {isEditMode &&
        selectedComponents?.length === 1 &&
        isSelected &&
        isAutoLimitedMode &&
        !isDraggingStateInGlobal && (
          <AutoHeightWithLimitedContainer
            containerHeight={h}
            dynamicMinHeight={realProps.dynamicMinHeight}
            dynamicMaxHeight={realProps.dynamicMaxHeight}
            displayName={componentNode.displayName}
            handleUpdateComponentHeight={handleUpdateComponentHeight}
          />
        )}
    </ResizingContainer>
  )
})

ScaleSquare.displayName = "ScaleSquare"
