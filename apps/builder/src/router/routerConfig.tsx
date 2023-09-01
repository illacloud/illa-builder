import { isCloudVersion } from "@illa-public/utils"
import { RoutesObjectPro } from "@/router/interface"
import { cloudRouter } from "./config/cloud"
import { selfRouter } from "./config/selfHost"

export const routerConfig: RoutesObjectPro[] = isCloudVersion
  ? cloudRouter
  : selfRouter
