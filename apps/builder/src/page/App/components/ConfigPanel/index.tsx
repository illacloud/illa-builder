import { FC, HTMLAttributes } from "react"
import { Divider } from "@illa-design/react"
import { InspectPanel } from "@/page/App/components/InspectPanel"
import { FocusManager } from "@/utils/focusManager"
import { configPanelStyle } from "./style"

interface ConfigPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const ConfigPanel: FC<ConfigPanelProps> = (props) => {
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
