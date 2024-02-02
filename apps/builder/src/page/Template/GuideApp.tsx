import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { TriggerProvider } from "@illa-design/react"
import { Guide } from "@/components/Guide"
import { useInitGuideApp } from "@/hooks/useInitGuideApp"
import { ActionEditor } from "@/page/App/Module/ActionEditor"
import { CanvasPanel } from "@/page/App/Module/CanvasPanel"
import ComponentsManager from "@/page/App/Module/ComponentManager"
import { DataWorkspace } from "@/page/App/Module/DataWorkspace"
import { PageNavBar } from "@/page/App/Module/PageNavBar"
import { AppLoading } from "@/page/App/components/AppLoading"
import { Debugger } from "@/page/App/components/Debugger"
import {
  bottomPanelStyle,
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  middlePanelStyle,
  navbarStyle,
} from "@/page/App/style"
import { setupConfigListeners } from "@/redux/config/configListener"
import {
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { setupComponentsListeners } from "@/redux/currentApp/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { setupLayoutInfoListeners } from "@/redux/currentApp/layoutInfo/layoutInfoListener"
import { getGuideStatus } from "@/redux/guide/guideSelector"
import { startAppListening } from "@/store"
import { MediaSourceLoadProvider } from "@/utils/mediaSourceLoad"
import { Shortcut } from "@/utils/shortcut"
import { useResize } from "../App/components/ScaleSquare/components/ResizingAndDragContainer/ResizeHandler/hooks"

const GuideApp: FC = () => {
  const teamInfo = useSelector(getCurrentTeamInfo)

  const canvasRef = useRef<HTMLDivElement>(null)

  const currentUserRole = teamInfo?.myRole

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
    const subscriptions: Unsubscribe[] = [
      setupExecutionListeners(startAppListening),
      setupComponentsListeners(startAppListening),
      setupLayoutInfoListeners(startAppListening),
      setupActionListeners(startAppListening),
      setupConfigListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  const showLeftPanel = useSelector(isOpenLeftPanel)
  const showRightPanel = useSelector(isOpenRightPanel)
  const showBottomPanel = useSelector(isOpenBottomPanel)
  const showDebugger = useSelector(isOpenDebugger)

  // init app
  const { loadingState } = useInitGuideApp()
  const isOpen = useSelector(getGuideStatus)
  const [, resizeDropRef] = useResize()

  return (
    <div css={editorContainerStyle} ref={resizeDropRef}>
      {loadingState && <AppLoading />}
      {!loadingState && (
        <Shortcut>
          <MediaSourceLoadProvider>
            {isOpen && <Guide canvasRef={canvasRef} />}
            <TriggerProvider renderInBody zIndex={10}>
              <PageNavBar css={navbarStyle} />
            </TriggerProvider>
            <div css={contentStyle}>
              {showLeftPanel && <DataWorkspace />}
              <div css={middlePanelStyle}>
                <TriggerProvider renderInBody zIndex={10}>
                  <CanvasPanel ref={canvasRef} css={centerPanelStyle} />
                </TriggerProvider>
                {showBottomPanel && !showDebugger ? <ActionEditor /> : null}
                {showDebugger && <Debugger css={bottomPanelStyle} />}
              </div>
              {showRightPanel && (
                <TriggerProvider renderInBody zIndex={10}>
                  <ComponentsManager />
                </TriggerProvider>
              )}
            </div>
          </MediaSourceLoadProvider>
        </Shortcut>
      )}
    </div>
  )
}

export default GuideApp

GuideApp.displayName = "GuideApp"
