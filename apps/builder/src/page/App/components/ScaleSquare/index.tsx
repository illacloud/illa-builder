import { dragPreviewStyle } from "@/page/App/components/ComponentPanel/style"
import { getReflowResult } from "@/page/App/components/DotPanel/calc"
import {
  DragCollectedInfo,
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  ScaleSquareProps,
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
  getIllaMode,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getFlattenArrayComponentNodes } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import store, { RootState } from "@/store"
import { CopyManager } from "@/utils/copyManager"
import { endDrag, startDrag } from "@/utils/drag/drag"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { globalColor, illaPrefix, Dropdown, DropList } from "@illa-design/react"
import { cloneDeep, get, throttle } from "lodash"
import {
  memo,
  MouseEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react"
import { useDrag } from "react-dnd"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Rnd, RndResizeCallback, RndResizeStartCallback } from "react-rnd"

const { Item } = DropList

export const ScaleSquare = memo<ScaleSquareProps>((props: ScaleSquareProps) => {
  const {
    componentNode,
    unitW,
    unitH,
    w,
    h,
    x,
    y,
    containerPadding,
    containerHeight,
    childrenNode,
    collisionEffect,
    columnsNumber,
  } = props

  const canRenderDashedLine = !collisionEffect.has(componentNode.displayName)
  const realProps = useSelector<RootState, Record<string, any>>((rootState) => {
    const executionResult = getExecutionResult(rootState)
    return get(executionResult, componentNode.displayName, null)
  })

  const displayNameInMoveBar = useMemo(() => {
    if (componentNode.type === "CONTAINER_WIDGET" && realProps) {
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
  const illaMode = useSelector(getIllaMode)
  const errors = useSelector(getExecutionError)
  const selectedComponents = useSelector(getSelectedComponents)

  const childNodesRef = useRef<ComponentNode[]>(childrenNode || [])

  const resizeDirection = useMemo(() => {
    const widgetConfig = widgetBuilder(componentNode.type).config
    return widgetConfig.resizeDirection || RESIZE_DIRECTION.ALL
  }, [componentNode.type])

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
  if (illaMode !== "edit") {
    scaleSquareState = "production"
  }

  const handleOnSelection = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (illaMode !== "edit") return
      e.stopPropagation()
      if (e.metaKey || e.shiftKey) {
        const currentSelectedDisplayName = cloneDeep(selectedComponents)

        const index = currentSelectedDisplayName.findIndex(
          (displayName) => displayName === componentNode.displayName,
        )
        if (index !== -1) {
          currentSelectedDisplayName.splice(index, 1)
          dispatch(
            configActions.updateSelectedComponent(currentSelectedDisplayName),
          )
        } else {
          currentSelectedDisplayName.push(componentNode.displayName)
          dispatch(
            configActions.updateSelectedComponent(currentSelectedDisplayName),
          )
        }
        return
      }
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
    },
    [componentNode.displayName, dispatch, illaMode, selectedComponents],
  )

  const handleOnResizeStop = useCallback(
    (e, dir, ref, delta, position) => {
      const { width, height } = delta
      const finalWidth = Math.round((w + width) / unitW)
      const finalHeight = Math.round((h + height) / unitH)
      const x = Math.round(position.x / unitW)
      const y = Math.round(position.y / unitH)

      const newComponentNode = {
        ...componentNode,
        x,
        y,
        w: finalWidth,
        h: finalHeight,
        isResizing: false,
      }

      dispatch(
        componentsActions.updateComponentsShape({
          isMove: false,
          components: [newComponentNode],
        }),
      )
      dispatch(configActions.updateShowDot(false))
    },
    [componentNode, dispatch, h, unitH, unitW, w],
  )

  const updateComponentPositionByReflow = useCallback(
    (parentDisplayName: string, childrenNodes: ComponentNode[]) => {
      dispatch(
        componentsActions.updateComponentReflowReducer([
          {
            parentDisplayName: parentDisplayName,
            childNodes: childrenNodes,
          },
        ]),
      )
    },
    [dispatch],
  )

  const debounceUpdateComponentPositionByReflow = throttle(
    updateComponentPositionByReflow,
    60,
  )

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag<
    DragInfo,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      canDrag: () => {
        return illaMode === "edit"
      },
      end: (draggedItem, monitor) => {
        const dropResultInfo = monitor.getDropResult()
        endDrag(draggedItem.item, dropResultInfo?.isDropOnCanvas ?? false)
      },
      item: () => {
        const rootState = store.getState()
        const allComponentNodes = getFlattenArrayComponentNodes(rootState)
        const childrenNodes = allComponentNodes
          ? cloneDeep(allComponentNodes)
          : []
        startDrag(componentNode)
        return {
          item: componentNode,
          childrenNodes,
          currentColumnNumber: columnsNumber,
        }
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        }
      },
    }),
    [illaMode, componentNode],
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
      componentsActions.updateComponentsShape({
        isMove: false,
        components: [
          {
            ...componentNode,
            isResizing: true,
          },
        ],
      }),
    )
    childNodesRef.current = childrenNode ? cloneDeep(childrenNode) : []
    dispatch(configActions.updateShowDot(true))
  }

  const handleResize: RndResizeCallback = useCallback(
    (e, dir, elementRef, delta, position) => {
      const item = cloneDeep(componentNode)
      const { width, height } = delta
      const finalWidth = Math.round((w + width) / unitW)
      const finalHeight = Math.round((h + height) / unitH)
      const x = Math.round(position.x / unitW)
      const y = Math.round(position.y / unitH)
      const newItem = {
        ...item,
        x,
        y,
        w: finalWidth,
        h: finalHeight,
      }
      const indexOfChildren = childNodesRef.current.findIndex(
        (node) => node.displayName === newItem.displayName,
      )
      const allChildrenNodes = [...childNodesRef.current]

      allChildrenNodes.splice(indexOfChildren, 1, newItem)
      const { finalState } = getReflowResult(newItem, allChildrenNodes)

      debounceUpdateComponentPositionByReflow(
        componentNode.parentNode || "root",
        finalState,
      )
    },
    [
      componentNode,
      debounceUpdateComponentPositionByReflow,
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
    },
    [componentNode.displayName, dispatch],
  )

  //  1px is left border width
  return isDragging ? null : (
    <Rnd
      bounds="parent"
      size={{
        width: w + 1,
        height: h + 1,
      }}
      position={{
        x: x,
        y: y,
      }}
      enableResizing={
        illaMode === "edit" && isSelected ? enableResizing : false
      }
      css={applyRNDWrapperStyle(
        isSelected,
        hasError,
        isShowCanvasDot,
        isDragging,
        illaMode === "edit",
      )}
      resizeHandleComponent={resizeHandler}
      disableDragging
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeStop={handleOnResizeStop}
      minWidth={componentNode.minW * unitW}
      minHeight={componentNode.minH * unitH}
    >
      <Dropdown
        disabled={illaMode !== "edit"}
        position="right-start"
        trigger="contextmenu"
        dropList={
          <DropList width="184px">
            <Item
              key="duplicate"
              title={t("editor.context_menu.duplicate")}
              onClick={() => {
                CopyManager.copyComponentNode([componentNode])
                CopyManager.paste()
              }}
            />
            <Item
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
              key="delete"
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
            isSelected,
            hasError,
            isDragging,
            illaMode === "edit",
          )}
          onClick={handleOnSelection}
          onContextMenu={handleContextMenu}
          ref={dragRef}
        >
          <MoveBar
            isError={hasError}
            displayName={displayNameInMoveBar}
            maxWidth={componentNode.w * unitW}
            selected={isSelected}
            isEditor={illaMode === "edit"}
            widgetTop={y}
            widgetHeight={h}
            containerPadding={containerPadding || 0}
            containerHeight={containerHeight}
          />

          <TransformWidgetWrapper componentNode={componentNode} />
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
    </Rnd>
  )
})

ScaleSquare.displayName = "ScaleSquare"
