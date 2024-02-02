import { FC, memo } from "react"
import { useSelector } from "react-redux"
import ScaleSquare from "@/page/App/components/ScaleSquare"
import { ModalScaleSquare } from "@/page/App/components/ScaleSquare/modalScaleSquare"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import { ComponentParserProps } from "./interface"

const ComponentParser: FC<ComponentParserProps> = (props) => {
  const { displayName, unitW, parentNodeDisplayName, columnNumber } = props

  const widgetLayoutInfo = useSelector(getClientWidgetLayoutInfo)
  const currentWidgetLayoutInfo = widgetLayoutInfo[displayName]
  const containerType = currentWidgetLayoutInfo.containerType
  const widgetType = currentWidgetLayoutInfo.widgetType

  switch (containerType) {
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

ComponentParser.displayName = "ComponentParser"

export default memo(ComponentParser)
