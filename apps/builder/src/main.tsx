import userDataStore from "@illa-public/user-data"
import * as Sentry from "@sentry/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import "@/i18n/config"
import "@/utils/dayjs"
import App from "./App"
import store from "./store"

if (
  process.env.ILLA_APP_ENV &&
  process.env.ILLA_APP_ENV !== "development" &&
  process.env.ILLA_INSTANCE_ID === "CLOUD" &&
  process.env.ILLA_SENTRY_SERVER_API
) {
  Sentry.init({
    dsn: process.env.ILLA_SENTRY_SERVER_API,
    integrations: [new Sentry.BrowserTracing()],
    environment: process.env.ILLA_APP_ENV,
    tracesSampleRate: 1.0,
    release: `illa-builder@${process.env.ILLA_APP_VERSION}`,
  })
}

if (
  process.env.ILLA_APP_ENV &&
  process.env.ILLA_APP_ENV !== "development" &&
  process.env.ILLA_INSTANCE_ID === "CLOUD"
) {
  const firstScript = document.createElement("script")
  const sendScript = document.createElement("script")
  sendScript.innerHTML = `    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag("js", new Date())
    gtag("config", "FQ9MQWP2B6")`
  firstScript.async = true
  firstScript.src = "https://www.googletagmanager.com/gtag/js?id=G-FQ9MQWP2B6"
  document.body.append(firstScript)
  document.body.append(sendScript)
}

const root = createRoot(document.getElementById("root")!!)

root.render(
  <StrictMode>
    <Provider store={userDataStore}>
      <Provider store={store}>
        <App />
      </Provider>
    </Provider>
  </StrictMode>,
)
