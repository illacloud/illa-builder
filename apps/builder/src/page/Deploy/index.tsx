import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { useBeforeUnload } from "react-router-dom"
import { Loading, TriggerProvider } from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { useInitBuilderApp } from "@/hooks/useInitApp"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import {
  deployContainerStyle,
  deployLogoStyle,
  loadingStyle,
  logoStyle,
} from "@/page/Deploy/style"
import { Page404 } from "@/page/status/404"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { startAppListening } from "@/store"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"

export const Deploy: FC = () => {
  const { loadingState, errorState } = useInitBuilderApp("production")
  const currentApp = useSelector(getAppInfo)

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY)
  })

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupComponentsListeners(startAppListening),
      setupExecutionListeners(startAppListening),
    ]
    document.title = currentApp.appName
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [currentApp.appName])

  if (errorState) return <Page404 />

  return (
    <div css={deployContainerStyle}>
      {loadingState && (
        <div css={loadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      )}
      <TriggerProvider renderInBody zIndex={10}>
        {!loadingState && <CanvasPanel />}
      </TriggerProvider>
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
