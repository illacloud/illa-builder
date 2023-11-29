import { getAuthToken } from "@illa-public/utils"
import { LoaderFunctionArgs, redirect } from "react-router-dom"
import { getUserInfoLoader } from "./authLoader"

export const rootLoader = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const url = new URL(request.url)
  const paramsRedirectURL = url.searchParams.get("redirectURL")
  const isLogin = await getUserInfoLoader()
  if (isLogin) {
    const authToken = getAuthToken()!
    if (paramsRedirectURL) {
      const targetURL = new URL(decodeURIComponent(paramsRedirectURL))
      targetURL.searchParams.set("token", authToken)
      return redirect(targetURL.toString())
    } else {
      return redirect("/workspace")
    }
  } else {
    return redirect(`/login${url.search ?? ""}`)
  }
}
