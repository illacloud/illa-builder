import { FC, ReactNode, useEffect, useRef, useState } from "react"
import {
  DotPanelProps,
  DropCollectedInfo,
  DropPanelInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  applyScaleStyle,
  dotRowsStyle,
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
import { BaseDSL, WidgetCardInfo } from "@/wrappedComponents/interface"
import { mergeRefs } from "@illa-design/system"
import { configActions } from "@/redux/currentApp/config/configSlice"
import * as Console from "console"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

function renderDotSquare(rows: number, columns: number): ReactNode {
  let rowsDot: ReactNode[] = []
  for (let i = 0; i < rows; i++) {
    let columnsDot: ReactNode[] = []
    for (let j = 0; j < columns; j++) {
      columnsDot.push(<span key={`column: ${i},${j}`} css={dotStyle} />)
    }
    rowsDot.push(
      <div key={`row: ${i}`} css={dotRowsStyle}>
        {columnsDot}
      </div>,
    )
  }
  return <>{rowsDot}</>
}

export const DotPanel: FC<DotPanelProps> = (props) => {
  const { scale = 100, ...otherProps } = props

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
  const [showDot, setShowDot] = useState(true)

  const bottomPanelOpenState = useSelector(isOpenBottomPanel)
  const leftPanelOpenState = useSelector(isOpenLeftPanel)
  const rightPanelOpenState = useSelector(isOpenRightPanel)

  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      if (container.getBoundingClientRect().height < (canvasHeight ?? 0)) {
        return
      }
      const finalBlockRows = Math.ceil(
        (container.getBoundingClientRect().height - edgeWidth * 2) / unitHeight,
      )
      const finalHeight = finalBlockRows * unitHeight
      setBlockRows(finalBlockRows)
      setCanvasHeight(finalHeight)
    }
  }, [height, bottomPanelOpenState])

  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      const finalBlockWidth =
        container.getBoundingClientRect().width / blockColumns
      dispatch(configActions.updateUnitWidth(finalBlockWidth))
      setCanvasWidth(container.getBoundingClientRect().width)
    }
  }, [width, leftPanelOpenState, rightPanelOpenState])

  const [collectedInfo, dropTarget] = useDrop<
    ComponentNode,
    DropPanelInfo,
    DropCollectedInfo
  >(
    () => ({
      accept: ["components"],
      drop: (item, monitor) => {
        return {}
      },
      hover: (item, monitor) => {
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
          console.log(monitorRect.x, monitorRect.y)
          const relativePositionX =
            monitorRect.x - canvasRect.x + canvasScrollLeft
          const relativePositionY =
            monitorRect.y - canvasRect.y + canvasScrollTop
        }
      },
    }),
    [],
  )

  return (
    <div
      ref={mergeRefs(canvasRef, dropTarget)}
      css={applyScaleStyle(scale, canvasHeight)}
      {...otherProps}
    >
      {showDot && renderDotSquare(blockRows + 1, blockColumns + 1)}
    </div>
  )
}

DotPanel.displayName = "DotPanel"
