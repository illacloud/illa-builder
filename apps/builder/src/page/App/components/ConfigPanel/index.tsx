import { configPanelStyle } from "./style"
import { InspectPanel } from "@/page/App/components/InspectPanel"
import { Divider } from "@illa-design/react"
import { FC, HTMLAttributes } from "react"

interface ConfigPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const ConfigPanel: FC<ConfigPanelProps> = (props) => {
  const { className } = props

  return (
    <div className={className} css={configPanelStyle}>
      <Divider />
      <InspectPanel />
    </div>
  )
}

ConfigPanel.displayName = "ConfigPanel"
