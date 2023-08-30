import { lazy } from "react"
import { Navigate } from "react-router-dom"
import { FullPageLoading } from "@/components/FullPageLoading"
import { RoutesObjectPro } from "@/router/interface"
import { lazyLoad } from "@/router/utils/lazyLoad"
import { getDashboardResourcesLoader } from "../loader/dashBoardLoader"
import { deployLoader } from "../loader/deployLoader"

export const publicTeamChildrenRouter: RoutesObjectPro[] = [
  {
    path: "/:teamIdentifier/app/:appId",
    element: lazyLoad(lazy(() => import("@/page/App"))),
    needLogin: true,
    errorElement: lazyLoad(lazy(() => import("@/page/Status/404"))),
  },
  {
    path: "/:teamIdentifier/deploy/app/:appId/:pageName?/:viewPath?",
    element: lazyLoad(
      lazy(() => import("@/page/Deploy")),
      <FullPageLoading />,
    ),
    accessByMobile: true,
    errorElement: lazyLoad(lazy(() => import("@/page/Status/404"))),
    loader: deployLoader,
    shouldRevalidate: (args) => {
      const { currentParams, nextParams } = args
      return currentParams.appId !== nextParams.appId
    },
  },
  {
    path: "/:teamIdentifier/template/:templateName",
    element: lazyLoad(lazy(() => import("@/page/Template"))),
    errorElement: lazyLoad(lazy(() => import("@/page/Status/404"))),
    needLogin: true,
  },
  {
    path: "/:teamIdentifier/guide",
    element: lazyLoad(lazy(() => import("@/page/Template/GuideApp"))),
    errorElement: lazyLoad(lazy(() => import("@/page/Status/404"))),
    needLogin: true,
  },
]

export const publicRouterConfig: RoutesObjectPro[] = [
  {
    path: "/403",
    element: lazyLoad(lazy(() => import("@/page/Status/403"))),
    accessByMobile: true,
  },
  {
    path: "/500",
    element: lazyLoad(lazy(() => import("@/page/Status/500"))),
    accessByMobile: true,
  },
  {
    path: "/*",
    element: lazyLoad(lazy(() => import("@/page/Status/404"))),
    accessByMobile: true,
  },
]

export const publicDashboardChildrenRouter: RoutesObjectPro[] = [
  {
    index: true,
    element: <Navigate to="apps" replace={true} />,
    needLogin: true,
  },
  {
    path: "apps",
    element: lazyLoad(
      lazy(() => import("@/page/Dashboard/DashboardApps")),
      <FullPageLoading />,
    ),
    needLogin: true,
  },
  {
    path: "resources",
    element: lazyLoad(
      lazy(() => import("@/page/Dashboard/DashboardResources")),
      <FullPageLoading />,
    ),
    needLogin: true,
    loader: getDashboardResourcesLoader,
  },
  {
    path: "tutorial",
    needLogin: true,
    element: lazyLoad(
      lazy(() => import("@/page/Dashboard/Tutorial")),
      <FullPageLoading />,
    ),
  },
]
