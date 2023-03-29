import { Unsubscribe } from "@reduxjs/toolkit"
import { motion, useAnimation } from "framer-motion"
import { FC, MouseEvent, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { TriggerProvider, WarningCircleIcon } from "@illa-design/react"
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
import { ActionEditor } from "@/page/App/components/Actions"
import { AppLoading } from "@/page/App/components/AppLoading"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { ComponentsManager } from "@/page/App/components/ComponentManager"
import { Debugger } from "@/page/App/components/Debugger"
import { setupConfigListeners } from "@/redux/config/configListener"
import {
  getAppWSStatus,
  getIsOnline,
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { collaboratorsActions } from "@/redux/currentApp/collaborators/collaboratorsSlice"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { startAppListening } from "@/store"
import { Shortcut } from "@/utils/shortcut"
import { DataWorkspace } from "./components/DataWorkspace"
import { PageNavBar } from "./components/PageNavBar"
import {
  bottomPanelStyle,
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  leftPanelStyle,
  messageWrapperStyle,
  middlePanelStyle,
  modalStyle,
  navbarStyle,
  rightPanelStyle,
  waringIconStyle,
} from "./style"

export const Editor: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let { appId } = useParams()
  const controls = useAnimation()

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
      Connection.enterRoom(
        "app",
        appId ?? "",
        (loading) => {},
        (errorState) => {},
      )
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

  const showLeftPanel = useSelector(isOpenLeftPanel)
  const showRightPanel = useSelector(isOpenRightPanel)
  const showBottomPanel = useSelector(isOpenBottomPanel)
  const showDebugger = useSelector(isOpenDebugger)
  const isOnline = useSelector(getIsOnline)

  // init app
  const { loadingState } = useInitBuilderApp("edit")

  const handleMouseDownOnModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      controls
        .start({
          scale: 1.05,
          transition: {
            duration: 0.2,
          },
        })
        .then(() => {
          controls.start({
            scale: 1,
            transition: {
              duration: 0.2,
            },
          })
        })
    },
    [controls],
  )

  const combinLoadingState =
    loadingState ||
    wsStatus === ILLA_WEBSOCKET_STATUS.INIT ||
    wsStatus === ILLA_WEBSOCKET_STATUS.CONNECTING

  return (
    <div css={editorContainerStyle}>
      {combinLoadingState && <AppLoading />}
      {!combinLoadingState && (
        <Shortcut>
          <TriggerProvider renderInBody zIndex={10}>
            <PageNavBar css={navbarStyle} />
          </TriggerProvider>
          <div css={contentStyle}>
            <TriggerProvider renderInBody zIndex={10}>
              {showLeftPanel && <DataWorkspace css={leftPanelStyle} />}
            </TriggerProvider>
            <div css={middlePanelStyle}>
              <TriggerProvider renderInBody zIndex={10}>
                <CanvasPanel css={centerPanelStyle} />
              </TriggerProvider>
              {showBottomPanel && !showDebugger ? (
                <ActionEditor css={bottomPanelStyle} />
              ) : null}
              {showDebugger && <Debugger css={bottomPanelStyle} />}
            </div>
            {showRightPanel && (
              <TriggerProvider renderInBody zIndex={10}>
                <ComponentsManager css={rightPanelStyle} />
              </TriggerProvider>
            )}
          </div>
          {!isOnline && (
            <div css={modalStyle} onMouseDown={handleMouseDownOnModal}>
              <motion.div css={messageWrapperStyle} animate={controls}>
                <WarningCircleIcon css={waringIconStyle} />
                {t("not_online_tips")}
              </motion.div>
            </div>
          )}
        </Shortcut>
      )}
    </div>
  )
}

export default Editor

Editor.displayName = "Editor"
