import { FC, useRef } from "react"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { BasicContainerProps } from "./interface"
import { basicContainerWrapperStyle } from "./style"

export const BasicContainer: FC<BasicContainerProps> = (props) => {
  const { componentNode } = props
  const containerRef = useRef<HTMLDivElement>(null)
  console.log("ComponentNode", componentNode)
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
