import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import { AppLoading } from "@/page/App/components/AppLoading"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { PageNavBar } from "@/page/App/components/PageNavBar"
import {
  contentStyle,
  editorContainerStyle,
  middlePanelStyle,
  navbarStyle,
} from "@/page/App/style"
import { setupConfigListeners } from "@/redux/config/configListener"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { startAppListening } from "@/store"

const Onboarding: FC = () => {
  const { loadingState } = useInitBuilderApp("template-edit")

  const currentApp = useSelector(getAppInfo)

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupComponentsListeners(startAppListening),
      setupExecutionListeners(startAppListening),
      setupActionListeners(startAppListening),
      setupConfigListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  useEffect(() => {
    document.title = currentApp.appName
  }, [currentApp.appName])

  return (
    <div css={editorContainerStyle}>
      {loadingState ? (
        <AppLoading />
      ) : (
        <>
          <PageNavBar css={navbarStyle} />
          <div css={contentStyle}>
            <div css={middlePanelStyle}>
              <CanvasPanel />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Onboarding

Onboarding.displayName = "Onboarding"
