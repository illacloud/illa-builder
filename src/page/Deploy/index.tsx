import { FC, useEffect } from "react"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { deployContainerStyle, deployLogoStyle } from "@/page/Deploy/style"
import { Loading } from "@illa-design/loading"
import { ReactComponent as DeployLogo } from "@assets/deploy-powered-by.svg"
import { Unsubscribe } from "@reduxjs/toolkit"
import { setupDependenciesListeners } from "@/redux/currentApp/executionTree/dependencies/dependenciesListener"
import { startAppListening } from "@/store"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/execution/executionListener"
import { useInitBuilderApp } from "@/hooks/useInitApp"

export const Deploy: FC = () => {
  const loadingState = useInitBuilderApp("production")

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupDependenciesListeners(startAppListening),
      setupExecutionListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  return (
    <div css={deployContainerStyle}>
      {loadingState && (
        <div>
          <Loading colorScheme="techPurple" />
        </div>
      )}
      {!loadingState && <CanvasPanel />}
      <DeployLogo
        css={deployLogoStyle}
        onClick={() => {
          window.open("https://illacloud.com", "_blank")
        }}
      />
    </div>
  )
}

Deploy.displayName = "Deploy"
