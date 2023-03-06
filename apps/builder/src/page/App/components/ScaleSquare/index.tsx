import { cloneDeep, get, throttle } from "lodash"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import {
  MouseEvent,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react"
import { useDrag } from "react-dnd"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Rnd, RndResizeCallback, RndResizeStartCallback } from "react-rnd"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { dragPreviewStyle } from "@/page/App/components/ComponentPanel/style"
import { getReflowResult } from "@/page/App/components/DotPanel/calc"
import {
  DragCollectedInfo,
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  ScaleSquareProps,
  ScaleSquarePropsWithJSON,
  ScaleSquareType,
} from "@/page/App/components/ScaleSquare/interface"
import { MoveBar } from "@/page/App/components/ScaleSquare/moveBar"
import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
  applyDashedLineStyle,
  applyRNDWrapperStyle,
  applySquarePointerStyle,
  applyWrapperPendingStyle,
} from "@/page/App/components/ScaleSquare/style"
import {
  getIsDragging,
  getIsILLAEditMode,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { updateCurrentAllComponentsAttachedUsers } from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import { getComponentAttachUsers } from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { UpdateComponentNodeLayoutInfoPayload } from "@/redux/currentApp/editor/components/componentsPayload"
import { getFlattenArrayComponentNodes } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import store, { RootState } from "@/store"
import { CopyManager } from "@/utils/copyManager"
import {
  batchMergeLayoutInfoToComponent,
  endDrag,
  mergeLayoutInfoToComponent,
  startDrag,
} from "@/utils/drag/drag"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { AutoHeightWithLimitedContainer } from "@/widgetLibrary/PublicSector/AutoHeightWithLimitedContainer"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { TransformWidgetWrapperWithJson } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/renderWithJSON"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const ScaleSquare = memo<ScaleSquareProps>((props: ScaleSquareProps) => {
  const {
    componentNode,
    unitW,
    unitH,
    containerPadding,
    containerHeight,
    childrenNode,
    collisionEffect,
    blockColumns,
  } = props

  const canRenderDashedLine = !collisionEffect.has(componentNode.displayName)
  const executionResult = useSelector(getExecutionResult)
  const realProps: Record<string, any> = get(
    executionResult,
    componentNode.displayName,
    {},
  )

  const { $layoutInfo = {} } = realProps
  const { x: positionX, y: positionY, w: sharpeW, h: sharpeH } = $layoutInfo
  const x = (positionX || componentNode.x) * (unitW || componentNode.unitW)
  const y = (positionY || componentNode.y) * (unitH || componentNode.unitH)
  const w = (sharpeW || componentNode.w) * (unitW || componentNode.unitW)
  const h = (sharpeH || componentNode.h) * (unitH || componentNode.unitH)

  const isAutoLimitedMode = realProps?.dynamicHeight === "limited"
  const isOverLap =
    isAutoLimitedMode &&
    (realProps?.dynamicMaxHeight === h || realProps?.dynamicMinHeight === h)
  const isDraggingStateInGlobal = useSelector(getIsDragging)

  const displayNameInMoveBar = useMemo(() => {
    if (
      componentNode.type === "CONTAINER_WIDGET" &&
      realProps.hasOwnProperty("currentIndex") &&
      realProps.hasOwnProperty("viewList")
    ) {
      const { currentIndex, viewList } = realProps
      if (!Array.isArray(viewList) || currentIndex >= viewList.length)
        return componentNode.displayName + " / " + "View 1"
      const labelName = viewList[currentIndex]
        ? viewList[currentIndex].label
        : currentIndex
      return componentNode.displayName + " / " + labelName
    }
    return componentNode.displayName
  }, [componentNode.displayName, componentNode.type, realProps])

  const shortcut = useContext(ShortCutContext)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const isShowCanvasDot = useSelector(isShowDot)

  const componentsAttachedUsers = useSelector(
    getComponentAttachUsers,
  ) as Record<string, CollaboratorsInfo[]>
  const currentUsesInfo = useSelector(getCurrentUser)
  const attachedUserList =
    componentsAttachedUsers[componentNode.displayName] || []
  const filteredComponentAttachedUserList = attachedUserList.filter(
    (user) => `${user.id}` !== `${currentUsesInfo.userId}`,
  )

  const isEditMode = useSelector(getIsILLAEditMode)
  const errors = useSelector(getExecutionError)
  const selectedComponents = useSelector(getSelectedComponents)

  const childNodesRef = useRef<ComponentNode[]>(childrenNode || [])

  const resizeDirection = useMemo(() => {
    const direction =
      componentNode?.props?.resizeDirection ||
      widgetBuilder(componentNode.type).config?.resizeDirection
    return direction || RESIZE_DIRECTION.ALL
  }, [componentNode?.props, componentNode.type])

  const enableResizing = useMemo(() => {
    switch (resizeDirection) {
      case RESIZE_DIRECTION.VERTICAL: {
        return {
          bottom: true,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: false,
          top: true,
          topLeft: false,
          topRight: false,
        }
      }
      case RESIZE_DIRECTION.HORIZONTAL: {
        return {
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: true,
          right: true,
          top: false,
          topLeft: false,
          topRight: false,
        }
      }
      case RESIZE_DIRECTION.ALL:
      default: {
        return true
      }
    }
  }, [resizeDirection])

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

  let scaleSquareState: ScaleSquareType = useMemo(
    () => (hasError ? "error" : "normal"),
    [hasError],
  )
  if (!isEditMode) {
    scaleSquareState = "production"
  }

  const handleOnSelection = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isEditMode) return
      e.stopPropagation()
      if (e.metaKey || e.shiftKey) {
        const currentSelectedDisplayName = cloneDeep(selectedComponents)

        const index = currentSelectedDisplayName.findIndex(
          (displayName) => displayName === componentNode.displayName,
        )
        if (index !== -1) {
          currentSelectedDisplayName.splice(index, 1)
        } else {
          currentSelectedDisplayName.push(componentNode.displayName)
        }
        dispatch(
          configActions.updateSelectedComponent(currentSelectedDisplayName),
        )
        updateCurrentAllComponentsAttachedUsers(
          currentSelectedDisplayName,
          componentsAttachedUsers,
        )

        return
      }
      updateCurrentAllComponentsAttachedUsers(
        [componentNode.displayName],
        componentsAttachedUsers,
      )

      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
    },
    [
      componentNode.displayName,
      componentsAttachedUsers,
      dispatch,
      isEditMode,
      selectedComponents,
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

  const handleOnResizeStop: RndResizeCallback = useCallback(
    (e, dir, ref, delta, position) => {
      const { width, height } = delta
      let finalWidth = Math.round((w + width) / unitW)
      let finalHeight = Math.round((h + height) / unitH)
      const x = Math.round(position.x / unitW)
      const y = Math.round(position.y / unitH)
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
          statusInfo: {
            isResizing: false,
          },
          options: {
            parentNode: componentNode.parentNode as string,
          },
        }),
      )
      dispatch(configActions.updateShowDot(false))
    },
    [componentNode, dispatch, h, unitH, unitW, w],
  )

  const throttleUpdateComponentPositionByReflow = useMemo(() => {
    return throttle((updateSlice: UpdateComponentNodeLayoutInfoPayload[]) => {
      dispatch(executionActions.batchUpdateWidgetLayoutInfoReducer(updateSlice))
    }, 60)
  }, [dispatch])

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag<
    DragInfo,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      canDrag: isEditMode,
      end: (draggedItem, monitor) => {
        const dropResultInfo = monitor.getDropResult()
        endDrag(draggedItem.item, dropResultInfo?.isDropOnCanvas ?? false)
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
        const itemLayoutInfo =
          executionResult[componentNode.displayName]?.$layoutInfo
        const mergedItem: ComponentNode = mergeLayoutInfoToComponent(
          itemLayoutInfo,
          componentNode,
        )
        startDrag(mergedItem)
        return {
          item: mergedItem,
          childrenNodes,
          currentColumnNumber: blockColumns,
        }
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        }
      },
    }),
    [componentNode, blockColumns, isEditMode],
  )

  const resizeHandler = useMemo(() => {
    switch (resizeDirection) {
      case RESIZE_DIRECTION.HORIZONTAL: {
        return {
          right: (
            <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "r")}>
              <div
                className="handler"
                css={applyBarPointerStyle(isSelected, scaleSquareState, "r")}
              />
            </div>
          ),
          left: (
            <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "l")}>
              <div
                className="handler"
                css={applyBarPointerStyle(isSelected, scaleSquareState, "l")}
              />
            </div>
          ),
        }
      }
      case RESIZE_DIRECTION.VERTICAL: {
        return {
          top: (
            <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "t")}>
              <div
                className="handler"
                css={applyBarPointerStyle(isSelected, scaleSquareState, "t")}
              />
            </div>
          ),
          bottom: (
            <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "b")}>
              <div
                className="handler"
                css={applyBarPointerStyle(isSelected, scaleSquareState, "b")}
              />
            </div>
          ),
        }
      }
      case RESIZE_DIRECTION.ALL:
      default: {
        return {
          topLeft: (
            <div
              css={applySquarePointerStyle(isSelected, scaleSquareState, "tl")}
            />
          ),
          top: (
            <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "t")}>
              <div
                className="handler"
                css={applyBarPointerStyle(isSelected, scaleSquareState, "t")}
              />
            </div>
          ),
          topRight: (
            <div
              css={applySquarePointerStyle(isSelected, scaleSquareState, "tr")}
            />
          ),
          right: (
            <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "r")}>
              <div
                className="handler"
                css={applyBarPointerStyle(isSelected, scaleSquareState, "r")}
              />
            </div>
          ),
          bottomRight: (
            <div
              css={applySquarePointerStyle(isSelected, scaleSquareState, "br")}
            />
          ),
          bottom: (
            <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "b")}>
              <div
                className="handler"
                css={applyBarPointerStyle(isSelected, scaleSquareState, "b")}
              />
            </div>
          ),
          bottomLeft: (
            <div
              css={applySquarePointerStyle(isSelected, scaleSquareState, "bl")}
            />
          ),
          left: (
            <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "l")}>
              <div
                className="handler"
                css={applyBarPointerStyle(isSelected, scaleSquareState, "l")}
              />
            </div>
          ),
        }
      }
    }
  }, [isSelected, resizeDirection, scaleSquareState])

  const handleResizeStart: RndResizeStartCallback = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      componentsActions.updateComponentLayoutInfoReducer({
        displayName: componentNode.displayName,
        layoutInfo: {},
        statusInfo: {
          isResizing: true,
        },
      }),
    )
    if (Array.isArray(childrenNode)) {
      const mergedChildrenNode = batchMergeLayoutInfoToComponent(
        executionResult,
        childrenNode,
      )
      childNodesRef.current = cloneDeep(mergedChildrenNode)
    } else {
      childNodesRef.current = []
    }
    dispatch(configActions.updateShowDot(true))
  }

  const handleResize: RndResizeCallback = useCallback(
    (e, dir, elementRef, delta, position) => {
      const item = cloneDeep(componentNode)
      const { width, height } = delta
      const finalWidth = Math.round((w + width) / unitW)
      const finalHeight = Math.round((h + height) / unitH)
      const positionX = Math.round(position.x / unitW)
      const positionY = Math.round(position.y / unitH)
      const newItem = {
        ...item,
        x: positionX,
        y: positionY,
        w: finalWidth,
        h: finalHeight,
      }
      const indexOfChildren = childNodesRef.current.findIndex(
        (node) => node.displayName === newItem.displayName,
      )
      const allChildrenNodes = [...childNodesRef.current]

      allChildrenNodes.splice(indexOfChildren, 1, newItem)
      const { finalState } = getReflowResult(newItem, allChildrenNodes)
      const updateSlice = finalState.map((componentNode) => {
        return {
          displayName: componentNode.displayName,
          layoutInfo: {
            x: componentNode.x,
            y: componentNode.y,
            w: componentNode.w,
            h: componentNode.h,
          },
        }
      })
      throttleUpdateComponentPositionByReflow(updateSlice)
    },
    [
      componentNode,
      throttleUpdateComponentPositionByReflow,
      h,
      unitH,
      unitW,
      w,
    ],
  )

  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
      updateCurrentAllComponentsAttachedUsers(
        [componentNode.displayName],
        componentsAttachedUsers,
      )
    },
    [componentNode.displayName, componentsAttachedUsers, dispatch],
  )

  const hasEditors = !!filteredComponentAttachedUserList.length

  return isDragging ? null : (
    <Rnd
      bounds="parent"
      size={{
        width: w,
        height: h,
      }}
      position={{
        x: x,
        y: y,
      }}
      enableResizing={isEditMode && isSelected ? enableResizing : false}
      css={applyRNDWrapperStyle(
        hasEditors,
        isSelected,
        hasError,
        isShowCanvasDot,
        isDragging,
        isEditMode,
      )}
      resizeHandleComponent={resizeHandler}
      disableDragging
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeStop={handleOnResizeStop}
      minWidth={componentNode.minW * unitW}
      minHeight={realProps?.dynamicMinHeight ?? componentNode.minH * unitH}
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
          )}
          onClick={handleOnSelection}
          onContextMenu={handleContextMenu}
          ref={isEditMode ? dragRef : undefined}
        >
          <MoveBar
            isError={hasError}
            displayName={displayNameInMoveBar}
            maxWidth={componentNode.w * unitW}
            selected={isSelected}
            isEditor={isEditMode}
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
    </Rnd>
  )
})

