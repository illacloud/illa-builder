import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import {
  DotPanelProps,
  DropCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  applyChildrenContainerStyle,
  applyDotContainerStyle,
  applyDotRowsStyle,
  applyDragObjectStyle,
  applyScaleStyle,
  dotStyle,
} from "@/page/App/components/DotPanel/style"
import useWindowSize from "react-use/lib/useWindowSize"
import { useDispatch, useSelector } from "react-redux"
import {
  getScale,
  getUnitSize,
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
  isShowDot,
} from "@/redux/currentApp/config/configSelector"
import { useDrop } from "react-dnd"
import { mergeRefs } from "@illa-design/system"
import { configActions } from "@/redux/currentApp/config/configSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DragShadowSquare } from "@/page/App/components/DragShadowSquare"
import { getDragShadowMap } from "@/redux/currentApp/editor/dragShadow/dragShadowSelector"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import store, { RootState } from "@/store"
import { calculateDragPosition, calculateXY } from "./calc"
import {
  updateDottedLineSquareData,
  updateDragShadowData,
  updateResizeScaleSquare,
  updateScaleSquare,
} from "@/page/App/components/DotPanel/updateData"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { DottedLineSquare } from "@/page/App/components/DottedLineSquare"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"
import { getDottedLineSquareMap } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSelector"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { DragResize } from "@/page/App/components/ScaleSquare/interface"

