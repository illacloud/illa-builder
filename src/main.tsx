import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"
import { enableMapSet } from "immer"

enableMapSet()

async function startMockWorker() {
  const { worker } = await import("./mocks/browser")
  await worker.start()
}

async function prepare() {
  if (import.meta.env.DEV) {
    await startMockWorker()
  }
}

prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  )
})
