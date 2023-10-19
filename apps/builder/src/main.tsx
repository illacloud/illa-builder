import { ILLAMixpanel } from "@illa-public/mixpanel-utils"
import { initDateReport, initDayjs } from "@illa-public/utils"
import * as Sentry from "@sentry/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import "@/api/http/base"
import "@/i18n/config"
import App from "./App"
import store from "./store"

if (
  import.meta.env.ILLA_APP_ENV &&
  import.meta.env.ILLA_APP_ENV !== "development" &&
  import.meta.env.ILLA_INSTANCE_ID === "CLOUD" &&
  import.meta.env.ILLA_SENTRY_SERVER_API
) {
  Sentry.init({
    dsn: import.meta.env.ILLA_SENTRY_SERVER_API,
    integrations: [new Sentry.BrowserTracing()],
    environment: import.meta.env.ILLA_APP_ENV,
    tracesSampleRate: 1.0,
    release: `illa-builder@${import.meta.env.ILLA_APP_VERSION}`,
  })
}

initDateReport()
ILLAMixpanel.setDeviceID()
initDayjs()

const root = createRoot(document.getElementById("root")!!)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
