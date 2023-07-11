import { FC, HTMLAttributes, lazy } from "react"
import { Divider } from "@illa-design/react"
import { FocusManager } from "@/utils/focusManager"
import { configPanelStyle } from "./style"

interface ConfigPanelProps extends HTMLAttributes<HTMLDivElement> {}

const InspectPanel = lazy(() => import("@/page/App/components/InspectPanel"))

const ConfigPanel: FC<ConfigPanelProps> = (props) => {
  const { className } = props

  return (
    <div
      className={className}
      css={configPanelStyle}
      onClick={() => {
        FocusManager.switchFocus("components_config")
      }}
    >
      <Divider />
      <InspectPanel />
    </div>
  )
}

ConfigPanel.displayName = "ConfigPanel"
export default ConfigPanel
