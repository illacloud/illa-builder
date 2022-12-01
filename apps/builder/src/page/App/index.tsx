import { Unsubscribe } from "@reduxjs/toolkit"
import { motion, useAnimation } from "framer-motion"
import { FC, MouseEvent, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { WarningCircleIcon } from "@illa-design/react"
import { Api } from "@/api/base"
import { Connection } from "@/api/ws"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import { ActionEditor } from "@/page/App/components/Actions"
import { AppLoading } from "@/page/App/components/AppLoading"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { ComponentsManager } from "@/page/App/components/ComponentManager"
import { Debugger } from "@/page/App/components/Debugger"
import { setupConfigListeners } from "@/redux/config/configListener"
import {
  getIsOnline,
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
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

  useEffect(() => {
    if (currentUser != null && currentUser.userId != "") {
      Connection.enterRoom(
        "app",
        appId ?? "",
        (loading) => {},
        (errorState) => {},
      )
    }
    return () => {
      Connection.leaveRoom("app", appId ?? "")
    }
  }, [currentUser, appId])

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupComponentsListeners(startAppListening),
      setupActionListeners(startAppListening),
      setupConfigListeners(startAppListening),
      setupExecutionListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  const showLeftPanel = useSelector(isOpenLeftPanel)
  const showRightPanel = useSelector(isOpenRightPanel)
  const showBottomPanel = useSelector(isOpenBottomPanel)
  const showDebugger = useSelector(isOpenDebugger)
  const isOnline = useSelector(getIsOnline)

  // init app
  const loadingState = useInitBuilderApp("edit")
  // init resource
  useEffect(() => {
    const controller = new AbortController()
    Api.request<Resource<ResourceContent>[]>(
      {
        url: "/resources",
        method: "GET",
        signal: controller.signal,
      },
      (response) => {
        dispatch(resourceActions.updateResourceListReducer(response.data))
      },
    )
    return () => {
      controller.abort()
    }
  }, [dispatch])

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

  return (
    <div css={editorContainerStyle}>
      {loadingState && <AppLoading />}
      {!loadingState && (
        <Shortcut>
          <PageNavBar css={navbarStyle} />
          <div css={contentStyle}>
            {showLeftPanel && <DataWorkspace css={leftPanelStyle} />}
            <div css={middlePanelStyle}>
              <CanvasPanel css={centerPanelStyle} />
              {showBottomPanel && !showDebugger ? (
                <ActionEditor css={bottomPanelStyle} />
              ) : null}
              {showDebugger && <Debugger css={bottomPanelStyle} />}
            </div>
            {showRightPanel && <ComponentsManager css={rightPanelStyle} />}
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

Editor.displayName = "Editor"
