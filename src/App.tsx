import { Global } from "@emotion/react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { globalStyle } from "./style"
import { DashboardApps } from "@/page/Dashboard/DashboardApps"
import { DashboardResources } from "@/page/Dashboard/DashboardResources"
import { IllaApp } from "@/page/Dashboard"
import { Editor } from "@/page/Editor"
import { Page404 } from "@/page/status/404"
import { Page403 } from "@/page/status/403"
import { Page500 } from "@/page/status/500"
import "@/i18n/config"
import "@/api/base"

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyle} />
      <Routes>
        <Route path="dashboard" element={<IllaApp />}>
          <Route index element={<Navigate to="./apps" />} />
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
