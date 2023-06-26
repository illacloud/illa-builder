import { FC, ReactNode, useMemo } from "react"
import useMeasure from "react-use-measure"
import { DEFAULT_BODY_COLUMNS_NUMBER } from "@/page/App/components/DotPanel/constant/canvas"
import ScaleSquareWithJSON from "@/page/App/components/ScaleSquare/scaleSquareWithJSON"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { outerComponentCanvasContainerWithJsonStyle } from "./style"

export const RenderComponentCanvasWithJson: FC<{
  componentNode: ComponentNode
  containerPadding: number
  minHeight?: number
  columnNumber?: number
  canAutoScroll?: boolean
  displayNamePrefix?: string
}> = (props) => {
  const {
    componentNode,
    minHeight,
    columnNumber = DEFAULT_BODY_COLUMNS_NUMBER,
    displayNamePrefix,
    containerPadding,
  } = props

  const [canvasRef, bounds] = useMeasure()

  const unitWidth = useMemo(() => {
    return bounds.width / columnNumber
  }, [columnNumber, bounds.width])

  const componentTree = useMemo<ReactNode>(() => {
    const childrenNode = componentNode.childrenNode
    return childrenNode?.map<ReactNode>((item) => {
      switch (item.containerType) {
        case "EDITOR_DOT_PANEL":
          return (
            <BasicContainer
              displayName={item.displayName}
              key={item.displayName}
              minHeight={minHeight}
              columnNumber={columnNumber}
            />
          )
        case "EDITOR_SCALE_SQUARE":
          return (
            <ScaleSquareWithJSON
              key={item.displayName}
              componentNode={item}
              unitW={unitWidth}
              columnNumber={columnNumber}
              displayNamePrefix={displayNamePrefix}
            />
          )
        default:
          return null
      }
    })
  }, [
    columnNumber,
    componentNode.childrenNode,
    displayNamePrefix,
    minHeight,
    unitWidth,
  ])

  return (
    <div
      css={outerComponentCanvasContainerWithJsonStyle(containerPadding)}
      ref={canvasRef}
    >
      {componentTree}
    </div>
  )
}
