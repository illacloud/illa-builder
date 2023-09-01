import { FC, memo } from "react"
import { ActionPanelLabelProps } from "./interface"
import { actionPanelLabelContainerStyle } from "./style"

const ActionPanelLabel: FC<ActionPanelLabelProps> = (props) => {
  const { name } = props
  return <span css={actionPanelLabelContainerStyle}>{name}</span>
}

ActionPanelLabel.displayName = "ActionPanelLabel"

export default memo(ActionPanelLabel)
