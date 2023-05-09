import { lazy } from "react"
import { Navigate } from "react-router-dom"
import { FullPageLoading } from "@/components/FullPageLoading"
import { RoutesObjectPro } from "@/router/interface"
import { lazyLoad } from "@/router/utils/lazyLoad"
import {
  getDashboardAppLoader,
  getDashboardResourcesLoader,
} from "../loader/dashBoardLoader"
import { deployLoader } from "../loader/deployLoader"

export const publicTeamChildrenRouter: RoutesObjectPro[] = [
  {
    path: "/:teamIdentifier/app/:appId",
    element: lazyLoad(lazy(() => import("@/page/App"))),
    needLogin: true,
    errorElement: lazyLoad(lazy(() => import("@/page/status/404"))),
  },
  {
    path: "/:teamIdentifier/deploy/app/:appId/:pageName?/:viewPath?",
    element: lazyLoad(
      lazy(() => import("@/page/Deploy")),
      <FullPageLoading />,
    ),
    accessByMobile: true,
    errorElement: lazyLoad(lazy(() => import("@/page/status/404"))),
    loader: deployLoader,
  },
  {
    path: "/:teamIdentifier/template/:templateName",
    element: lazyLoad(lazy(() => import("@/page/Template"))),
    errorElement: lazyLoad(lazy(() => import("@/page/status/404"))),
    needLogin: true,
  },
  {
    path: "/:teamIdentifier/guide",
    element: lazyLoad(lazy(() => import("@/page/Template/GuideApp"))),
    errorElement: lazyLoad(lazy(() => import("@/page/status/404"))),
    needLogin: true,
  },
]

export const publicRouterConfig: RoutesObjectPro[] = [
  {
    path: "/privacy-policy",
    accessByMobile: true,
    element: lazyLoad(
      lazy(() => import("@/illa-public-component/User/policy/PrivacyPolicy")),
    ),
  },
  {
    path: "/terms-and-conditions",
    accessByMobile: true,
    element: lazyLoad(
      lazy(() => import("@/illa-public-component/User/policy/TermsOfService")),
    ),
  },
  {
    path: "/403",
    element: lazyLoad(lazy(() => import("@/page/status/403"))),
    accessByMobile: true,
  },
  {
    path: "/500",
    element: lazyLoad(lazy(() => import("@/page/status/500"))),
    accessByMobile: true,
  },
  {
    path: "/*",
    element: lazyLoad(lazy(() => import("@/page/status/404"))),
    accessByMobile: true,
  },
]

export const publicDashboardChildrenRouter: RoutesObjectPro[] = [
  {
    index: true,
    element: <Navigate to="apps" replace={true} />,
  },
  {
    path: "apps",
    element: lazyLoad(
      lazy(() => import("@/page/Dashboard/DashboardApps")),
      <FullPageLoading />,
    ),
    needLogin: true,
    loader: getDashboardAppLoader,
  },
  {
    path: "resources",
    element: lazyLoad(
      lazy(() => import("@/page/Dashboard/DashboardResources")),
      <FullPageLoading />,
    ),
    loader: getDashboardResourcesLoader,
  },
  {
    path: "tutorial",
    element: lazyLoad(
      lazy(() => import("@/page/Dashboard/Tutorial")),
      <FullPageLoading />,
    ),
  },
]
