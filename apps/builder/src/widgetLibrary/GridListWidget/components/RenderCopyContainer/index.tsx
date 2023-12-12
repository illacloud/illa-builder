import { FC } from "react"
import { RenderComponentCanvasWithJson } from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainerWithJson"
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
      containerPadding={0}
      columnNumber={columnNumber}
      displayNamePrefix={displayNamePrefix}
    />
  ) : null
}

export default RenderCopyContainer
