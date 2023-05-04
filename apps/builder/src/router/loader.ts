import { redirect } from "react-router-dom"
import { clearRequestPendingPool } from "@/api/http/utils/axiosPendingPool"
import { getIllaLanguage } from "@/illa-public-component/MixpanelUtils/utils"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { cloudRedirect } from "@/router/routerConfig"
import { getTeamsInfo } from "@/services/team"
import { fetchUserInfo } from "@/services/users"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"
import { ILLABuilderStorage } from "@/utils/storage"

export const getUserInfo = async () => {
  try {
    const response = await fetchUserInfo()
    store.dispatch(
      currentUserActions.updateCurrentUserReducer({
        ...response.data,
        userId: response.data.userID,
      }),
    )
    return response.data
  } catch (e) {
    console.error("getUserInfo error", e)
  }
}

const removeUrlParams = (url: string, params: string[]) => {
  const urlObj = new URL(url)
  params.forEach((param) => {
    urlObj.searchParams.delete(param)
  })
  return urlObj
}

export const requireAuth = async (
  pathToken?: string | null,
  teamIdentifier?: string,
) => {
  const userInfo = getCurrentUser(store.getState())
  const token = pathToken || getAuthToken()
  if (userInfo.userId) {
    return null
  }
  if (pathToken) {
    ILLABuilderStorage.setLocalStorage("token", pathToken, -1)
    // remove url params form location
    const url = removeUrlParams(window.location.href, ["token"])
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${url.search}`,
    )
  }
  if (!userInfo?.userId) {
    if (!token) {
      clearRequestPendingPool()
      return redirect(cloudRedirect)
    } else {
      const userInfo = await getUserInfo()

      if (!userInfo) {
        return redirect(cloudRedirect)
      }
      // todo: very hack,need loader refactor
      const { language } = userInfo
      const localLanguage = getIllaLanguage()
      if (localLanguage !== language) {
        window.localStorage.setItem("i18nextLng", language)
        window.location.reload()
        return null
      }
    }
  }
  try {
    await getTeamsInfo(teamIdentifier)
  } catch (e) {
    if (e === "have no team match") {
      throw new Error(e)
    }
    console.error(e)
  }
  return null
}
