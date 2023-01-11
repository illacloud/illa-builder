import { createBrowserRouter } from "react-router-dom"
import { CheckIsLogin } from "@/auth"
import { LayoutAutoChange } from "@/components/LayoutAutoChange"
import { RoutesObjectPro } from "@/router/interface"
import { routerConfig } from "@/router/routerConfig"

const wrappedRouter = (routesConfig: RoutesObjectPro[]) => {
  return routesConfig.map((routeItem: RoutesObjectPro) => {
    const { element, children, needLogin, ...otherRouteProps } = routeItem
    const newRouteItem: RoutesObjectPro = {
      ...otherRouteProps,
    }
    if (needLogin) {
      newRouteItem.element = (
        <LayoutAutoChange
          desktopPage={<CheckIsLogin>{element}</CheckIsLogin>}
        />
      )
    } else {
      newRouteItem.element = <LayoutAutoChange desktopPage={element} />
    }
    if (Array.isArray(children) && children.length) {
      newRouteItem.children = wrappedRouter(children)
    }

    return newRouteItem
  })
}

export const ILLARoute = createBrowserRouter(wrappedRouter(routerConfig))
