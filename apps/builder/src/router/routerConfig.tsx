import { Navigate, redirect } from "react-router-dom"
import { Editor } from "@/page/App"
import { IllaApp } from "@/page/Dashboard"
import { DashboardApps } from "@/page/Dashboard/DashboardApps"
import { DashboardResources } from "@/page/Dashboard/DashboardResources"
import { Deploy } from "@/page/Deploy"
import { Member } from "@/page/Member"
import { Setting } from "@/page/Setting"
import { SettingAccount } from "@/page/Setting/SettingAccount"
import { SettingOthers } from "@/page/Setting/SettingOthers"
import { SettingPassword } from "@/page/Setting/SettingPassword"
import { UserLogin } from "@/page/User"
import { Login } from "@/page/User/Login"
import { Register } from "@/page/User/Register"
import { ResetPassword } from "@/page/User/ResetPassword"
import { Page403 } from "@/page/status/403"
import { Page404 } from "@/page/status/404"
import { Page500 } from "@/page/status/500"
import { RoutesObjectPro } from "@/router/interface"
import { isCloudVersion } from "@/utils/typeHelper"

export const ILLA_CLOUD_PATH = import.meta.env.VITE_CLOUD_URL

// TODO: may be need lazy load, use Suspense Component And Lazy function ,see: https://reacttraining.com/react-router/web/guides/code-splitting
export const routerConfig: RoutesObjectPro[] = [
  {
    index: true,
    loader: async () => {
      if (isCloudVersion) {
        // navigate to illa cloud
        return redirect(ILLA_CLOUD_PATH)
      }
      return redirect("/0/dashboard")
    },
  },
  {
    path: "/:teamIdentifier/dashboard",
    element: <IllaApp />,
    needLogin: true,
    children: [
      {
        index: true,
        element: <Navigate to="./apps" replace />,
        needLogin: true,
      },
      {
        path: "/:teamIdentifier/dashboard/apps",
        element: <DashboardApps />,
        needLogin: true,
      },
      {
        path: "/:teamIdentifier/dashboard/resources",
        element: <DashboardResources />,
        needLogin: true,
      },
      {
        path: "/:teamIdentifier/dashboard/members",
        element: <Member />,
        needLogin: true,
      },
    ],
  },
  {
    path: "/:teamIdentifier/app/:appId",
    element: <Editor />,
    needLogin: true,
    errorElement: <Page403 />,
  },
  {
    path: "/:teamIdentifier/deploy/app/:appId/version/:versionId",
    element: <Deploy />,
    needLogin: true,
  },
  {
    path: "/:teamIdentifier/deploy/app/:appId/version/:versionId/:pageName",
    element: <Deploy />,
    needLogin: true,
  },
  {
    path: "/:teamIdentifier/deploy/app/:appId/version/:versionId/:pageName/:viewPath",
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
  ...(!isCloudVersion
    ? [
        {
          path: "/user",
          element: <UserLogin />,
          children: [
            {
              index: true,
              element: <Navigate to="./login" replace />,
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
          path: "/setting",
          element: <Setting />,
          needLogin: true,
          children: [
            {
              index: true,
              element: <Navigate to="./account" replace />,
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
      ]
    : []),
]
