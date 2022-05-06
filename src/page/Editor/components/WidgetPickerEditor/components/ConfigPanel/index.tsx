import { FC, HTMLAttributes } from "react"

interface ConfigPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const ConfigPanel: FC<ConfigPanelProps> = (props) => {
  const { className } = props

  return <div className={className}>ConfigPanelProps</div>
}

ConfigPanel.displayName = "ConfigPanel"
