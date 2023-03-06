import axios from "axios"
import { redirect } from "react-router-dom"
import { clearRequestPendingPool } from "@/api/helpers/axiosPendingPool"
import { getTeamsInfo } from "@/api/team"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { UserInfoResponse } from "@/redux/currentUser/currentUserState"
import { cloudUrl } from "@/router/routerConfig"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"
import { setLocalStorage } from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"

const CLOUD = "/supervisor/api/v1"

export const getUserInfo = async (token?: string) => {
  try {
    const response = await axios.get<UserInfoResponse>("/users", {
      baseURL: isCloudVersion
        ? `${location.protocol}//${import.meta.env.VITE_API_BASE_URL}${CLOUD}`
        : `${location.origin}${CLOUD}`,
      headers: token
        ? {
            Authorization: token,
          }
        : {},
    })
    store.dispatch(
      currentUserActions.updateCurrentUserReducer({
        ...response.data,
        userId: response.data.id,
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
  const token = getAuthToken() || pathToken
  if (userInfo.userId) {
    return null
  }
  if (pathToken) {
    setLocalStorage("token", pathToken, -1)
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
      return redirect(cloudUrl)
    } else {
      const userInfo = await getUserInfo(token)
      if (!userInfo) {
        return redirect(cloudUrl)
      }
    }
  }
  try {
    await getTeamsInfo(teamIdentifier, token)
  } catch (e) {
    if (e === "have no team match") {
      throw new Error(e)
    }
    console.error(e)
  }
  return null
}
