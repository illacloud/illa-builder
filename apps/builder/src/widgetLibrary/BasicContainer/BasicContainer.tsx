import { FC } from "react"
import { RenderComponentCanvasContainer } from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { RenderComponentCanvasWithJson } from "@/page/App/components/DotPanel/components/Canvas/renderCompontCanvasContainerWithJson"
import { CONTAINER_TYPE } from "@/redux/currentApp/editor/components/componentsState"
import { BasicContainerByJsonProps, BasicContainerProps } from "./interface"

export const BasicContainer: FC<BasicContainerProps> = (props) => {
  const { displayName, columnNumber } = props

  return displayName ? (
    <RenderComponentCanvasContainer
      displayName={displayName}
      containerPadding={4}
      columnNumber={columnNumber}
    />
  ) : null
}

export const BasicContainerWithJSON: FC<BasicContainerByJsonProps> = (
  props,
) => {
  const { componentNode, minHeight, columnNumber, displayNamePrefix } = props

  return componentNode ? (
    <RenderComponentCanvasWithJson
      componentNode={componentNode}
      containerPadding={4}
      minHeight={minHeight}
      columnNumber={columnNumber}
      displayNamePrefix={displayNamePrefix}
    />
  ) : null
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
