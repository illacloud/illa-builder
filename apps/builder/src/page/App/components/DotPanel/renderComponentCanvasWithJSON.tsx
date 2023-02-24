import {
  FC,
  MutableRefObject,
  ReactNode,
  RefObject,
  useMemo,
  useRef,
} from "react"
import useMeasure from "react-use-measure"
import { applyComponentCanvasStyle } from "@/page/App/components/DotPanel/style"
import { ScaleSquareWithJSON } from "@/page/App/components/ScaleSquare"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

const UNIT_HEIGHT = 8
const BASIC_BLOCK_COLUMNS = 64

export const RenderComponentCanvasWithJson: FC<{
  componentNode: ComponentNode
  containerRef: RefObject<HTMLDivElement>
  containerPadding: number
  minHeight?: number
  canResizeY?: boolean
  safeRowNumber: number
  blockColumns?: number
  addedRowNumber: number
  canAutoScroll?: boolean
}> = (props) => {
  const {
    componentNode,
    minHeight,
    canResizeY = true,
    safeRowNumber,
    blockColumns = BASIC_BLOCK_COLUMNS,
    addedRowNumber,
  } = props

  const [canvasRef, bounds] = useMeasure()
  const currentCanvasRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

  const unitWidth = useMemo(() => {
    return bounds.width / blockColumns
  }, [blockColumns, bounds.width])

  const componentTree = useMemo<ReactNode>(() => {
    const childrenNode = componentNode.childrenNode
    return childrenNode?.map<ReactNode>((item) => {
      const h = item.h * UNIT_HEIGHT
      const w = item.w * unitWidth
      const x = item.x * unitWidth
      const y = item.y * UNIT_HEIGHT

      switch (item.containerType) {
        case "EDITOR_DOT_PANEL":
          return (
            <BasicContainer
              componentNode={item}
              key={item.displayName}
              canResizeY={canResizeY}
              minHeight={minHeight}
              safeRowNumber={safeRowNumber}
              addedRowNumber={addedRowNumber}
              blockColumns={blockColumns}
            />
          )
        case "EDITOR_SCALE_SQUARE":
          const widget = widgetBuilder(item.type)
          if (!widget) return null
          return (
            <ScaleSquareWithJSON
              key={item.displayName}
              componentNode={item}
              h={h}
              w={w}
              x={x}
              y={y}
              unitW={unitWidth}
              unitH={UNIT_HEIGHT}
              blockColumns={blockColumns}
            />
          )
        default:
          return null
      }
    })
  }, [
    addedRowNumber,
    blockColumns,
    canResizeY,
    componentNode.childrenNode,
    minHeight,
    safeRowNumber,
    unitWidth,
  ])

  return (
    <div
      ref={(node) => {
        currentCanvasRef.current = node
        canvasRef(node)
      }}
      id="realCanvas"
      css={applyComponentCanvasStyle(
        bounds.width,
        bounds.height,
        bounds.width / blockColumns,
        UNIT_HEIGHT,
        false,
        0,
        minHeight,
      )}
    >
      {componentTree}
    </div>
  )
}
