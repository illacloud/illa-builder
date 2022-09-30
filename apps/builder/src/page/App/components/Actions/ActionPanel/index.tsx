import { FC, ReactNode, useCallback, useRef, useState } from "react"
import { actionPanelStyle } from "@/page/App/components/Actions/ActionPanel/style"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import { MysqlLikePanel } from "./MysqlLikePanel"
import { RestApiPanel } from "@/page/App/components/Actions/ActionPanel/RestApiPanel"
import { TransformerPanel } from "@/page/App/components/Actions/ActionPanel/TransformerPanel"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { onCopyActionItem, onDeleteActionItem } from "../api"
import { ActionResult } from "@/page/App/components/Actions/ActionPanel/ActionResult"
import { ActionResultType } from "@/page/App/components/Actions/ActionPanel/ActionResult/interface"

export const ActionPanel: FC = () => {
  const panelRef = useRef<HTMLDivElement>(null)
  const selectedAction = useSelector(getSelectedAction)
  const [actionResult, setActionResult] = useState<ActionResultType>()

  const run = useCallback((result, error) => {
    setActionResult({ result, error })
  }, [])

  // null selected
  if (selectedAction === null || selectedAction === undefined) {
    return null
  }
  let actionPanel: ReactNode
  switch (selectedAction.actionType) {
    case "mysql":
    case "tidb":
    case "mariadb":
    case "postgresql":
      actionPanel = (
        <MysqlLikePanel
          action={selectedAction as ActionItem<MysqlLikeAction>}
        />
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
  }

  return (
    <div css={actionPanelStyle} ref={panelRef}>
      <ActionTitleBar
        action={selectedAction}
        onCopy={onCopyActionItem}
        onDelete={onDeleteActionItem}
        onActionRun={run}
      />
      {actionPanel}
      <ActionResult
        result={actionResult}
        onClose={() => {
          setActionResult(undefined)
        }}
      />
    </div>
  )
}

ActionPanel.displayName = "ActionPanel"
