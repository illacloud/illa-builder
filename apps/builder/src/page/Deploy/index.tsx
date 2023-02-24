import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { Loading } from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import {
  deployContainerStyle,
  deployLogoStyle,
  loadingStyle,
  logoStyle,
} from "@/page/Deploy/style"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { startAppListening } from "@/store"

export const Deploy: FC = () => {
  const loadingState = useInitBuilderApp("production")
  const currentApp = useSelector(getAppInfo)

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupComponentsListeners(startAppListening),
      setupExecutionListeners(startAppListening),
    ]
    document.title = currentApp.appName
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [currentApp.appName])

  return (
    <div css={deployContainerStyle}>
      {loadingState && (
        <div css={loadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      )}
      {!loadingState && <CanvasPanel />}
      <div
        css={deployLogoStyle}
        onClick={() => {
          window.open("https://illacloud.com", "_blank")
        }}
      >
        <span>Powered by</span>
        <Logo css={logoStyle} />
      </div>
    </div>
  )
}

export default Deploy

Deploy.displayName = "Deploy"
