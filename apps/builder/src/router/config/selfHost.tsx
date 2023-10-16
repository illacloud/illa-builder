import { RoutesObjectPro } from "../interface"
import { selfHostLandingLoader } from "../loader/landingLoader"
import { publicRouterConfig, publicTeamChildrenRouter } from "./public"

export const selfRouter: RoutesObjectPro[] = [
  {
    index: true,
    loader: selfHostLandingLoader,
  },
  ...publicTeamChildrenRouter,
  ...publicRouterConfig,
]
