import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import {
  DotPanelProps,
  DropCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  applyChildrenContainerStyle,
  applyDotRowsStyle,
  applyDragShadowPosition,
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
} from "@/redux/currentApp/config/configSelector"
import { useDrop } from "react-dnd"
import { mergeRefs } from "@illa-design/system"
import { configActions } from "@/redux/currentApp/config/configSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DragShadowSquare } from "@/page/App/components/DragShadowSquare"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getDragShadowMap } from "@/redux/currentApp/editor/dragShadow/dragShadowSelector"
import { DragShadow } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"

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

function renderChildren(childrenNode: ComponentNode[] | null): ReactNode {
  if (childrenNode == null) {
    return null
  }
  return <></>
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
  const [showDot, setShowDot] = useState(false)

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
        const newItem = {
          ...item,
        } as ComponentNode
        newItem.containerType = "EDITOR_SCALE_SQUARE"
        newItem.parentNode = componentNode.displayName
        dispatch(componentsActions.updateDropComponent(newItem))
        setShowDot(false)
        return {} as DropResultInfo
      },
      hover: (item, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          return
        }
        setShowDot(true)
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
          const relativePositionX =
            monitorRect.x - canvasRect.x + canvasScrollLeft
          const relativePositionY =
            monitorRect.y - canvasRect.y + canvasScrollTop

          // panel position
          const centerX = Math.floor(relativePositionX / unitWidth)
          const centerY = Math.floor(relativePositionY / unitHeight)
          const squareX = centerX - Math.floor(item.w / 2)
          const squareY = centerY - Math.floor(item.h / 2)

          // real position
          const renderX = relativePositionX - (item.w * unitWidth) / 2
          const renderY = relativePositionY - (item.h * unitHeight) / 2

          // set shadow
          const renderDragShadow = {
            displayName: item.displayName,
            renderX: renderX,
            renderY: renderY,
            width: item.w * unitWidth,
            height: item.h * unitHeight,
            isConflict: false,
          } as DragShadow
          dispatch(
            dragShadowActions.addOrUpdateDragShadowReducer(renderDragShadow),
          )

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
    const list: ReactNode[] = []
    Object.keys(dragShadowMap).map((value, index, array) => {
      const item = dragShadowMap[value]
      list.push(
        <DragShadowSquare
          css={applyDragShadowPosition(item.renderY, item.renderX)}
          height={item.height}
          width={item.width}
        />,
      )
    })
    return list
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
        {renderChildren(componentNode.childrenNode)}
      </div>
      <div css={applyChildrenContainerStyle(canvasWidth, canvasHeight)}>
        {dragShadows}
      </div>
    </div>
  )
}

DotPanel.displayName = "DotPanel"
