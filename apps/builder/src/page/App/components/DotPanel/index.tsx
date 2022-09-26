import { FC, useRef } from "react"
import { DotPanelProps } from "@/page/App/components/DotPanel/interface"
import { applyScaleStyle } from "@/page/App/components/DotPanel/style"
import { useSelector } from "react-redux"
import { getPreviewEdgeWidth } from "@/redux/config/configSelector"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"

export const DotPanel: FC<DotPanelProps> = props => {
  const { componentNode, ...otherProps } = props

  // canvas field
  const edgeWidth = useSelector(getPreviewEdgeWidth)

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      css={applyScaleStyle(componentNode.verticalResize, edgeWidth)}
      {...otherProps}
      ref={containerRef}
    >
      <RenderComponentCanvas
        componentNode={componentNode}
        containerRef={containerRef}
        containerPadding={edgeWidth}
      />
    </div>
  )
}

DotPanel.displayName = "DotPanel"
