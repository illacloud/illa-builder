import { FC, ReactNode } from "react"
import { actionPanelStyle } from "@/page/App/components/Actions/ActionPanel/style"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import { MysqlPanel } from "./MysqlPanel"
import { RestApiPanel } from "@/page/App/components/Actions/ActionPanel/RestApiPanel"
import { TransformerPanel } from "@/page/App/components/Actions/ActionPanel/TransformerPanel"

export const ActionPanel: FC = () => {
  const selectedAction = useSelector(getSelectedAction)
  // null selected
  if (selectedAction === null) {
    return null
  }
  let actionPanel: ReactNode
  switch (selectedAction.actionType) {
    case "mysql":
      actionPanel = <MysqlPanel action={selectedAction} />
      break
    case "restapi":
      actionPanel = <RestApiPanel action={selectedAction} />
      break
    case "transformer":
      actionPanel = <TransformerPanel action={selectedAction} />
      break
    case "mongodb":
      break
    case "redis":
      break
    case "postgresql":
      break
    default:
      break
  }
  return (
    <div css={actionPanelStyle}>
      <ActionTitleBar action={selectedAction} />
      {actionPanel}
    </div>
  )
}

ActionPanel.displayName = "ActionPanel"
