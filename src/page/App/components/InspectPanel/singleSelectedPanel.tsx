import { FC, useContext, useMemo } from "react"
import { Divider } from "@illa-design/divider"
import { PanelHeader } from "@/page/App/components/InspectPanel/header"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { panelBuilder } from "@/wrappedComponents/PanelBuilder"
import { fieldFactory } from "./utils/fieldFactory"

export const SingleSelectedPanel: FC = () => {
  const { panelConfig } = useContext(SelectedPanelContext)

  const builderPanelConfig = useMemo(() => {
    const componentType = panelConfig.widgetType
    return panelBuilder(componentType)
  }, [panelConfig])

  return (
    builderPanelConfig && (
      <div style={{ width: "100%" }}>
        <Divider />
        <PanelHeader />
        <Divider />
        <div style={{ maxHeight: "calc(100vh - 150px )", overflowY: "scroll" }}>
          {fieldFactory(builderPanelConfig, panelConfig.widgetDisplayName)}
        </div>
      </div>
    )
  )
}

SingleSelectedPanel.displayName = "SingleSelectedPanel"
