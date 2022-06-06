import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { DotPanelProps } from "@/page/App/components/DotPanel/interface"
import {
  applyScaleStyle,
  dotRowsStyle,
  dotStyle,
} from "@/page/App/components/DotPanel/style"
import useWindowSize from "react-use/lib/useWindowSize"

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
  // window
  const { width, height } = useWindowSize()

  // canvas field
  const edgeWidth = 6
  const [canvasHeight, setCanvasHeight] = useState<number | null>(null)
  const [canvasWidth, setCanvasWidth] = useState<number | null>(null)
  const blockColumns = 64
  const [blockRows, setBlockRows] = useState(0)

  // block field
  const unitHeight = 8
  const [unitWidth, setUnitWidth] = useState<number>()

  // other field
  const [showDot, setShowDot] = useState(true)

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
  }, [height])

  useEffect(() => {
    if (canvasRef.current != null) {
      const container = canvasRef.current
      const finalBlockWidth =
        container.getBoundingClientRect().width / blockColumns
      setUnitWidth(finalBlockWidth)
      setCanvasWidth(container.getBoundingClientRect().width)
    }
  }, [width])

  return (
    <div
      ref={canvasRef}
      css={applyScaleStyle(scale, canvasHeight)}
      {...otherProps}
    >
      {showDot && renderDotSquare(blockRows + 1, blockColumns + 1)}
    </div>
  )
}

DotPanel.displayName = "DotPanel"
