import { LazyExoticComponent, ReactNode, Suspense, lazy } from "react"
import { LoaderFunctionArgs, Navigate, redirect } from "react-router-dom"
import { DashboardApps } from "@/page/Dashboard/DashboardApps"
import { DashboardResources } from "@/page/Dashboard/DashboardResources"
import { Member } from "@/page/Member"
import { SettingAccount } from "@/page/Setting/SettingAccount"
import { SettingOthers } from "@/page/Setting/SettingOthers"
import { SettingPassword } from "@/page/Setting/SettingPassword"
import { Page403 } from "@/page/status/403"
import { Page404 } from "@/page/status/404"
import { Page500 } from "@/page/status/500"
import { RoutesObjectPro } from "@/router/interface"
import { setLocalStorage } from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"
import { removeUrlParams } from "@/utils/url"

export const cloudUrl = `${location.protocol}//${
  import.meta.env.VITE_CLOUD_URL
}`

const handleRemoveUrlToken = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const url = new URL(request.url)
  const token = url?.searchParams?.get("token")
  if (!token) return null
  setLocalStorage("token", token, -1)
  const current = removeUrlParams(window.location.href, ["token"])
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}${current.search}`,
  )
  return null
}

export function layLoad(Comp: LazyExoticComponent<any>): ReactNode {
  return (
    <Suspense fallback={<></>}>
      <Comp />
    </Suspense>
  )
}

export const commonRouter: RoutesObjectPro[] = [
  {
    path: "/:teamIdentifier/app/:appId",
    element: layLoad(lazy(() => import("@/page/App"))),
    needLogin: true,
    errorElement: <Page404 />,
  },
  {
    path: "/:teamIdentifier/deploy/app/:appId",
    element: layLoad(lazy(() => import("@/page/Deploy"))),
    errorElement: <Page404 />,
    accessByMobile: true,
    loader: handleRemoveUrlToken,
  },
  {
    path: "/:teamIdentifier/deploy/app/:appId/:pageName",
    element: layLoad(lazy(() => import("@/page/Deploy"))),
    errorElement: <Page404 />,
    accessByMobile: true,
    loader: handleRemoveUrlToken,
  },
  {
    path: "/:teamIdentifier/deploy/app/:appId/:pageName/:viewPath",
    element: layLoad(lazy(() => import("@/page/Deploy"))),
    errorElement: <Page404 />,
    accessByMobile: true,
    loader: handleRemoveUrlToken,
  },
  {
    path: "/privacy-policy",
    accessByMobile: true,
    element: layLoad(
      lazy(() => import("@/illa-public-component/User/policy/PrivacyPolicy")),
    ),
  },
  {
    path: "/terms-and-conditions",
    accessByMobile: true,
    element: layLoad(
      lazy(() => import("@/illa-public-component/User/policy/TermsOfService")),
    ),
  },
  {
    path: "/403",
    element: <Page403 />,
    accessByMobile: true,
  },
  {
    path: "/500",
    element: <Page500 />,
    accessByMobile: true,
  },
  {
    path: "/*",
    element: <Page404 />,
    accessByMobile: true,
  },
]

export const cloudRouter: RoutesObjectPro[] = [
  {
    index: true,
    loader: async () => {
      return redirect(cloudUrl)
    },
  },
  ...commonRouter,
  {
    path: "/:teamIdentifier/dashboard",
    element: layLoad(lazy(() => import("@/page/Dashboard"))),
    needLogin: true,
    children: [
      {
        index: true,
        element: <Navigate to="./apps" replace />,
      },
      {
        path: "/:teamIdentifier/dashboard/apps",
        element: <DashboardApps />,
      },
      {
        path: "/:teamIdentifier/dashboard/resources",
        element: <DashboardResources />,
        errorElement: <Page404 />,
      },
    ],
  },
]

export const selfRouter: RoutesObjectPro[] = [
  {
    index: true,
    loader: async () => {
      return redirect("/0/dashboard")
    },
  },
  ...commonRouter,
  {
    path: "/:teamIdentifier/dashboard",
    element: layLoad(lazy(() => import("@/page/Dashboard"))),
    needLogin: true,
    children: [
      {
        index: true,
        element: <Navigate to="./apps" replace />,
      },
      {
        path: "/:teamIdentifier/dashboard/apps",
        element: <DashboardApps />,
        errorElement: <Page404 />,
      },
      {
        path: "/:teamIdentifier/dashboard/resources",
        element: <DashboardResources />,
      },
      {
        path: "/:teamIdentifier/dashboard/members",
        element: <Member />,
      },
    ],
  },
  {
    path: "/login",
    element: layLoad(lazy(() => import("@/page/User/Login"))),
    accessByMobile: true,
  },
  {
    path: "/register",
    element: layLoad(lazy(() => import("@/page/User/Register"))),
    accessByMobile: true,
  },
  {
    path: "/forgotPassword",
    element: layLoad(lazy(() => import("@/page/User/ResetPassword"))),
    accessByMobile: true,
  },
  {
    path: "/setting",
    element: layLoad(lazy(() => import("@/page/Setting"))),
    needLogin: true,
    children: [
      {
        index: true,
        element: <Navigate to="./account" replace />,
      },
      {
        path: "/setting/account",
        element: <SettingAccount />,
      },
      {
        path: "/setting/password",
        element: <SettingPassword />,
      },
      {
        path: "/setting/others",
        element: <SettingOthers />,
      },
    ],
  },
]

export const routerConfig: RoutesObjectPro[] = isCloudVersion
  ? cloudRouter
  : selfRouter
