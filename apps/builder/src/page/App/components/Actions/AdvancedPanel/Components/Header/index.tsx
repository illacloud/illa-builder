import { FC } from "react"
import { AdvancedPanelHeaderProps } from "./interface"
import { advancedPanelHeaderContainerStyle } from "./style"

export const AdvancedPanelHeader: FC<AdvancedPanelHeaderProps> = (props) => {
  const { title } = props
  return <h3 css={advancedPanelHeaderContainerStyle}>{title}</h3>
}
