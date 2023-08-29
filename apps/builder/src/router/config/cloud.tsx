import { lazy } from "react"
import { redirect } from "react-router-dom"
import { FullPageLoading } from "@/components/FullPageLoading"
import { agentLoader } from "@/router/loader/agentLoader"
import { agentRunLoader } from "@/router/loader/agentRunLoader"
import { historyLoader } from "@/router/loader/historyLoader"
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
    children: [
      ...publicDashboardChildrenRouter,
      {
        path: "ai-agents",
        element: lazyLoad(
          lazy(() => import("@/page/Dashboard/DashboardAIAgent")),
          <FullPageLoading />,
        ),
        needLogin: true,
      },
    ],
  },
  {
    path: "/:teamIdentifier/appHistory/:appId",
    element: lazyLoad(
      lazy(() => import("@/page/History")),
      <FullPageLoading />,
    ),
    needLogin: true,
    loader: historyLoader,
  },
  {
    path: "/:teamIdentifier/ai-agent/:agentID/run",
    needLogin: true,
    element: lazyLoad(
      lazy(() => import("@/page/AI/AIAgentRun")),
      <FullPageLoading />,
    ),
    accessByMobile: true,
    loader: agentRunLoader,
  },
  {
    path: "/:teamIdentifier/ai-agent/:agentID?",
    needLogin: true,
    element: lazyLoad(
      lazy(() => import("@/page/AI/AIAgent")),
      <FullPageLoading />,
    ),
    loader: agentLoader,
  },
  ...publicTeamChildrenRouter,
  ...publicRouterConfig,
]
