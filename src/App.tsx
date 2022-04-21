import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Editor } from "./page/Editor"
import { Setting } from "./page/Setting"

const routes = [
  {
    path: "/",
    component: <Editor />,
  },
  {
    path: "/setting",
    component: <Setting />,
  },
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
