import { FC, HTMLAttributes } from "react"
import { InspectPanel } from "@/page/App/components/InspectPanel"
import { configBodyStyle } from "./style"

interface ConfigPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const ConfigPanel: FC<ConfigPanelProps> = (props) => {
  const { className } = props

  return (
    <div className={className} css={configBodyStyle}>
      <InspectPanel />
    </div>
  )
}

ConfigPanel.displayName = "ConfigPanel"
