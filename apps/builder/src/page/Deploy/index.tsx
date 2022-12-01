import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useEffect } from "react"
import { Loading } from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import {
  deployContainerStyle,
  deployLogoStyle,
  logoStyle,
} from "@/page/Deploy/style"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { startAppListening } from "@/store"

export const Deploy: FC = () => {
  const loadingState = useInitBuilderApp("production")

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
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

Deploy.displayName = "Deploy"
