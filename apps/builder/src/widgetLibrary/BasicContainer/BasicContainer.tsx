import { FC, useRef } from "react"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { BasicContainerProps } from "./interface"
import { basicContainerWrapperStyle } from "./style"
import { CONTAINER_TYPE } from "@/redux/currentApp/editor/components/componentsState"

export const BasicContainer: FC<BasicContainerProps> = (props) => {
  const { componentNode } = props
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div css={basicContainerWrapperStyle} ref={containerRef}>
      <RenderComponentCanvas
        componentNode={componentNode}
        containerPadding={4}
        containerRef={containerRef}
        minHeight={props.componentNode.h * props.componentNode.unitH - 6}
      />
    </div>
  )
}

BasicContainer.displayName = "BasicContainer"

export const BasicContainerConfig = {
  type: "CANVAS",
  displayName: "canvas",
  widgetName: "canvas",
  containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
  w: 0,
  h: 0,
}
