import { Global } from "@emotion/react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { globalStyle, codemirrorGlobalStyle } from "./style"
import { css } from "@emotion/react"
import { DashboardApps } from "@/page/Dashboard/components/DashboardApps"
import { DashboardResources } from "@/page/Dashboard/components/DashboardResources"
import { IllaApp } from "@/page/Dashboard"
import { Editor } from "@/page/Editor"
import { Page404 } from "@/page/status/404"
import { Page403 } from "@/page/status/403"
import { Page500 } from "@/page/status/500"
import "./i18n/config"

function App() {
  return (
    <BrowserRouter>
      <Global styles={css(globalStyle, codemirrorGlobalStyle)} />
      <Routes>
        <Route path="dashboard" element={<IllaApp />}>
          <Route index element={<DashboardApps />} />
          <Route path="apps" element={<DashboardApps />} />
          <Route path="resources" element={<DashboardResources />} />
        </Route>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="editor/:editor" element={<Editor />} />
        <Route path="403" element={<Page403 />} />
        <Route path="500" element={<Page500 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
