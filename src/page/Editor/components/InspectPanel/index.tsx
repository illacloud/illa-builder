import { FC, useContext, useMemo } from "react"
import PanelHeader from "./header"
import { Divider } from "@illa-design/divider"
import { fieldFactory } from "./utils/fieldFactory"
// TODO: wait componentTypeMapConfig
import { CONFIG } from "../../../../wrappedComponents/Text/panelConfig"
import { ConfigPanelContext } from "./context"

const InspectPanel: FC = () => {
  const { componentDsl } = useContext(ConfigPanelContext)

  //TODO: wait componentTypeMapConfig
  const panelConfig = useMemo(() => {
    return CONFIG
  }, [])

  return panelConfig && componentDsl ? (
    <div style={{ width: "100%" }}>
      <Divider />
      <PanelHeader
        meta={{ componentId: "testId", componentType: "testType" }}
      />
      <Divider />
      <div>{fieldFactory(CONFIG, componentDsl.id)}</div>
    </div>
  ) : (
    <div>No components selected. Click on a component to select it.</div>
  )
}

export default InspectPanel
