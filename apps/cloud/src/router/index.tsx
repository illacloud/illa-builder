import { isCloudVersion } from "@illa-public/utils"
import { createBrowserRouter } from "react-router-dom"
import { ILLARoutesObject } from "@/router/interface"
import { routerConfig } from "@/router/routerConfig"
import { needAuthLoader } from "./loader/authLoader"

const wrappedRouter = (routesConfig: ILLARoutesObject[]) => {
  return routesConfig.map((route) => {
    const { element, children, needLogin, ...otherRouterParams } = route
    const newRouteItem: ILLARoutesObject = {
      element,
      ...otherRouterParams,
    }

    if (needLogin) {
      newRouteItem.loader = needAuthLoader
    }

    if (Array.isArray(children) && children.length) {
      newRouteItem.children = wrappedRouter(children)
    }
    return newRouteItem
  })
}

export const ILLARoute = createBrowserRouter(wrappedRouter(routerConfig), {
  basename: import.meta.env.PROD && !isCloudVersion ? "/cloud" : "/",
})
