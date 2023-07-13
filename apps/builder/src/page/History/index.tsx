import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { TriggerProvider } from "@illa-design/react"
import { Connection } from "@/api/ws"
import {
  ILLA_WEBSOCKET_CONTEXT,
  ILLA_WEBSOCKET_STATUS,
} from "@/api/ws/interface"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
} from "@/illa-public-component/UserRoleUtils/interface"
import { AppLoading } from "@/page/App/components/AppLoading"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { ComponentsManager } from "@/page/App/components/ComponentManager"
import {
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  middlePanelStyle,
  rightPanelStyle,
} from "@/page/App/style"
import { setupConfigListeners } from "@/redux/config/configListener"
import { getAppWSStatus, isOpenRightPanel } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { collaboratorsActions } from "@/redux/currentApp/collaborators/collaboratorsSlice"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { startAppListening } from "@/store"
import { Shortcut } from "@/utils/shortcut"

export const Editor: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let { appId } = useParams()

  const currentUser = useSelector(getCurrentUser)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const wsStatus = useSelector(getAppWSStatus)

  const currentUserRole = teamInfo?.myRole

  const handleLeaveRoom = useCallback(() => {
    Connection.leaveRoom("app", appId ?? "")
  }, [appId])

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
    if (currentUser != null && currentUser.userId != "") {
      Connection.enterRoom("app", appId ?? "")
      window.addEventListener("beforeunload", handleLeaveRoom)
    }
    return () => {
      handleLeaveRoom()
      dispatch(
        collaboratorsActions.setInRoomUsers({
          inRoomUsers: [],
        }),
      )
      dispatch(
        configActions.updateWSStatusReducer({
          context: ILLA_WEBSOCKET_CONTEXT.APP,
          wsStatus: ILLA_WEBSOCKET_STATUS.CLOSED,
        }),
      )
      window.removeEventListener("beforeunload", handleLeaveRoom)
    }
  }, [currentUser, appId, handleLeaveRoom, dispatch])

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupExecutionListeners(startAppListening),
      setupComponentsListeners(startAppListening),
      setupActionListeners(startAppListening),
      setupConfigListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  const showRightPanel = useSelector(isOpenRightPanel)

  // init app
  const { loadingState } = useInitBuilderApp("edit")

  const combineLoadingState =
    loadingState ||
    wsStatus === ILLA_WEBSOCKET_STATUS.INIT ||
    wsStatus === ILLA_WEBSOCKET_STATUS.CONNECTING

  return (
    <div css={editorContainerStyle}>
      {combineLoadingState ? (
        <AppLoading />
      ) : (
        <Shortcut>
          <div css={contentStyle}>
            <div css={middlePanelStyle}>
              <TriggerProvider renderInBody zIndex={10}>
                <CanvasPanel css={centerPanelStyle} />
              </TriggerProvider>
            </div>
            {showRightPanel && (
              <TriggerProvider renderInBody zIndex={10}>
                <ComponentsManager css={rightPanelStyle} />
              </TriggerProvider>
            )}
          </div>
        </Shortcut>
      )}
    </div>
  )
}

export default Editor

Editor.displayName = "Editor"
