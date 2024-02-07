import { createBrowserRouter } from "react-router-dom"
import { LayoutAutoChange } from "@/components/LayoutAutoChange"
import { RoutesObjectPro } from "@/router/interface"
import { routerConfig } from "@/router/routerConfig"
import { beautifyURLLoader } from "./loader/beautifyURLLoader"
import { setTokenToLocalStorageLoader } from "./loader/cloudAuthLoader"
import { combineCloudAuthLoader } from "./loader/index"

const wrappedRouter = (
  routesConfig: RoutesObjectPro[],
  _isChildren?: boolean,
) => {
  return routesConfig.map((routeItem: RoutesObjectPro) => {
    const {
      element,
      children,
      needLogin,
      loader: originLoader,
      ...otherRouteProps
    } = routeItem
    const newRouteItem: RoutesObjectPro = {
      ...otherRouteProps,
    }
    if (!newRouteItem.accessByMobile) {
      newRouteItem.element = <LayoutAutoChange desktopPage={element} />
    } else {
      newRouteItem.element = <>{element}</>
    }
    newRouteItem.loader = async (args) => {
      await setTokenToLocalStorageLoader(args)
      const beautifyURLResponse = await beautifyURLLoader(args)
      if (beautifyURLResponse) {
        return beautifyURLResponse
      }
      let authLoaderResponse
      if (needLogin) {
        authLoaderResponse = await combineCloudAuthLoader(args)
      }
      if (authLoaderResponse) {
        return authLoaderResponse
      }
      if (originLoader) {
        return await originLoader(args)
      }
      return null
    }
    if (Array.isArray(children) && children.length) {
      newRouteItem.children = wrappedRouter(children, true)
    }

    return newRouteItem
  })
}

export const ILLARoute = createBrowserRouter(wrappedRouter(routerConfig), {
  basename: import.meta.env.ILLA_BASE_PATH ?? "/",
})
