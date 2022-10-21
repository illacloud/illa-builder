import { FC, useRef, MutableRefObject } from "react"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { BasicContainerProps } from "./interface"
import { basicContainerWrapperStyle } from "./style"
import { CONTAINER_TYPE } from "@/redux/currentApp/editor/components/componentsState"

export const BasicContainer: FC<BasicContainerProps> = (props) => {
  const { componentNode, canResizeY = true, minHeight, padding } = props
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<
    HTMLDivElement
  >(null)

  return (
    <div
      css={basicContainerWrapperStyle(canResizeY, padding)}
      ref={(node) => {
        containerRef.current = node
      }}
    >
      <RenderComponentCanvas
        componentNode={componentNode}
        containerPadding={4}
        containerRef={containerRef}
        canResizeY={canResizeY}
        minHeight={minHeight}
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

export const generateBasicContainerConfig = (displayName: string) => {
  return {
    ...BasicContainerConfig,
    displayName,
    widgetName: displayName,
  }
}
