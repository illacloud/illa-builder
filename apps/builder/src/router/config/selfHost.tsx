import { lazy } from "react"
import { Navigate } from "react-router-dom"
import Member from "@/page/Member"
import { SettingAccount } from "@/page/Setting/SettingAccount"
import { SettingOthers } from "@/page/Setting/SettingOthers"
import { SettingPassword } from "@/page/Setting/SettingPassword"
import { RoutesObjectPro } from "../interface"
import { selfHostLandingLoader } from "../loader/landingLoader"
import { teamMemberLoader } from "../loader/teamMemberLoader"
import { lazyLoad } from "../utils/lazyLoad"
import {
  publicDashboardChildrenRouter,
  publicRouterConfig,
  publicTeamChildrenRouter,
} from "./public"

export const selfRouter: RoutesObjectPro[] = [
  {
    index: true,
    loader: selfHostLandingLoader,
  },
  {
    path: "/privacy-policy",
    accessByMobile: true,
    element: lazyLoad(lazy(() => import("@/page/Policy/PrivacyPolicy"))),
  },
  {
    path: "/terms-and-conditions",
    accessByMobile: true,
    element: lazyLoad(lazy(() => import("@/page/Policy/TermsAndConditions"))),
  },
  {
    path: "/:teamIdentifier/dashboard",
    element: lazyLoad(lazy(() => import("@/page/Dashboard"))),
    children: [
      ...publicDashboardChildrenRouter,
      {
        path: "members",
        element: <Member />,
        needLogin: true,
        loader: teamMemberLoader,
      },
    ],
  },
  ...publicTeamChildrenRouter,
  {
    path: "/login",
    element: lazyLoad(lazy(() => import("@/page/User/Login"))),
    accessByMobile: true,
  },
  {
    path: "/register",
    element: lazyLoad(lazy(() => import("@/page/User/Register"))),
    accessByMobile: true,
  },
  {
    path: "/forgotPassword",
    element: lazyLoad(lazy(() => import("@/page/User/ResetPassword"))),
    accessByMobile: true,
  },
  {
    path: "/setting",
    element: lazyLoad(lazy(() => import("@/page/Setting"))),
    needLogin: true,
    children: [
      {
        index: true,
        element: <Navigate to="./account" replace />,
      },
      {
        path: "account",
        element: <SettingAccount />,
      },
      {
        path: "password",
        element: <SettingPassword />,
      },
      {
        path: "others",
        element: <SettingOthers />,
      },
    ],
  },
  ...publicRouterConfig,
]
