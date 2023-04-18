import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import { LayoutAutoChange } from "@/components/LayoutAutoChange"
import { RoutesObjectPro } from "@/router/interface"
import { requireAuth } from "@/router/loader"
import { layLoad, routerConfig } from "@/router/routerConfig"
import { requireSelfAuth } from "@/router/selfLoader"
import { isCloudVersion } from "@/utils/typeHelper"

const wrappedRouter = (
  routesConfig: RoutesObjectPro[],
  isChildren?: boolean,
) => {
  return routesConfig.map((routeItem: RoutesObjectPro) => {
    const { element, children, needLogin, ...otherRouteProps } = routeItem
    const newRouteItem: RoutesObjectPro = {
      ...otherRouteProps,
    }
    if (needLogin && !isChildren) {
      if (isCloudVersion) {
        newRouteItem.errorElement = layLoad(
          lazy(() => import("@/page/status/404")),
        )
        newRouteItem.loader = async ({ params, request }) => {
          const url = new URL(request.url)
          const token = url?.searchParams?.get("token")
          const teamIdentifier = params.teamIdentifier
          return await requireAuth(token, teamIdentifier)
        }
        if (!newRouteItem.accessByMobile) {
          newRouteItem.element = <LayoutAutoChange desktopPage={element} />
        } else {
          newRouteItem.element = element
        }
      } else {
        newRouteItem.loader = async (args) => {
          return await requireSelfAuth(args)
        }
        if (!newRouteItem.accessByMobile) {
          newRouteItem.element = <LayoutAutoChange desktopPage={element} />
        } else {
          newRouteItem.element = element
        }
      }
    } else {
      if (!newRouteItem.accessByMobile) {
        newRouteItem.element = <LayoutAutoChange desktopPage={element} />
      } else {
        newRouteItem.element = element
      }
    }
    if (Array.isArray(children) && children.length) {
      newRouteItem.children = wrappedRouter(children, true)
    }

    return newRouteItem
  })
}

export const ILLARoute = createBrowserRouter(wrappedRouter(routerConfig))
