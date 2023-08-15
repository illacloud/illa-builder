import { FC, memo } from "react"
import { spaceStyle } from "./style"

const ActionPanelSpace: FC = () => {
  return <div css={spaceStyle} />
}

ActionPanelSpace.displayName = "ActionPanelSpace"

export default memo(ActionPanelSpace)
