import { createBrowserRouter } from "react-router-dom"
import { CheckIsLogin } from "@/auth"
import { LayoutAutoChange } from "@/components/LayoutAutoChange"
import { Page404 } from "@/page/status/404"
import { RoutesObjectPro } from "@/router/interface"
import { requireAuth } from "@/router/loader"
import { routerConfig } from "@/router/routerConfig"
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
        newRouteItem.errorElement = <Page404 />
        newRouteItem.loader = async ({ params, request }) => {
          const url = new URL(request.url)
          const token = url?.searchParams?.get("token")
          const teamIdentifier = params.teamIdentifier
          return await requireAuth(token, teamIdentifier)
        }
        newRouteItem.element = <LayoutAutoChange desktopPage={element} />
      } else {
        newRouteItem.loader = async () => {
          return await requireSelfAuth()
        }
        newRouteItem.element = (
          <LayoutAutoChange
            desktopPage={<CheckIsLogin>{element}</CheckIsLogin>}
          />
        )
      }
    } else {
      newRouteItem.element = <LayoutAutoChange desktopPage={element} />
    }
    if (Array.isArray(children) && children.length) {
      newRouteItem.children = wrappedRouter(children, true)
    }

    return newRouteItem
  })
}

export const ILLARoute = createBrowserRouter(wrappedRouter(routerConfig))
