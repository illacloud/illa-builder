import { FC } from "react"
import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "@/page/App/components/InspectPanel/interface"
import { canRenderField } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import RenderFieldAndLabel from "../FieldAndLabel"
import RenderPanelBar from "../Panelbar"
import { FieldFactoryProps } from "./interface"

const FieldFactory: FC<FieldFactoryProps> = (props) => {
  const { panelConfig, displayName, widgetProps } = props

  if (!displayName || !panelConfig || !panelConfig.length) return null
  return (
    <>
      {panelConfig.map((item: PanelConfig) => {
        const canRender = canRenderField(item as PanelFieldConfig, widgetProps)

        if (!canRender) return null
        const { id } = item as PanelFieldGroupConfig

        const key = `${id}-${displayName}`

        if ((item as PanelFieldGroupConfig).groupName) {
          return (
            <RenderPanelBar
              key={key}
              config={item as PanelFieldGroupConfig}
              displayName={displayName}
              widgetProps={widgetProps}
            />
          )
        } else if ((item as PanelFieldConfig).setterType) {
          return (
            <RenderFieldAndLabel
              key={key}
              config={item as PanelFieldConfig}
              displayName={displayName}
              parentAttrName=""
            />
          )
        }

        return null
      })}
    </>
  )
}

FieldFactory.displayName = "FieldFactory"

export default FieldFactory
