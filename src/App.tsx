import { css, Global } from "@emotion/react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { globalStyle } from "./style"
import { DashboardApps } from "@/page/Dashboard/DashboardApps"
import { DashboardResources } from "@/page/Dashboard/DashboardResources"
import { IllaApp } from "@/page/Dashboard"
import { Editor } from "@/page/App"
import { UserLogin } from "@/page/User"
import { Register } from "@/page/User/Register"
import { Login } from "@/page/User/Login"
import { ResetPassword } from "@/page/User/ResetPassword"
import { Setting } from "@/page/Setting"
import { Page404 } from "@/page/status/404"
import { Page403 } from "@/page/status/403"
import { Page500 } from "@/page/status/500"
import { SettingAccount } from "@/page/Setting/SettingAccount"
import { SettingPassword } from "@/page/Setting/SettingPassword"
import { SettingOthers } from "@/page/Setting/SettingOthers"
import { ConfigProvider } from "@illa-design/config-provider"
import "@/i18n/config"
import "@/api/base"
import { AxiosInterceptor } from "@/api/AxiosInterceptor"

import { Deploy } from "@/page/Deploy"
import { HTML5Backend } from "react-dnd-html5-backend"
import { GlobalDataProvider } from "@/page/App/context/globalDataProvider"
import { DndProvider } from "react-dnd"

import SettingsInfoRequest from "./middleware/settingsInfoRequest"
import { useSelector } from "react-redux"
import {
  getCurrentConfigLanguage,
  getCurrentTranslateLanguage,
} from "@/redux/currentUser/currentUserSelector"
import i18n from "./i18n/config"
import { useEffect } from "react"

function App() {
  const configLanguage = useSelector(getCurrentConfigLanguage)
  const currentUserLanguage = useSelector(getCurrentTranslateLanguage)

  useEffect(() => {
    i18n.changeLanguage(currentUserLanguage).then()
  }, [currentUserLanguage])

  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <GlobalDataProvider>
          <AxiosInterceptor>
            <SettingsInfoRequest>
              <ConfigProvider locale={configLanguage}>
                <Global styles={css(globalStyle)} />
                <Routes>
                  <Route path="dashboard" element={<IllaApp />}>
                    <Route index element={<Navigate to="./apps" />} />
                    <Route path="apps" element={<DashboardApps />} />
                    <Route path="resources" element={<DashboardResources />} />
                  </Route>
                  <Route path="user" element={<UserLogin />}>
                    <Route index element={<Navigate to="./login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgotPassword" element={<ResetPassword />} />
                  </Route>
                  <Route index element={<Navigate to="/dashboard" />} />
                  <Route
                    path="app/:appId/version/:versionId"
                    element={<Editor />}
                  />
                  <Route path="setting" element={<Setting />}>
                    <Route index element={<Navigate to="./account" />} />
                    <Route path="account" element={<SettingAccount />} />
                    <Route path="password" element={<SettingPassword />} />
                    <Route path="others" element={<SettingOthers />} />
                  </Route>
                  <Route
                    path="deploy/app/:appId/version/:versionId"
                    element={<Deploy />}
                  />
                  <Route path="403" element={<Page403 />} />
                  <Route path="500" element={<Page500 />} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </ConfigProvider>
            </SettingsInfoRequest>
          </AxiosInterceptor>
        </GlobalDataProvider>
      </DndProvider>
    </BrowserRouter>
  )
}

export default App
