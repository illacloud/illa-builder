import { ComponentTreeNode } from "@illa-public/public-types"
import { FC, ReactNode, useMemo } from "react"
import useMeasure from "react-use-measure"
import { DEFAULT_BODY_COLUMNS_NUMBER } from "@/page/App/components/DotPanel/constant/canvas"
import ScaleSquareWithJSON from "@/page/App/components/ScaleSquare/scaleSquareWithJSON"
import { outerComponentCanvasContainerWithJsonStyle } from "./style"

export const RenderComponentCanvasWithJson: FC<{
  componentNode: ComponentTreeNode
  containerPadding: number
  columnNumber?: number
  canAutoScroll?: boolean
  displayNamePrefix?: string
}> = (props) => {
  const {
    componentNode,
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
  }, [columnNumber, componentNode.childrenNode, displayNamePrefix, unitWidth])

  return (
    <div
      css={outerComponentCanvasContainerWithJsonStyle(containerPadding)}
      ref={canvasRef}
      data-list-widget-container
    >
      {componentTree}
    </div>
  )
}
