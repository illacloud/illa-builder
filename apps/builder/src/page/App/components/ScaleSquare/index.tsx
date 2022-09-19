import {
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  MouseEvent,
} from "react"
import {
  ScaleSquareProps,
  ScaleSquareType,
} from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
  applyDashedLineStyle,
  applyRNDWrapperStyle,
  applySquarePointerStyle,
  applyWrapperPendingStyle,
} from "@/page/App/components/ScaleSquare/style"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { useDispatch, useSelector } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import store from "@/store"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { useTranslation } from "react-i18next"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import {
  getIllaMode,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { Rnd, RndResizeCallback } from "react-rnd"
import { MoveBar } from "@/page/App/components/ScaleSquare/moveBar"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { useDrag } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  DragCollectedInfo,
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { endDrag, startDrag } from "@/utils/drag/drag"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { cloneDeep, throttle } from "lodash"
import { getReflowResult } from "@/page/App/components/DotPanel/calc"
import { CopyManager } from "@/utils/copyManager"
import { dragPreviewStyle } from "@/page/App/components/ComponentPanel/style"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"

const { Item } = DropList

export const ScaleSquare = memo<ScaleSquareProps>((props: ScaleSquareProps) => {
  const { componentNode, unitW, unitH, w, h, x, y } = props

  const shortcut = useContext(ShortCutContext)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const isShowCanvasDot = useSelector(isShowDot)
  const illaMode = useSelector(getIllaMode)
  const errors = useSelector(getExecutionError)
  const selectedComponents = useSelector(getSelectedComponents)

  const childNodesRef = useRef<ComponentNode[]>([])

  const resizeDirection = useMemo(() => {
    const widgetConfig = widgetBuilder(componentNode.type).config
    return widgetConfig.resizeDirection || RESIZE_DIRECTION.ALL
  }, [componentNode.type])

  const enableResizing = useMemo(() => {
    if (resizeDirection === RESIZE_DIRECTION.ALL) {
      return true
    }
    if (resizeDirection === RESIZE_DIRECTION.HORIZONTAL) {
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
    if (resizeDirection === RESIZE_DIRECTION.VERTICAL) {
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
  }, [resizeDirection])

  const hasError = useMemo(() => {
    const displayName = componentNode.displayName
    const widgetErrors = errors[displayName] ?? {}
    return Object.keys(widgetErrors).length > 0
  }, [componentNode.displayName, errors])

  const isSelected = useMemo(() => {
    return selectedComponents.some(displayName => {
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

  const handleOnDragStart = useCallback(() => {
    if (illaMode === "edit") {
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
    }
  }, [componentNode, dispatch, illaMode])

  const handleOnSelection = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (illaMode !== "edit") return
      if (e.metaKey || e.shiftKey) {
        console.log("e.metaKey", e.metaKey)
        console.log("e.shiftKey", e.shiftKey)
        return
      }
      dispatch(
        configActions.updateSelectedComponent([componentNode.displayName]),
      )
    },
    [componentNode, dispatch, illaMode],
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
        componentsActions.updateComponentReflowReducer({
          parentDisplayName: parentDisplayName,
          childNodes: childrenNodes,
        }),
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
        const rootNode = getCanvas(rootState)

        const childrenNodes = rootNode?.childrenNode
          ? cloneDeep(rootNode.childrenNode)
          : []
        startDrag(componentNode)
        return {
          item: componentNode,
          childrenNodes,
        }
      },
      collect: monitor => {
        return {
          isDragging: monitor.isDragging(),
        }
      },
    }),
    [illaMode, componentNode],
  )

  const resizeHandler = useMemo(() => {
    if (resizeDirection === RESIZE_DIRECTION.ALL) {
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

    if (resizeDirection === RESIZE_DIRECTION.HORIZONTAL) {
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
  }, [isSelected, resizeDirection, scaleSquareState])

  const handleResizeStart = () => {
    const rootState = store.getState()
    const rootNode = getCanvas(rootState)

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
    childNodesRef.current = rootNode?.childrenNode
      ? cloneDeep(rootNode.childrenNode)
      : []
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
        node => node.displayName === newItem.displayName,
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

  return (
    <Rnd
      dragGrid={[unitW, unitH]}
      resizeGrid={[unitW, unitH]}
      bounds="#realCanvas"
      size={{
        width: w,
        height: h,
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
          onContextMenu={() => {
            dispatch(
              configActions.updateSelectedComponent([
                componentNode.displayName,
              ]),
            )
          }}
          ref={dragRef}
        >
          <MoveBar
            isError={hasError}
            displayName={componentNode.displayName}
            maxWidth={componentNode.w * unitW}
            selected={isSelected}
            isEditor={illaMode === "edit"}
          />

          <TransformWidgetWrapper componentNode={componentNode} />
          <div
            css={applyDashedLineStyle(isSelected, isShowCanvasDot, isDragging)}
          />
        </div>
      </Dropdown>
      <div css={dragPreviewStyle} ref={dragPreviewRef} />
    </Rnd>
  )
})

ScaleSquare.displayName = "ScaleSquare"
