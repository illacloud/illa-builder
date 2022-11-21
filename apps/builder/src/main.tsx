import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"
import "@/i18n/config"
import "@/utils/dayjs"

import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"

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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)
