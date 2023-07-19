import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { Loading, TriggerProvider } from "@illa-design/react"
import { useInitHistoryApp } from "@/hooks/useInitHistoryApp"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
} from "@/illa-public-component/UserRoleUtils/interface"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import {
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  loadingStyle,
  middlePanelStyle,
  rightPanelStyle,
} from "@/page/App/style"
import { SnapShotList } from "@/page/History/components/SnapShotList"
import { setupConfigListeners } from "@/redux/config/configListener"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { startAppListening } from "@/store"

export const History: FC = () => {
  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentUserRole = teamInfo?.myRole

  // check if user can manage the app
  if (currentUserRole) {
    const canEditApp = canManage(
      currentUserRole,
      ATTRIBUTE_GROUP.APP,
      ACTION_MANAGE.EDIT_APP,
    )
    if (!canEditApp) {
      throw new Error("You don't have permission to edit this app")
    }
  }

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupExecutionListeners(startAppListening),
      setupComponentsListeners(startAppListening),
      setupActionListeners(startAppListening),
      setupConfigListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  // init app
  const { loadingState, contentLoading } = useInitHistoryApp()

  return (
    <div css={editorContainerStyle}>
      {loadingState ? (
        <div css={loadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      ) : (
        <div css={contentStyle}>
          <div css={middlePanelStyle}>
            {contentLoading ? (
              <div css={loadingStyle}>
                <Loading colorScheme="techPurple" />
              </div>
            ) : (
              <TriggerProvider renderInBody zIndex={10}>
                <CanvasPanel css={centerPanelStyle} />
              </TriggerProvider>
            )}
          </div>
          <TriggerProvider renderInBody zIndex={10}>
            <SnapShotList css={rightPanelStyle} />
          </TriggerProvider>
        </div>
      )}
    </div>
  )
}

export default History

History.displayName = "History"
