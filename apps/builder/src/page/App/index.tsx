import { FC, useEffect } from "react"
import { PageNavBar } from "./components/PageNavBar"
import { DataWorkspace } from "./components/DataWorkspace"
import {
  bottomPanelStyle,
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  leftPanelStyle,
  middlePanelStyle,
  navbarStyle,
  rightPanelStyle,
} from "./style"
import { Connection } from "@/api/ws"
import { useDispatch, useSelector } from "react-redux"
import {
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { startAppListening } from "@/store"
import { Unsubscribe } from "@reduxjs/toolkit"
import { Api } from "@/api/base"
import { useParams } from "react-router-dom"
import { Shortcut } from "@/utils/shortcut"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { AppLoading } from "@/page/App/components/AppLoading"
import { ActionEditor } from "@/page/App/components/Actions"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { Debugger } from "@/page/App/components/Debugger"
import { ComponentsManager } from "@/page/App/components/ComponentManager"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { setupConfigListeners } from "@/redux/config/configListener"

export const Editor: FC = () => {
  const dispatch = useDispatch()

  let { appId } = useParams()

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
        </Shortcut>
      )}
    </div>
  )
}

Editor.displayName = "Editor"
