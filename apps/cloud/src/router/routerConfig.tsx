import { PCDashboardLoading } from "@illa-public/cloud-dashboard-layout"
import { Suspense, lazy } from "react"
import { Navigate } from "react-router-dom"
import { FullPageLoading } from "@/components/FullPageLoading"
import { Status403 } from "@/page/status/403"
import { Status404 } from "@/page/status/404"
import { Status500 } from "@/page/status/500"
import { ILLARoutesObject } from "@/router/interface"
import { SettingLazyLoad } from "@/router/lazyLoad/SettingLazyLoad"
import { rootLoader } from "./loader/rootLoader"

const WorkSpaceLanding = lazy(() => import("@/page/workspace"))
const InitWorkSpaceLanding = lazy(() => import("@/page/workspace/InitTeamPage"))
const AppWorkSpaceLanding = lazy(() => import("@/page/workspace/apps"))
const ResourceWorkSpaceLanding = lazy(
  () => import("@/page/workspace/resources"),
)

const SettingLanding = lazy(() => import("@/page/setting/landing"))
const PersonalSetting = lazy(() => import("@/page/setting/account/personal"))
const LanguageSetting = lazy(() => import("@/page/setting/account/language"))
const PasswordSettingPage = lazy(
  () => import("@/page/setting/account/password"),
)
const LoginPage = lazy(() => import("@/page/user/login"))

export const routerConfig: ILLARoutesObject[] = [
  {
    index: true,
    loader: rootLoader,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<FullPageLoading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/workspace",
    element: (
      <Suspense fallback={<PCDashboardLoading />}>
        <WorkSpaceLanding />
      </Suspense>
    ),
    errorElement: <Status500 />,
    needLogin: true,
    children: [
      {
        index: true,
        element: <InitWorkSpaceLanding />,
      },
      {
        path: ":teamIdentifier",
        children: [
          {
            index: true,
            element: <Navigate to="./apps" replace />,
          },
          {
            path: "apps",
            element: <AppWorkSpaceLanding />,
          },
          {
            path: "resources",
            element: <ResourceWorkSpaceLanding />,
          },
        ],
      },
    ],
  },
  {
    path: "/setting",
    element: <SettingLazyLoad Comp={lazy(() => import("@/page/setting"))} />,
    errorElement: <Status500 />,
    needLogin: true,
    children: [
      {
        index: true,
        element: <SettingLanding />,
      },
      {
        path: "account",
        element: <PersonalSetting />,
      },
      {
        path: "language",
        element: <LanguageSetting />,
      },
      {
        path: "password",
        element: <PasswordSettingPage />,
      },
    ] as ILLARoutesObject[],
  },
  {
    path: "/403",
    element: <Status403 />,
  },
  {
    path: "/404",
    element: <Status404 />,
  },
  {
    path: "/500",
    element: <Status500 />,
  },
  {
    path: "/*",
    element: <Status404 />,
  },
]
