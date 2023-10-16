import { lazy } from "react"
import { FullPageLoading } from "@/components/FullPageLoading"
import { ResourceCreate } from "@/page/Resource/Create"
import { ResourceEdit } from "@/page/Resource/Edit"
import { ResourceLayout } from "@/page/Resource/layout"
import { RoutesObjectPro } from "@/router/interface"
import { lazyLoad } from "@/router/utils/lazyLoad"
import { deployLoader } from "../loader/deployLoader"
import { getDashboardResourcesLoader } from "../loader/resourceEditorLoader"

export const publicTeamChildrenRouter: RoutesObjectPro[] = [
  {
    path: "/:teamIdentifier/resource",
    element: <ResourceLayout />,
    children: [
      {
        path: "new/:resourceType",
        needLogin: true,
        element: <ResourceCreate />,
      },
      {
        path: "edit/:resourceID",
        needLogin: true,
        loader: getDashboardResourcesLoader,
        element: <ResourceEdit />,
      },
    ] as RoutesObjectPro[],
  },
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
