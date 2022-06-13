import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import {
  DotPanelProps,
  DragPosition,
  DropCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  applyChildrenContainerStyle,
  applyDotRowsStyle,
  applyDragObjectStyle,
  applyScaleStyle,
  dotStyle,
} from "@/page/App/components/DotPanel/style"
import useWindowSize from "react-use/lib/useWindowSize"
import { useDispatch, useSelector } from "react-redux"
import {
  getUnitSize,
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
  isShowDot,
} from "@/redux/currentApp/config/configSelector"
import { useDrop, XYCoord } from "react-dnd"
import { mergeRefs } from "@illa-design/system"
import { configActions } from "@/redux/currentApp/config/configSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DragShadowSquare } from "@/page/App/components/DragShadowSquare"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getDragShadowMap } from "@/redux/currentApp/editor/dragShadow/dragShadowSelector"
import { DragShadow } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import { DottedLineSquare } from "@/page/App/components/DottedLineSquare"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import store, { RootState } from "@/store"

function calculateDragPosition(
  canvasRect: DOMRect,
  monitorRect: XYCoord,
  canvasScrollLeft: number,
  canvasScrollTop: number,
  unitWidth: number,
  unitHeight: number,
  componentW: number,
  componentH: number,
  edgeWidth: number,
): DragPosition {
  // mouse position
  const relativeX = monitorRect.x - canvasRect.x + canvasScrollLeft
  const relativeY = monitorRect.y - canvasRect.y + canvasScrollTop

  // middle calc position
  const centerX = (relativeX - edgeWidth) / unitWidth
  const centerY = (relativeY - edgeWidth) / unitHeight

  // panel position
  const squareX = Math.floor(centerX - componentW / 2)
  const squareY = Math.floor(centerY - componentH / 2)

  // real position
  const renderX = relativeX - (componentW * unitWidth) / 2 - edgeWidth
  const renderY = relativeY - (componentH * unitHeight) / 2 - edgeWidth

  return {
    relativeX,
    relativeY,
    squareX,
    squareY,
    renderX,
    renderY,
  } as DragPosition
}

function calculateXY(
  x: number,
  y: number,
  unitWidth: number,
  unitHeight: number,
): [l: number, t: number] {
  return [x * unitWidth + 1, y * unitHeight + 1]
}

function renderDotSquare(blockRows: number, blockColumns: number): ReactNode {
  let rowsDot: ReactNode[] = []
  for (let i = 0; i < blockRows + 1; i++) {
    let columnsDot: ReactNode[] = []
    for (let j = 0; j < blockColumns + 1; j++) {
      columnsDot.push(<span key={`column: ${i},${j}`} css={dotStyle} />)
    }
    rowsDot.push(
      <div key={`row: ${i}`} css={applyDotRowsStyle(i == blockRows)}>
        {columnsDot}
      </div>,
    )
  }
  return <>{rowsDot}</>
}

function renderChildren(
  childrenNode: {
    [key: string]: any
  } | null,
  unitWidth: number,
  unitHeight: number,
): ReactNode[] | null {
  if (childrenNode == null) {
    return null
  }
  return Object.keys(childrenNode).map<ReactNode>((key) => {
    const item = childrenNode[key]

    const h = item.h * unitHeight
    const w = item.w * unitWidth

    const [l, t] = calculateXY(item.x, item.y, unitWidth, unitHeight)

    switch (item.containerType) {
      case "EDITOR_DOT_PANEL":
        return <DotPanel componentNode={item} key={item.displayName} />
      case "EDITOR_DOTTED_LINE_SQUARE":
        return (
          <DottedLineSquare
            css={applyDragObjectStyle(t, l)}
            h={h}
            w={w}
            key={item.displayName}
          />
        )
      case "EDITOR_SCALE_SQUARE":
        return (
          <ScaleSquare
            key={item.displayName}
            css={applyDragObjectStyle(t, l)}
            componentNode={item}
            h={h}
            w={w}
          />
        )
      default:
        return null
    }
  })
}

