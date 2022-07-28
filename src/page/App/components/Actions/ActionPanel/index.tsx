import { FC, ReactNode } from "react"
import { actionPanelStyle } from "@/page/App/components/Actions/ActionPanel/style"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import { MysqlPanel } from "./MysqlPanel"
import { RestApiPanel } from "@/page/App/components/Actions/ActionPanel/RestApiPanel"
import { TransformerPanel } from "@/page/App/components/Actions/ActionPanel/TransformerPanel"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { MysqlAction } from "@/redux/currentApp/action/mysqlAction"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { onCopyActionItem, onDeleteActionItem } from "../api"

export const ActionPanel: FC = () => {
  const selectedAction = useSelector(getSelectedAction)
  // null selected
  if (selectedAction === null || selectedAction === undefined) {
    return null
  }
  let actionPanel: ReactNode
  switch (selectedAction.actionType) {
    case "mysql":
      actionPanel = (
        <MysqlPanel action={selectedAction as ActionItem<MysqlAction>} />
      )
      break
    case "restapi":
      actionPanel = (
        <RestApiPanel
          action={selectedAction as ActionItem<RestApiAction<BodyContent>>}
        />
      )
      break
    case "transformer":
      actionPanel = (
        <TransformerPanel
          action={selectedAction as ActionItem<TransformerAction>}
        />
      )
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
      <ActionTitleBar
        action={selectedAction}
        onCopy={onCopyActionItem}
        onDelete={onDeleteActionItem}
      />
      {actionPanel}
    </div>
  )
}

ActionPanel.displayName = "ActionPanel"
