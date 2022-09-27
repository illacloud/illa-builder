import { FC, useEffect } from "react"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import {
  deployContainerStyle,
  deployLogoStyle,
  logoStyle,
} from "@/page/Deploy/style"
import { Loading } from "@illa-design/loading"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import { Unsubscribe } from "@reduxjs/toolkit"
import { startAppListening } from "@/store"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { Button } from "@illa-design/button"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"

export const Deploy: FC = () => {
  const loadingState = useInitBuilderApp("production")

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupExecutionListeners(startAppListening),
    ]
    return () => subscriptions.forEach(unsubscribe => unsubscribe())
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
