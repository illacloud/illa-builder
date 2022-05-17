import { FC, HTMLAttributes } from "react"
import InspectPanel from "@/page/Editor/components/InspectPanel"

interface ConfigPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const ConfigPanel: FC<ConfigPanelProps> = (props) => {
  const { className } = props

  return (
    <div className={className} style={{ width: "100%" }}>
      <InspectPanel />
    </div>
  )
}

ConfigPanel.displayName = "ConfigPanel"
