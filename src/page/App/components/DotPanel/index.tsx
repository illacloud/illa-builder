import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import {
  DotPanelProps,
  DropCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  applyChildrenContainerStyle,
  applyDotCanvasStyle,
  applyDragObjectStyle,
  applyScaleStyle,
} from "@/page/App/components/DotPanel/style"
import { useDispatch, useSelector } from "react-redux"
import {
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
  isShowDot,
} from "@/redux/config/configSelector"
import { useDrop } from "react-dnd"
import { mergeRefs } from "@illa-design/system"
import { configActions } from "@/redux/config/configSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getDragShadowMap } from "@/redux/currentApp/editor/dragShadow/dragShadowSelector"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import store, { RootState } from "@/store"
import { calculateDragPosition, calculateNearXY, calculateXY } from "./calc"
import {
  updateDottedLineSquareData,
  updateDragShadowData,
  updateResizeScaleSquare,
  updateScaleSquare,
} from "@/page/App/components/DotPanel/updateData"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"
import { getDottedLineSquareMap } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSelector"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { DragResize } from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import useWindowSize from "react-use/lib/useWindowSize"

export const DotPanel: FC<DotPanelProps> = (props) => {
  const { componentNode, ...otherProps } = props

  const canvasRef = useRef<HTMLDivElement>(null)
  const componentsTreeRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  // window
  const { width, height } = useWindowSize()

  // canvas field
  const edgeWidth = 18
  const [canvasHeight, setCanvasHeight] = useState<number>(0)
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const blockColumns = 64
  const [minBlockRows, setMinBlockRows] = useState(0)
  const [blockRows, setBlockRows] = useState(0)

  // block field
  const unitHeight = 8
  const [unitWidth, setUnitWidth] = useState(0)

  // other field
  const showDot = useSelector<RootState, boolean>(isShowDot, (pre, after) => {
    return pre === after
  })

  // config
  const leftPanelState = useSelector(isOpenLeftPanel)
  const rightPanelState = useSelector(isOpenRightPanel)
  const bottomPanelState = useSelector(isOpenBottomPanel)

  // drag shadow
  const dragShadowMap = useSelector(getDragShadowMap)

  // dotted line square
  const dottedLineSquareMap = useSelector(getDottedLineSquareMap)

  // calculate first height
  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      const containerHeight = container.scrollHeight
      let finalBlockRows = Math.ceil(
        (containerHeight - edgeWidth * 2) / unitHeight,
      )
      if (finalBlockRows < minBlockRows) {
        finalBlockRows = minBlockRows
      }
      const finalHeight = finalBlockRows * unitHeight
      setBlockRows(finalBlockRows)
      setMinBlockRows(finalBlockRows)
      setCanvasHeight(finalHeight)
    }
  }, [bottomPanelState, height])

  // calculate scale height
  useEffect(() => {
    const finalHeight = blockRows * unitHeight
    if (finalHeight != canvasHeight) {
      setCanvasHeight(finalHeight)
    }
  }, [blockRows])

  // calculate width
  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      const containerWidth = container.clientWidth
      const finalBlockWidth =
        (containerWidth - edgeWidth * 2 - (blockColumns + 1) * 2) /
          blockColumns +
        2
      setUnitWidth(finalBlockWidth)
      setCanvasWidth(containerWidth - edgeWidth * 2)
    }
  }, [canvasRef.current?.scrollWidth, leftPanelState, rightPanelState, width])

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
        const calculateResult = calculateDragPosition(
          item,
          canvasWidth,
          canvasHeight,
          canvasRef.current!!.scrollLeft,
          canvasRef.current!!.scrollTop,
          unitWidth,
          unitHeight,
          edgeWidth,
          blockColumns,
          blockRows,
          componentNode.verticalResize,
          componentNode.displayName,
          canvasRef.current!!.getBoundingClientRect(),
          monitor.getClientOffset()!!,
          monitor.getInitialClientOffset()!!,
          monitor.getInitialSourceClientOffset()!!,
        )
        // set scale square
        updateScaleSquare(
          item,
          calculateResult.squareX,
          calculateResult.squareY,
          componentNode.displayName,
          (newItem) => {
            dispatch(componentsActions.addOrUpdateComponentReducer(newItem))
            dispatch(
              componentsActions.updateComponentPropsReducer({
                displayName: newItem.displayName,
                updateSlice: newItem.props ?? {},
              }),
            )
            dispatch(configActions.updateSelectedComponent([newItem]))
          },
        )
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
        // set dot show
        if (store.getState().config.showDot == false) {
          dispatch(configActions.updateShowDot(true))
        }
        const calculateResult = calculateDragPosition(
          item,
          canvasWidth,
          canvasHeight,
          canvasRef.current!!.scrollLeft,
          canvasRef.current!!.scrollTop,
          unitWidth,
          unitHeight,
          edgeWidth,
          blockColumns,
          blockRows,
          componentNode.verticalResize,
          componentNode.displayName,
          canvasRef.current!!.getBoundingClientRect(),
          monitor.getClientOffset()!!,
          monitor.getInitialClientOffset()!!,
          monitor.getInitialSourceClientOffset()!!,
        )
        // scale panel
        if (componentNode.verticalResize) {
          if (calculateResult.squareY + item.h > blockRows) {
            setBlockRows(blockRows + 20)
          }
        }
        // drag shadow
        updateDragShadowData(
          item,
          calculateResult.renderX,
          calculateResult.renderY,
          unitWidth,
          unitHeight,
          canvasWidth,
          canvasHeight,
          edgeWidth,
          componentNode.verticalResize,
          (renderDragShadow) => {
            dispatch(
              dragShadowActions.addOrUpdateDragShadowReducer(renderDragShadow),
            )
          },
        )
        // dotted line square
        updateDottedLineSquareData(
          item,
          calculateResult.squareX,
          calculateResult.squareY,
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
      },
    }),
    [canvasWidth, canvasHeight],
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
        if (store.getState().config.showDot == false) {
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
          const [nearX, nearY] = calculateNearXY(
            canvasRect,
            monitorRect,
            canvasScrollLeft,
            canvasScrollTop,
            unitWidth,
            unitHeight,
            edgeWidth,
          )
          // scale panel
          if (componentNode.verticalResize) {
            if (nearY > blockRows) {
              setBlockRows(blockRows + 20)
            }
          }
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
    [canvasWidth, canvasHeight],
  )

  // render drag
  useEffect(() => {
    let canvas = document.getElementById(`${componentNode.displayName}-dragged`)
    if (canvas != null) {
      let dotCanvas = canvas as HTMLCanvasElement
      const ctx = dotCanvas.getContext("2d")
      if (ctx != null) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight + edgeWidth)
        const ratio = window.devicePixelRatio
        ctx.scale(ratio, ratio)
        Object.keys(dragShadowMap).forEach((value) => {
          const item = dragShadowMap[value]
          ctx.beginPath()
          ctx.rect(item.renderX, item.renderY, item.w, item.h)
          ctx.closePath()
          ctx.fillStyle = item.isConflict
            ? globalColor(`--${illaPrefix}-red-06`)
            : globalColor(`--${illaPrefix}-techPurple-06`)
          ctx.fill()
        })
      }
    }
  }, [dragShadowMap, canvasHeight, canvasWidth])

  // render dot
  useEffect(() => {
    let canvas = document.getElementById(`${componentNode.displayName}-canvas`)
    if (canvas != null) {
      let dotCanvas = canvas as HTMLCanvasElement
      const ctx = dotCanvas.getContext("2d")
      if (ctx != null) {
        const ratio = window.devicePixelRatio
        ctx.clearRect(0, 0, canvasWidth, canvasHeight + edgeWidth)
        ctx.scale(ratio, ratio)
        for (let i = 1; i < blockRows; i++) {
          for (let j = 1; j < blockColumns; j++) {
            ctx.beginPath()
            const x = j * unitWidth + 1
            const y = i * unitHeight + 1
            ctx.arc(x, y, 1, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.fillStyle = globalColor(`--${illaPrefix}-grayBlue-08`)
            ctx.fill()
          }
        }
        ctx.beginPath()
        ctx.rect(0, 0, canvasWidth, canvasHeight)
        ctx.closePath()
        ctx.strokeStyle = globalColor(`--${illaPrefix}-grayBlue-08`)
        ctx.stroke()
      }
    }
  }, [canvasHeight, canvasWidth])

  // render dotted line
  useEffect(() => {
    let canvas = document.getElementById(`${componentNode.displayName}-dotted`)
    if (canvas != null) {
      let dotCanvas = canvas as HTMLCanvasElement
      const ctx = dotCanvas.getContext("2d")
      if (ctx != null) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight + edgeWidth)
        Object.keys(dottedLineSquareMap).forEach((value) => {
          const item = dottedLineSquareMap[value]
          const h = item.h
          const w = item.w
          const [l, t] = calculateXY(
            item.squareX,
            item.squareY,
            unitWidth,
            unitHeight,
          )
          const ratio = window.devicePixelRatio
          ctx.scale(ratio, ratio)
          ctx.beginPath()
          ctx.setLineDash([4, 2])
          ctx.rect(l, t, w, h)
          ctx.closePath()
          ctx.lineWidth = 1
          ctx.strokeStyle = globalColor(`--${illaPrefix}-techPurple-01`)
          ctx.stroke()
        })
      }
    }
  }, [dottedLineSquareMap, canvasHeight, canvasWidth])

  useEffect(() => {
    let maxY = 0
    for (let item in componentNode.childrenNode) {
      maxY = Math.max(
        maxY,
        componentNode.childrenNode[item].y + componentNode.childrenNode[item].h,
      )
    }
    if (maxY < blockRows) {
      setBlockRows(Math.max(maxY, minBlockRows))
    }
  }, [componentNode])

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
      switch (item.containerType) {
        case "EDITOR_DOT_PANEL":
          return <DotPanel componentNode={item} key={item.displayName} />
        case "EDITOR_SCALE_SQUARE":
          return (
            <ScaleSquare
              key={item.displayName}
              css={applyDragObjectStyle(t, l, item.z)}
              componentNode={item}
              h={h}
              w={w}
            />
          )
        default:
          return null
      }
    })
  }, [componentNode.childrenNode, canvasHeight, canvasWidth])

  return (
    <div
      ref={mergeRefs(canvasRef, dropTarget, resizeDropTarget)}
      css={applyScaleStyle(componentNode.verticalResize, edgeWidth)}
      {...otherProps}
    >
      <canvas
        id={`${componentNode.displayName}-canvas`}
        css={applyDotCanvasStyle(edgeWidth, showDot, 0)}
        width={canvasWidth}
        height={canvasHeight + edgeWidth}
      />
      <canvas
        id={`${componentNode.displayName}-dotted`}
        css={applyDotCanvasStyle(edgeWidth, showDot, 1)}
        width={canvasWidth}
        height={canvasHeight + edgeWidth}
      />
      <div
        ref={componentsTreeRef}
        css={applyChildrenContainerStyle(2, canvasWidth, canvasHeight)}
        onClick={(e) => {
          if (e.target == componentsTreeRef.current) {
            dispatch(configActions.updateSelectedComponent([]))
          }
        }}
      >
        {componentTree}
      </div>
      <canvas
        id={`${componentNode.displayName}-dragged`}
        css={applyDotCanvasStyle(edgeWidth, showDot, 100)}
        width={canvasWidth}
        height={canvasHeight + edgeWidth}
      />
    </div>
  )
}

DotPanel.displayName = "DotPanel"
