import { FC, useContext, useMemo } from "react"
import { PanelHeader } from "./header"
import { Divider } from "@illa-design/divider"
import { fieldFactory } from "./utils/fieldFactory"
import { panelBuilder } from "@/wrappedComponents/PanelBuilder"
import { SelectedPanelContext } from "@/page/Editor/components/InspectPanel/context/selectedContext"

export const InspectPanel: FC = () => {
  const { panelConfig } = useContext(SelectedPanelContext)

  const builderPanelConfig = useMemo(() => {
    const componentType = panelConfig.type
    return panelBuilder(componentType)
  }, [panelConfig])

  return builderPanelConfig ? (
    <div style={{ width: "100%" }}>
      <Divider />
      <PanelHeader
        meta={{ componentId: "testId", componentType: "testType" }}
      />
      <Divider />
      <div style={{ maxHeight: "calc(100vh - 150px )", overflowY: "scroll" }}>
        {fieldFactory(builderPanelConfig, panelConfig.id)}
      </div>
    </div>
  ) : (
    <div>No components selected. Click on a component to select it.</div>
  )
}

InspectPanel.displayName = "InspectPanel"
