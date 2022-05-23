import { FC, useContext, useMemo } from "react"
import { PanelHeader } from "./header"
import { Divider } from "@illa-design/divider"
import { fieldFactory } from "./utils/fieldFactory"
import { ConfigPanelContext } from "./context"
import { panelBuilder } from "@/wrappedComponents/PanelBuilder"

export const InspectPanel: FC = () => {
  const { componentDsl } = useContext(ConfigPanelContext)

  const panelConfig = useMemo(() => {
    const componentType = componentDsl.type
    return panelBuilder(componentType)
  }, [componentDsl])

  return panelConfig && componentDsl ? (
    <div style={{ width: "100%" }}>
      <Divider />
      <PanelHeader
        meta={{ componentId: "testId", componentType: "testType" }}
      />
      <Divider />
      <div style={{ maxHeight: "calc(100vh - 150px )", overflowY: "scroll" }}>
        {fieldFactory(panelConfig, componentDsl.id)}
      </div>
    </div>
  ) : (
    <div>No components selected. Click on a component to select it.</div>
  )
}

InspectPanel.displayName = "InspectPanel"
