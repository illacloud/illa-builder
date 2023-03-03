import { LoaderFunctionArgs, redirect } from "react-router-dom"
import { clearRequestPendingPool } from "@/api/helpers/axiosPendingPool"
import { updateTeamsInfo } from "@/api/team"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getUserInfo } from "@/router/loader"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"
import { filterURLSearch } from "@/utils/url"

export const requireSelfAuth = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const url = new URL(request.url)
  const inviteToken = url?.searchParams?.get("inviteToken")

  const userInfo = getCurrentUser(store.getState())
  const token = getAuthToken()
  if (!userInfo?.userId) {
    const search = filterURLSearch([
      "inviteToken",
      "email",
      "appID",
      "teamIdentifier",
    ])
    const loginUrl = `/login${search}`
    if (!token) {
      clearRequestPendingPool()
      if (inviteToken) {
        const registerUrl = `/register${search}`
        return redirect(registerUrl)
      }
      return redirect(loginUrl)
    } else {
      const userInfo = await getUserInfo(token)
      if (!userInfo) {
        return redirect(loginUrl)
      }
    }
  }
  try {
    await updateTeamsInfo()
  } catch (e) {
    console.error(e)
  }
  return null
}
