import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import "@/i18n/config"
import "@/utils/dayjs"
import App from "./App"
import store from "./store"

if (
  import.meta.env.VITE_INSTANCE_ID === "CLOUD" &&
  import.meta.env.VITE_SENTRY_SERVER_API
) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_SERVER_API,
    integrations: [new BrowserTracing()],
    environment: import.meta.env.VITE_SENTRY_ENV,
    tracesSampleRate: 1.0,
  })
}

const root = createRoot(document.getElementById("root")!!)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
