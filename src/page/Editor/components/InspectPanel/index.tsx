import { FC, useContext, useMemo } from "react"
import { PanelHeader } from "./header"
import { Divider } from "@illa-design/divider"
import { fieldFactory } from "./utils/fieldFactory"
import { panelBuilder } from "@/wrappedComponents/PanelBuilder"
import { SelectedPanelContext } from "@/page/Editor/components/InspectPanel/context/selectedContext"

export const InspectPanel: FC = () => {
  const { configPanel } = useContext(SelectedPanelContext)

  const panelConfig = useMemo(() => {
    const componentType = configPanel.type
    return panelBuilder(componentType)
  }, [configPanel])

  return panelConfig ? (
    <div style={{ width: "100%" }}>
      <Divider />
      <PanelHeader
        meta={{ componentId: "testId", componentType: "testType" }}
      />
      <Divider />
      <div style={{ maxHeight: "calc(100vh - 150px )", overflowY: "scroll" }}>
        {fieldFactory(panelConfig, configPanel.id)}
      </div>
    </div>
  ) : (
    <div>No components selected. Click on a component to select it.</div>
  )
}

InspectPanel.displayName = "InspectPanel"
