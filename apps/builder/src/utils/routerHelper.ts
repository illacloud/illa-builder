import { ILLARoute } from "@/router"

export const getParamsFromIllaRoute = (key: string) => {
  const routerParams = ILLARoute.state.matches[0].params
  return routerParams[key]
}
