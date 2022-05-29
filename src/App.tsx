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
import {
  ConfigProvider,
  enUS,
  Locale,
  zhCN,
} from "@illa-design/config-provider"
import { useSelector } from "react-redux"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import "@/i18n/config"
import "@/api/base"
import i18n from "@/i18n/config"
import { getBuilderInfo } from "@/redux/builderInfo/builderSelector"

// user language > builder language
function getLocaleFromLanguage(language?: string): Locale {
  let selectedLocale: Locale
  switch (language ?? useSelector(getBuilderInfo).language) {
    case "English":
      selectedLocale = enUS
      i18n.changeLanguage("en-US").then()
      break
    case "简体中文":
      selectedLocale = zhCN
      i18n.changeLanguage("zh-CN").then()
      break
    default:
      selectedLocale = enUS
  }
  return enUS
}

function App() {
  const currentUser = useSelector(getCurrentUser)
  return (
    <BrowserRouter>
      <ConfigProvider locale={getLocaleFromLanguage(currentUser?.language)}>
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
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
