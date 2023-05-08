import { RoutesObjectPro } from "@/router/interface"
import { isCloudVersion } from "@/utils/typeHelper"
import { cloudRouter } from "./config/cloud"
import { selfRouter } from "./config/selfHost"

export const routerConfig: RoutesObjectPro[] = isCloudVersion
  ? cloudRouter
  : selfRouter
