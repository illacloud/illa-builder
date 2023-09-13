import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canManage } from "@illa-public/user-role-utils"
import { ACTION_MANAGE, ATTRIBUTE_GROUP } from "@illa-public/user-role-utils"
import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { TriggerProvider } from "@illa-design/react"
import { Guide } from "@/components/Guide"
import { useInitGuideApp } from "@/hooks/useInitGuideApp"
import { ActionEditor } from "@/page/App/components/Actions"
import { AppLoading } from "@/page/App/components/AppLoading"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import ComponentsManager from "@/page/App/components/ComponentManager"
import { DataWorkspace } from "@/page/App/components/DataWorkspace"
import { Debugger } from "@/page/App/components/Debugger"
import { PageNavBar } from "@/page/App/components/PageNavBar"
import {
  bottomPanelStyle,
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  leftPanelStyle,
  middlePanelStyle,
  navbarStyle,
  rightPanelStyle,
} from "@/page/App/style"
import { setupConfigListeners } from "@/redux/config/configListener"
import {
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { getGuideStatus } from "@/redux/guide/guideSelector"
import { startAppListening } from "@/store"
import { Shortcut } from "@/utils/shortcut"
import { useResize } from "../App/components/ScaleSquare/components/InnerResizingContainer/ResizeHandler/hooks"

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
          {isOpen && <Guide canvasRef={canvasRef} />}
          <TriggerProvider renderInBody zIndex={10}>
            <PageNavBar css={navbarStyle} />
          </TriggerProvider>
          <div css={contentStyle}>
            {showLeftPanel && <DataWorkspace css={leftPanelStyle} />}
            <div css={middlePanelStyle}>
              <TriggerProvider renderInBody zIndex={10}>
                <CanvasPanel ref={canvasRef} css={centerPanelStyle} />
              </TriggerProvider>
              {showBottomPanel && !showDebugger ? (
                <ActionEditor
                  data-onboarding-action="actionEditor"
                  css={bottomPanelStyle}
                />
              ) : null}
              {showDebugger && <Debugger css={bottomPanelStyle} />}
            </div>
            {showRightPanel && (
              <TriggerProvider renderInBody zIndex={10}>
                <ComponentsManager
                  data-onboarding-comp="componentsManager"
                  css={rightPanelStyle}
                />
              </TriggerProvider>
            )}
          </div>
        </Shortcut>
      )}
    </div>
  )
}

export default GuideApp

GuideApp.displayName = "GuideApp"
