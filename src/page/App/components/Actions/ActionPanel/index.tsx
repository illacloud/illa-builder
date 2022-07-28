import { FC, ReactNode } from "react"
import { actionPanelStyle } from "@/page/App/components/Actions/ActionPanel/style"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import { MysqlPanel } from "./MysqlPanel"
import { RestApiPanel } from "@/page/App/components/Actions/ActionPanel/RestApiPanel"
import { TransformerPanel } from "@/page/App/components/Actions/ActionPanel/TransformerPanel"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { MysqlAction } from "@/redux/currentApp/action/mysqlAction"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { Api } from "@/api/base"
import { Message } from "@illa-design/message"
import i18n from "@/i18n/config"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { configActions } from "@/redux/config/configSlice"
import { useParams } from "react-router-dom"
import { omit } from "@illa-design/system"

export const ActionPanel: FC = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const baseActionUrl = `/apps/${params.appId}/actions`
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

  function onCopyActionItem(action: ActionItem<ActionContent>) {
    const newAction = omit(action, ["displayName", "actionId"])
    const displayName = DisplayNameGenerator.getDisplayName(action.actionType)
    const data: Partial<ActionItem<{}>> = {
      ...newAction,
      displayName,
    }
    Api.request(
      {
        url: baseActionUrl,
        method: "POST",
        data,
      },
      ({ data }: { data: ActionItem<ActionContent> }) => {
        Message.success(
          i18n.t("editor.action.action_list.message.success_created"),
        )
        dispatch(actionActions.addActionItemReducer(data))
        dispatch(configActions.updateSelectedAction(data))
      },
      () => {
        Message.error(i18n.t("editor.action.action_list.message.failed"))
        DisplayNameGenerator.removeDisplayName(displayName)
      },
      () => {},
      (loading) => {},
    )
  }

  function onDeleteActionItem(action: ActionItem<ActionContent>) {
    console.log("onDeleteActionItem", action)

    const { actionId } = action
    Api.request(
      {
        url: `${baseActionUrl}/${actionId}`,
        method: "DELETE",
      },
      ({ data }: { data: ActionItem<ActionContent> }) => {
        const { displayName } = data
        DisplayNameGenerator.removeDisplayName(displayName)
        dispatch(actionActions.removeActionItemReducer(displayName))
        Message.success(i18n.t("dashboard.resources.trash_success"))
      },
      () => {
        Message.error(i18n.t("editor.action.action_list.message.failed"))
      },
      () => {},
      (loading) => {},
    )
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