export const DotPanel: FC<DotPanelProps> = (props) => {
  const { componentNode, ...otherProps } = props

  const canvasRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  // window
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  // scale
  const scale = useSelector(getScale)

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
  // dotted line square
  const dottedLineSquareMap = useSelector(getDottedLineSquareMap)

  // calculate height
  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      const containerHeight =
        container.getBoundingClientRect().height + container.scrollTop

      if (containerHeight < (canvasHeight ?? 0)) {
        return
      }
      const finalBlockRows = Math.ceil(
        (containerHeight - edgeWidth) / unitHeight,
      )
      const finalHeight = finalBlockRows * unitHeight + 2
      setBlockRows(finalBlockRows)
      setCanvasHeight(finalHeight)
    }
  }, [windowHeight, bottomPanelOpenState, scale, canvasRef.current?.scrollTop])

  // calculate width
  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      const containerWidth =
        container.getBoundingClientRect().width + container.scrollLeft
      const finalBlockWidth =
        (containerWidth - edgeWidth * 2 - (blockColumns + 1) * 2) /
          blockColumns +
        2
      dispatch(configActions.updateUnitWidth(finalBlockWidth))
      setCanvasWidth(containerWidth - edgeWidth * 2)
    }
  }, [windowWidth, leftPanelOpenState, rightPanelOpenState, scale])

  // drag move
  const [, dropTarget] = useDrop<
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
        // set dot show
        dispatch(configActions.updateShowDot(false))
        // calc data
        const monitorRect = monitor.getClientOffset()
        const canvasRect = canvasRef.current?.getBoundingClientRect()
        const canvasScrollLeft = canvasRef.current?.scrollLeft
        const canvasScrollTop = canvasRef.current?.scrollTop
        if (
          monitorRect != null &&
          canvasRect != null &&
          canvasScrollLeft != null &&
          canvasScrollTop != null &&
          canvasWidth != null &&
          canvasHeight != null
        ) {
          const { squareX, squareY } = calculateDragPosition(
            canvasRect,
            monitorRect,
            canvasWidth,
            canvasHeight,
            canvasScrollLeft,
            canvasScrollTop,
            unitWidth,
            unitHeight,
            item.w,
            item.h,
            edgeWidth,
            blockColumns,
            blockRows,
            componentNode.verticalResize,
          )
          updateScaleSquare(
            item,
            squareX,
            squareY,
            componentNode.displayName,
            (newItem) => {
              dispatch(componentsActions.addOrUpdateComponentReducer(newItem))
            },
          )
        }
        // remove dotted line square
        dispatch(
          dottedLineSquareActions.removeDottedLineSquareReducer(
            item.displayName,
          ),
        )
        // remove drag
        dispatch(dragShadowActions.removeDragShadowReducer(item.displayName))

        return {} as DropResultInfo
      },
      hover: (item, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          return
        }
        if (store.getState().currentApp.config.showDot == false) {
          dispatch(configActions.updateShowDot(true))
        }

        // calc data
        const monitorRect = monitor.getClientOffset()
        const canvasRect = canvasRef.current?.getBoundingClientRect()
        const canvasScrollLeft = canvasRef.current?.scrollLeft
        const canvasScrollTop = canvasRef.current?.scrollTop
        if (
          monitorRect != null &&
          canvasRect != null &&
          canvasScrollLeft != null &&
          canvasScrollTop != null &&
          canvasWidth != null &&
          canvasHeight != null
        ) {
          const { squareX, squareY, renderX, renderY } = calculateDragPosition(
            canvasRect,
            monitorRect,
            canvasWidth,
            canvasHeight,
            canvasScrollLeft,
            canvasScrollTop,
            unitWidth,
            unitHeight,
            item.w,
            item.h,
            edgeWidth,
            blockColumns,
            blockRows,
            componentNode.verticalResize,
          )
          updateDragShadowData(
            item,
            renderX,
            renderY,
            unitWidth,
            unitHeight,
            canvasWidth,
            canvasHeight,
            edgeWidth,
            componentNode.verticalResize,
            (renderDragShadow) => {
              dispatch(
                dragShadowActions.addOrUpdateDragShadowReducer(
                  renderDragShadow,
                ),
              )
            },
          )
          updateDottedLineSquareData(
            item,
            squareX,
            squareY,
            unitWidth,
            unitHeight,
            (newItem) => {
              dispatch(
                dottedLineSquareActions.addOrUpdateDottedLineSquareReducer(
                  newItem,
                ),
              )
            },
          )
        }
      },
    }),
    [unitWidth, unitHeight, canvasWidth],
  )

  // drag resize
  const [, resizeDropTarget] = useDrop<DragResize>(
    () => ({
      accept: ["resize"],
      drop: (item, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          return
        }
        // set dot show
        dispatch(configActions.updateShowDot(false))
      },
      hover: (item, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          return
        }
        if (store.getState().currentApp.config.showDot == false) {
          dispatch(configActions.updateShowDot(true))
        }
        const monitorRect = monitor.getClientOffset()
        const canvasRect = canvasRef.current?.getBoundingClientRect()
        const canvasScrollLeft = canvasRef.current?.scrollLeft
        const canvasScrollTop = canvasRef.current?.scrollTop
        if (
          monitorRect != null &&
          canvasRect != null &&
          canvasScrollLeft != null &&
          canvasScrollTop != null &&
          canvasWidth != null &&
          canvasHeight != null
        ) {
          const { nearX, nearY } = calculateDragPosition(
            canvasRect,
            monitorRect,
            canvasWidth,
            canvasHeight,
            canvasScrollLeft,
            canvasScrollTop,
            unitWidth,
            unitHeight,
            item.node.w,
            item.node.h,
            edgeWidth,
            blockColumns,
            blockRows,
            componentNode.verticalResize,
          )
          updateResizeScaleSquare(
            item.node,
            blockColumns,
            nearX,
            nearY,
            item.position,
            (i) => {
              dispatch(componentsActions.addOrUpdateComponentReducer(i))
            },
          )
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
          isConflict={item.isConflict}
          css={applyDragObjectStyle(item.renderY, item.renderX)}
          h={item.h}
          w={item.w}
        />
      )
    })
  }, [dragShadowMap])

  const dotSpace = useMemo<ReactNode[]>(() => {
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
    return rowsDot
  }, [windowHeight, windowWidth, canvasHeight, canvasWidth])

  const componentTree = useMemo<ReactNode>(() => {
    const childrenNode = componentNode.childrenNode
    if (childrenNode == null) {
      return null
    }
    return Object.keys(childrenNode).map<ReactNode>((key) => {
      const item = childrenNode[key]

      const h = item.h * unitHeight
      const w = item.w * unitWidth

      const [l, t] = calculateXY(item.x, item.y, unitWidth, unitHeight)
      if (item.isDragging) {
        return null
      }
      switch (item.containerType) {
        case "EDITOR_DOT_PANEL":
          return <DotPanel componentNode={item} key={item.displayName} />
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
  }, [componentNode.childrenNode])

  const dottedLineSquares = useMemo<ReactNode[]>(() => {
    return Object.keys(dottedLineSquareMap).map<ReactNode>(
      (value, index, array) => {
        const item = dottedLineSquareMap[value]
        const h = item.h
        const w = item.w
        const [l, t] = calculateXY(
          item.squareX,
          item.squareY,
          unitWidth,
          unitHeight,
        )
        return (
          <DottedLineSquare
            css={applyDragObjectStyle(t, l)}
            h={h}
            w={w}
            key={item.displayName}
          />
        )
      },
    )
  }, [dottedLineSquareMap])

  return (
    <div
      ref={mergeRefs(canvasRef, mergeRefs(dropTarget, resizeDropTarget))}
      css={applyScaleStyle(componentNode.verticalResize)}
      onClick={(event) => {
        dispatch(configActions.updateSelectedComponent([]))
      }}
      {...otherProps}
    >
      <div css={applyDotContainerStyle(showDot, canvasWidth, canvasHeight)}>
        {dotSpace}
      </div>
      <div css={applyDotContainerStyle(showDot, canvasWidth, canvasHeight)}>
        {dottedLineSquares}
      </div>
      <div css={applyChildrenContainerStyle(canvasWidth, canvasHeight)}>
        {componentTree}
      </div>
      <div css={applyDotContainerStyle(showDot, canvasWidth, canvasHeight)}>
        {dragShadows}
      </div>
    </div>
  )
}

DotPanel.displayName = "DotPanel"
