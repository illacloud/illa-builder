import { FC, MutableRefObject, useRef } from "react"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { RenderComponentCanvasWithJson } from "@/page/App/components/DotPanel/renderComponentCanvasWithJSON"
import { CONTAINER_TYPE } from "@/redux/currentApp/editor/components/componentsState"
import { BasicContainerProps } from "./interface"
import { basicContainerWrapperStyle } from "./style"

export const BasicContainer: FC<BasicContainerProps> = (props) => {
  const {
    componentNode,
    canResizeY = true,
    minHeight,
    padding,
    safeRowNumber = 8,
    addedRowNumber = 8,
    blockColumns,
  } = props
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)

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
        safeRowNumber={safeRowNumber}
        addedRowNumber={addedRowNumber}
        blockColumns={blockColumns}
      />
    </div>
  )
}

export const BasicContainerWithJSON: FC<BasicContainerProps> = (props) => {
  const {
    componentNode,
    canResizeY = true,
    minHeight,
    padding,
    safeRowNumber = 8,
    addedRowNumber = 8,
    blockColumns,
  } = props
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)
  return (
    <div
      css={basicContainerWrapperStyle(canResizeY, padding)}
      ref={(node) => {
        containerRef.current = node
      }}
    >
      <RenderComponentCanvasWithJson
        componentNode={componentNode}
        containerPadding={4}
        containerRef={containerRef}
        canResizeY={canResizeY}
        minHeight={minHeight}
        safeRowNumber={safeRowNumber}
        addedRowNumber={addedRowNumber}
        blockColumns={blockColumns}
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
