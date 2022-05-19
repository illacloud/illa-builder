import { FC, HTMLAttributes } from "react"
import InspectPanel from "@/page/Editor/components/InspectPanel"
import ConfigPanelProvider from "@/page/Editor/components/InspectPanel/context"

interface ConfigPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const ConfigPanel: FC<ConfigPanelProps> = (props) => {
  const { className } = props

  return (
    <div className={className} style={{ width: "100%" }}>
      <ConfigPanelProvider>
        <InspectPanel />
      </ConfigPanelProvider>
    </div>
  )
}

ConfigPanel.displayName = "ConfigPanel"
