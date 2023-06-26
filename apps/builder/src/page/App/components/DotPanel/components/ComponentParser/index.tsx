import { FC } from "react"
import { useSelector } from "react-redux"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"
import { ModalScaleSquare } from "@/page/App/components/ScaleSquare/modalScaleSquare"
import { getExecutionWidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionSelector"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ComponentParserProps } from "./interface"

export const ComponentParser: FC<ComponentParserProps> = (props) => {
  const { displayName, unitW, parentNodeDisplayName, columnNumber } = props

  const widgetLayoutInfo = useSelector(getExecutionWidgetLayoutInfo)
  const currentWidgetLayoutInfo = widgetLayoutInfo[displayName]
  const containerType = currentWidgetLayoutInfo.containerType
  const widgetType = currentWidgetLayoutInfo.widgetType

  switch (containerType) {
    case "EDITOR_DOT_PANEL":
      return (
        <BasicContainer
          displayName={displayName}
          minHeight={600}
          columnNumber={64}
        />
      )
    case "EDITOR_SCALE_SQUARE":
      if (widgetType === "MODAL_WIDGET") {
        return (
          <ModalScaleSquare
            displayName={displayName}
            widgetType={widgetType}
            unitW={unitW}
            parentNodeDisplayName={parentNodeDisplayName}
            columnNumber={columnNumber}
          />
        )
      }

      return (
        <ScaleSquare
          displayName={displayName}
          widgetType={widgetType}
          unitW={unitW}
          parentNodeDisplayName={parentNodeDisplayName}
          columnNumber={columnNumber}
        />
      )

    default:
      return null
  }
}
