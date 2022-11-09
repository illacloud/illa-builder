import { Navigate } from "react-router-dom"
import { IllaApp } from "@/page/Dashboard"
import { DashboardApps } from "@/page/Dashboard/DashboardApps"
import { UserLogin } from "@/page/User"
import { Login } from "@/page/User/Login"
import { Register } from "@/page/User/Register"
import { ResetPassword } from "@/page/User/ResetPassword"
import { Editor } from "@/page/App"
import { SettingAccount } from "@/page/Setting/SettingAccount"
import { SettingPassword } from "@/page/Setting/SettingPassword"
import { SettingOthers } from "@/page/Setting/SettingOthers"
import { Deploy } from "@/page/Deploy"
import { Page403 } from "@/page/status/403"
import { Page500 } from "@/page/status/500"
import { Page404 } from "@/page/status/404"
import { RoutesObjectPro } from "@/router/interface"
import { DashboardResources } from "@/page/Dashboard/DashboardResources"
import { Setting } from "@/page/Setting"

// TODO: may be need lazy load, use Suspense Component And Lazy function ,see: https://reacttraining.com/react-router/web/guides/code-splitting
export const routerConfig: RoutesObjectPro[] = [
  {
    index: true,
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: <IllaApp />,
    needLogin: true,
    children: [
      {
        index: true,
        element: <Navigate to="./apps" />,
        needLogin: true,
      },
      {
        path: "/dashboard/apps",
        element: <DashboardApps />,
        needLogin: true,
      },
      {
        path: "/dashboard/resources",
        element: <DashboardResources />,
        needLogin: true,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLogin />,
    children: [
      {
        index: true,
        element: <Navigate to="./login" />,
      },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/user/register",
        element: <Register />,
      },
      {
        path: "/user/forgotPassword",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/app/:appId",
    element: <Editor />,
    needLogin: true,
  },
  {
    path: "/setting",
    element: <Setting />,
    needLogin: true,
    children: [
      {
        index: true,
        element: <Navigate to="./account" />,
        needLogin: true,
      },
      {
        path: "/setting/account",
        element: <SettingAccount />,
        needLogin: true,
      },
      {
        path: "/setting/password",
        element: <SettingPassword />,
        needLogin: true,
      },
      {
        path: "/setting/others",
        element: <SettingOthers />,
        needLogin: true,
      },
    ],
  },
  {
    path: "/deploy/app/:appId/version/:versionId",
    element: <Deploy />,
    needLogin: true,
  },
  {
    path: "/deploy/app/:appId/version/:versionId/:pageName",
    element: <Deploy />,
    needLogin: true,
  },
  {
    path: "/403",
    element: <Page403 />,
  },
  {
    path: "/500",
    element: <Page500 />,
  },
  {
    path: "/*",
    element: <Page404 />,
  },
]