export const DotPanel: FC<DotPanelProps> = (props) => {
  const { componentNode, ...otherProps } = props

  const canvasRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  // window
  const { width, height } = useWindowSize()

  // canvas field
  const edgeWidth = 6
  const [canvasHeight, setCanvasHeight] = useState<number | null>(null)
  const [canvasWidth, setCanvasWidth] = useState<number | null>(null)
  const blockColumns = 64
  const [blockRows, setBlockRows] = useState(0)

  // block field
  const unitHeight = useSelector(getUnitSize).unitHeight
  const unitWidth = useSelector(getUnitSize).unitWidth

  // other field
  const showDot = useSelector<RootState, boolean>(isShowDot, (pre, after) => {
    return pre === after
  })

  const bottomPanelOpenState = useSelector(isOpenBottomPanel)
  const leftPanelOpenState = useSelector(isOpenLeftPanel)
  const rightPanelOpenState = useSelector(isOpenRightPanel)

  // drag shadow
  const dragShadowMap = useSelector(getDragShadowMap)

  // calculate height
  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      if (container.getBoundingClientRect().height < (canvasHeight ?? 0)) {
        return
      }
      const finalBlockRows = Math.ceil(
        (container.getBoundingClientRect().height - edgeWidth) / unitHeight,
      )
      const finalHeight = finalBlockRows * unitHeight + 2
      setBlockRows(finalBlockRows)
      setCanvasHeight(finalHeight)
    }
  }, [height, bottomPanelOpenState])

  // calculate width
  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      const finalBlockWidth =
        (container.getBoundingClientRect().width -
          edgeWidth * 2 -
          (blockColumns + 1) * 2) /
          blockColumns +
        2
      dispatch(configActions.updateUnitWidth(finalBlockWidth))
      setCanvasWidth(container.getBoundingClientRect().width - edgeWidth * 2)
    }
  }, [width, leftPanelOpenState, rightPanelOpenState])

  const [collectedInfo, dropTarget] = useDrop<
    ComponentNode,
    DropResultInfo,
    DropCollectedInfo
  >(
    () => ({
      accept: ["components"],
      drop: (item, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          return
        }
        dispatch(configActions.updateShowDot(false))
        const monitorRect = monitor.getClientOffset()
        const canvasRect = canvasRef.current?.getBoundingClientRect()
        const canvasScrollLeft = canvasRef.current?.scrollLeft
        const canvasScrollTop = canvasRef.current?.scrollTop
        if (
          monitorRect != null &&
          canvasRect != null &&
          canvasScrollLeft != null &&
          canvasScrollTop != null
        ) {
          const { squareX, squareY } = calculateDragPosition(
            canvasRect,
            monitorRect,
            canvasScrollLeft,
            canvasScrollTop,
            unitWidth,
            unitHeight,
            item.w,
            item.h,
            edgeWidth,
          )
          // set scale line
          const newItem = {
            ...item,
          } as ComponentNode
          newItem.parentNode = componentNode.displayName
          newItem.containerType = "EDITOR_SCALE_SQUARE"
          newItem.x = squareX
          newItem.y = squareY
          // remove drag
          dispatch(
            dragShadowActions.removeDragShadowReducer(newItem.displayName),
          )
          // add component
          dispatch(componentsActions.addOrUpdateComponentReducer(newItem))
        }
        return {} as DropResultInfo
      },
      hover: (item, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          return
        }
        dispatch(configActions.updateShowDot(true))
        const monitorRect = monitor.getClientOffset()
        const canvasRect = canvasRef.current?.getBoundingClientRect()
        const canvasScrollLeft = canvasRef.current?.scrollLeft
        const canvasScrollTop = canvasRef.current?.scrollTop
        if (
          monitorRect != null &&
          canvasRect != null &&
          canvasScrollLeft != null &&
          canvasScrollTop != null
        ) {
          const { squareX, squareY, renderX, renderY } = calculateDragPosition(
            canvasRect,
            monitorRect,
            canvasScrollLeft,
            canvasScrollTop,
            unitWidth,
            unitHeight,
            item.w,
            item.h,
            edgeWidth,
          )

          // reduce render
          const currentDrag =
            store.getState().currentApp.editor.dragShadow.map[item.displayName]
          if (currentDrag !== null && currentDrag !== undefined) {
            if (
              renderX == currentDrag.renderX &&
              renderY == currentDrag.renderY
            ) {
              return
            }
          }

          // set shadow
          const renderDragShadow = {
            displayName: item.displayName,
            renderX,
            renderY,
            w: item.w * unitWidth,
            h: item.h * unitHeight,
            isConflict: false,
          } as DragShadow
          dispatch(
            dragShadowActions.addOrUpdateDragShadowReducer(renderDragShadow),
          )

          // reduce render
          const currentDottedLine = searchDsl(
            store.getState().currentApp.editor.components.rootDsl,
            item.displayName,
          )
          if (currentDottedLine != null) {
            if (
              squareX == currentDottedLine.x &&
              squareY == currentDottedLine.y
            ) {
              return
            }
          }
          // set dotted line
          const newItem = {
            ...item,
          } as ComponentNode
          newItem.parentNode = componentNode.displayName
          newItem.containerType = "EDITOR_DOTTED_LINE_SQUARE"
          newItem.x = squareX
          newItem.y = squareY
          dispatch(componentsActions.addOrUpdateComponentReducer(newItem))
        }
      },
    }),
    [unitWidth, unitHeight],
  )

  const dragShadows = useMemo<ReactNode[]>(() => {
    return Object.keys(dragShadowMap).map<ReactNode>((value, index, array) => {
      const item = dragShadowMap[value]
      return (
        <DragShadowSquare
          key={item.displayName}
          css={applyDragObjectStyle(item.renderY, item.renderX)}
          h={item.h}
          w={item.w}
        />
      )
    })
  }, [dragShadowMap])

  return (
    <div
      ref={mergeRefs(canvasRef, dropTarget)}
      css={applyScaleStyle(canvasHeight)}
      {...otherProps}
    >
      {showDot && (
        <div css={applyChildrenContainerStyle(canvasWidth, canvasHeight)}>
          {renderDotSquare(blockRows, blockColumns)}
        </div>
      )}
      <div css={applyChildrenContainerStyle(canvasWidth, canvasHeight)}>
        {renderChildren(componentNode.childrenNode, unitWidth, unitHeight)}
      </div>
      <div css={applyChildrenContainerStyle(canvasWidth, canvasHeight)}>
        {dragShadows}
      </div>
    </div>
  )
}

DotPanel.displayName = "DotPanel"
