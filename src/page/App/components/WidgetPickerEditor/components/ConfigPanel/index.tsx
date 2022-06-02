import { FC, HTMLAttributes } from "react"
import { InspectPanel } from "@/page/App/components/InspectPanel"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"

interface ConfigPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const ConfigPanel: FC<ConfigPanelProps> = (props) => {
  const { className } = props

  return (
    <div className={className} style={{ width: "100%" }}>
      <SelectedProvider>
        <InspectPanel />
      </SelectedProvider>
    </div>
  )
}

ConfigPanel.displayName = "ConfigPanel"
