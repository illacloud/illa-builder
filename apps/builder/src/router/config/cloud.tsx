import { lazy } from "react"
import { redirect } from "react-router-dom"
import { cloudUrl } from "../constant"
import { RoutesObjectPro } from "../interface"
import { lazyLoad } from "../utils/lazyLoad"
import {
  publicDashboardChildrenRouter,
  publicRouterConfig,
  publicTeamChildrenRouter,
} from "./public"

export const cloudRouter: RoutesObjectPro[] = [
  {
    index: true,
    loader: async () => {
      return redirect(cloudUrl)
    },
  },
  {
    path: "/:teamIdentifier/dashboard",
    element: lazyLoad(lazy(() => import("@/page/Dashboard"))),
    children: publicDashboardChildrenRouter,
  },
  {
    path: "/:teamIdentifier/appHistory/:appId",
    element: lazyLoad(lazy(() => import("@/page/History"))),
    needLogin: true,
    errorElement: lazyLoad(lazy(() => import("@/page/status/404"))),
  },
  ...publicTeamChildrenRouter,
  ...publicRouterConfig,
]
