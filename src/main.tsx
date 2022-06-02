import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"

async function startMockWorker() {
  const { worker } = await import("./mocks/browser")
  await worker.start()
}

if (import.meta.env.DEV) {
  await startMockWorker()
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)