export const ScaleSquareWithJSON = memo<ScaleSquarePropsWithJSON>(
  (props: ScaleSquarePropsWithJSON) => {
    const { componentNode, unitW, unitH, w, h, x, y, blockColumns } = props

    //  1px is left border width
    return (
      <Rnd
        bounds="parent"
        size={{
          width: w,
          height: h,
        }}
        position={{
          x: x,
          y: y,
        }}
        enableResizing={false}
        disableDragging
        minWidth={componentNode.minW * unitW}
        minHeight={componentNode.minH * unitH}
      >
        <div
          className="wrapperPending"
          css={applyWrapperPendingStyle(false, false, false, false, false)}
        >
          <TransformWidgetWrapperWithJson
            componentNode={componentNode}
            blockColumns={blockColumns}
          />
        </div>
      </Rnd>
    )
  },
)

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
  const realProps = useSelector<RootState, Record<string, any>>((rootState) => {
    const executionResult = getExecutionResult(rootState)
    return get(executionResult, componentNode.displayName, {})
  })

  const { $layoutInfo = {} } = realProps
  const { x: positionX, y: positionY, w: sharpeW, h: sharpeH } = $layoutInfo
  const x = (positionX || componentNode.x) * (unitW || componentNode.unitW)
  const y = (positionY || componentNode.y) * (unitH || componentNode.unitH)
  const w = (sharpeW || componentNode.w) * (unitW || componentNode.unitW)
  const h = (sharpeH || componentNode.h) * (unitH || componentNode.unitH)

  const displayNameInMoveBar = useMemo(() => {
    if (
      componentNode.type === "CONTAINER_WIDGET" &&
      realProps.hasOwnProperty("currentIndex") &&
      realProps.hasOwnProperty("viewList")
    ) {
      const { currentIndex, viewList } = realProps
      if (!Array.isArray(viewList) || currentIndex >= viewList.length)
        return componentNode.displayName + " / " + "View 1"
      const labelName = viewList[currentIndex]
        ? viewList[currentIndex].label
        : currentIndex
      return componentNode.displayName + " / " + labelName
    }
    return componentNode.displayName
  }, [componentNode.displayName, componentNode.type, realProps])

  const shortcut = useContext(ShortCutContext)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const isShowCanvasDot = useSelector(isShowDot)
  const isEditMode = useSelector(getIsILLAEditMode)
  const errors = useSelector(getExecutionError)
  const selectedComponents = useSelector(getSelectedComponents)

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

  let scaleSquareState: ScaleSquareType = useMemo(
    () => (hasError ? "error" : "normal"),
    [hasError],
  )
  if (!isEditMode) {
    scaleSquareState = "production"
  }

  const handleOnSelection = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isEditMode) return
      e.stopPropagation()
      if (e.metaKey || e.shiftKey) {
        const currentSelectedDisplayName = cloneDeep(selectedComponents)

        const index = currentSelectedDisplayName.findIndex(
          (displayName) => displayName === componentNode.displayName,
        )
        if (index !== -1) {
          currentSelectedDisplayName.splice(index, 1)
        } else {
          currentSelectedDisplayName.push(componentNode.displayName)
        }
        dispatch(
          configActions.updateSelectedComponent(currentSelectedDisplayName),
        )

        updateCurrentAllComponentsAttachedUsers(
          currentSelectedDisplayName,
          componentsAttachedUsers,
        )
        return
      }
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
      updateCurrentAllComponentsAttachedUsers(
        [componentNode.displayName],
        componentsAttachedUsers,
      )
    },
    [
      componentNode.displayName,
      componentsAttachedUsers,
      dispatch,
      isEditMode,
      selectedComponents,
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
          statusInfo: {
            isResizing: false,
          },
        }),
      )
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

  const resizeHandler = useMemo(() => {
    return {
      topLeft: (
        <div
          css={applySquarePointerStyle(isSelected, scaleSquareState, "tl")}
        />
      ),
      top: (
        <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "t")}>
          <div
            className="handler"
            css={applyBarPointerStyle(isSelected, scaleSquareState, "t")}
          />
        </div>
      ),
      topRight: (
        <div
          css={applySquarePointerStyle(isSelected, scaleSquareState, "tr")}
        />
      ),
      right: (
        <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "r")}>
          <div
            className="handler"
            css={applyBarPointerStyle(isSelected, scaleSquareState, "r")}
          />
        </div>
      ),
      bottomRight: (
        <div
          css={applySquarePointerStyle(isSelected, scaleSquareState, "br")}
        />
      ),
      bottom: (
        <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "b")}>
          <div
            className="handler"
            css={applyBarPointerStyle(isSelected, scaleSquareState, "b")}
          />
        </div>
      ),
      bottomLeft: (
        <div
          css={applySquarePointerStyle(isSelected, scaleSquareState, "bl")}
        />
      ),
      left: (
        <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "l")}>
          <div
            className="handler"
            css={applyBarPointerStyle(isSelected, scaleSquareState, "l")}
          />
        </div>
      ),
    }
  }, [isSelected, scaleSquareState])

  const handleResizeStart: ResizeStartCallback = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(
        componentsActions.updateComponentLayoutInfoReducer({
          displayName: componentNode.displayName,
          layoutInfo: {},
          statusInfo: {
            isResizing: true,
          },
        }),
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
      updateCurrentAllComponentsAttachedUsers(
        [componentNode.displayName],
        componentsAttachedUsers,
      )
    },
    [componentNode.displayName, componentsAttachedUsers, dispatch],
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
      handleComponent={resizeHandler}
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
            false,
            isEditMode,
          )}
          onClick={handleOnSelection}
          onContextMenu={handleContextMenu}
        >
          <MoveBar
            isError={hasError}
            displayName={displayNameInMoveBar}
            maxWidth={componentNode.w * unitW}
            selected={isSelected}
            isEditor={isEditMode}
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

ScaleSquareWithJSON.displayName = "ScaleSquareWithJSON"
ScaleSquare.displayName = "ScaleSquare"
