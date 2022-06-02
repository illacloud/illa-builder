import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"
;(async () => {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser")
    worker.start()
  }
})()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)
