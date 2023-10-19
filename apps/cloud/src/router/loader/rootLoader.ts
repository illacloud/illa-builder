import { getAuthToken } from "@illa-public/utils"
import { LoaderFunctionArgs, redirect } from "react-router-dom"
import { getUserInfoLoader } from "./authLoader"
import { inviteLoader } from "./inviteLoader"

export const rootLoader = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const url = new URL(request.url)
  const inviteToken = url.searchParams.get("inviteToken")
  const paramsRedirectURL = url.searchParams.get("redirectURL")
  const isLogin = await getUserInfoLoader()
  if (isLogin) {
    const authToken = getAuthToken()!
    if (inviteToken) {
      const redirectURL = await inviteLoader(args)
      if (redirectURL) {
        return redirect(decodeURIComponent(redirectURL))
      }
      return redirect("/workspace")
    }
    if (paramsRedirectURL) {
      const targetURL = new URL(decodeURIComponent(paramsRedirectURL))
      targetURL.searchParams.set("token", authToken)
      return redirect(targetURL.toString())
    } else {
      return redirect("/workspace")
    }
  } else {
    if (inviteToken) {
      return redirect(`/register${url.search ?? ""}`)
    }
    return redirect(`/login${url.search ?? ""}`)
  }
}
