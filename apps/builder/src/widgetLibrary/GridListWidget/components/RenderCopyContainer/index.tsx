import { FC } from "react"
import { RenderComponentCanvasWithJson } from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainerWithJson"
import { LIKE_CONTAINER_WIDGET_PADDING } from "@/page/App/components/ScaleSquare/constant/widget"
import { RenderCopyContainerProps } from "@/widgetLibrary/GridListWidget/interface"

const RenderCopyContainer: FC<RenderCopyContainerProps> = (props) => {
  const {
    templateComponentNodes,
    templateContainerHeight: _templateContainerHeight,
    columnNumber,
    displayNamePrefix,
  } = props
  return templateComponentNodes ? (
    <RenderComponentCanvasWithJson
      componentNode={templateComponentNodes}
      containerPadding={LIKE_CONTAINER_WIDGET_PADDING}
      columnNumber={columnNumber}
      displayNamePrefix={displayNamePrefix}
    />
  ) : null
}

export default RenderCopyContainer
