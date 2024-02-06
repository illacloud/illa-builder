import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import {
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
} from "@illa-public/user-data"
import { canManage } from "@illa-public/user-role-utils"
import { ACTION_MANAGE, ATTRIBUTE_GROUP } from "@illa-public/user-role-utils"
import { Unsubscribe } from "@reduxjs/toolkit"
import { motion, useAnimation } from "framer-motion"
import { FC, MouseEvent, useCallback, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useBeforeUnload, useParams } from "react-router-dom"
import { TriggerProvider, WarningCircleIcon } from "@illa-design/react"
import { Connection, fixedWsURL } from "@/api/ws"
import {
  ILLA_WEBSOCKET_CONTEXT,
  ILLA_WEBSOCKET_STATUS,
} from "@/api/ws/interface"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import { ActionEditor } from "@/page/App/Module/ActionEditor"
import { CanvasPanel } from "@/page/App/Module/CanvasPanel"
import { ComponentsManager } from "@/page/App/Module/ComponentManager"
import { AppLoading } from "@/page/App/components/AppLoading"
import { Debugger } from "@/page/App/components/Debugger"
import { setupConfigListeners } from "@/redux/config/configListener"
import {
  getAppWSStatus,
  getIsOnline,
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { collaboratorsActions } from "@/redux/currentApp/collaborators/collaboratorsSlice"
import { setupComponentsListeners } from "@/redux/currentApp/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { setupLayoutInfoListeners } from "@/redux/currentApp/layoutInfo/layoutInfoListener"
import { fetchAppBinaryWsUrl, fetchAppTextWsUrl } from "@/services/public"
import { startAppListening } from "@/store"
import { MediaSourceLoadProvider } from "@/utils/mediaSourceLoad"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"
import { Shortcut } from "@/utils/shortcut"
import LeftPanel from "./Module/LeftPanel"
import { PageNavBar } from "./Module/PageNavBar"
import { useResize } from "./components/ScaleSquare/components/ResizingAndDragContainer/ResizeHandler/hooks"
import {
  bottomPanelStyle,
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  messageWrapperStyle,
  middlePanelStyle,
  modalStyle,
  navbarStyle,
  waringIconStyle,
} from "./style"

export const Editor: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { appId } = useParams()
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
      getPlanUtils(teamInfo),
      ACTION_MANAGE.EDIT_APP,
    )
    if (!canEditApp) {
      throw new Error("You don't have permission to edit this app")
    }
  }
  useEffect(() => {
    const abortController = new AbortController()
    if (currentUser != null && currentUser.userID != "" && appId) {
      Promise.all([
        fetchAppTextWsUrl(appId, abortController.signal),
        fetchAppBinaryWsUrl(appId, abortController.signal),
      ])
        .then((res) => {
          Connection.enterAppRoom(
            fixedWsURL(res[0].data.wsURL),
            fixedWsURL(res[1].data.wsURL),
            appId as string,
          )
        })
        .catch(() => {})
      window.addEventListener("beforeunload", handleLeaveRoom)
    }
    return () => {
      abortController.abort()
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
      setupLayoutInfoListeners(startAppListening),
      setupComponentsListeners(startAppListening),
      setupActionListeners(startAppListening),
      setupConfigListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

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

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR)
  })

  const [, resizeDropRef] = useResize()

  const appInfo = useSelector(getAppInfo)

  const combineLoadingState =
    loadingState ||
    wsStatus === ILLA_WEBSOCKET_STATUS.INIT ||
    wsStatus === ILLA_WEBSOCKET_STATUS.CONNECTING

  return (
    <>
      <Helmet>
        <title>{appInfo.appName}</title>
      </Helmet>
      <div css={editorContainerStyle} ref={resizeDropRef}>
        {combineLoadingState && <AppLoading />}
        {!combineLoadingState && (
          <Shortcut>
            <MediaSourceLoadProvider>
              <TriggerProvider renderInBody zIndex={10}>
                <PageNavBar css={navbarStyle} />
              </TriggerProvider>
              <div css={contentStyle}>
                <LeftPanel />
                <div css={middlePanelStyle}>
                  <TriggerProvider renderInBody zIndex={10}>
                    <CanvasPanel css={centerPanelStyle} />
                  </TriggerProvider>
                  <TriggerProvider renderInBody zIndex={10}>
                    {showBottomPanel && !showDebugger ? <ActionEditor /> : null}
                  </TriggerProvider>
                  {showDebugger && <Debugger css={bottomPanelStyle} />}
                </div>
                {showRightPanel && (
                  <TriggerProvider renderInBody zIndex={10}>
                    <ComponentsManager />
                  </TriggerProvider>
                )}
              </div>
              {!isOnline && (
                <div css={modalStyle} onMouseDown={handleMouseDownOnModal}>
                  <motion.div css={messageWrapperStyle} animate={controls}>
                    <WarningCircleIcon css={waringIconStyle} />
                    {wsStatus === ILLA_WEBSOCKET_STATUS.LOCKING
                      ? t("editor.history.message.version_change")
                      : t("not_online_tips")}
                  </motion.div>
                </div>
              )}
            </MediaSourceLoadProvider>
          </Shortcut>
        )}
      </div>
    </>
  )
}

export default Editor

Editor.displayName = "Editor"
