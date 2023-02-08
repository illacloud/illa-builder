import { redirect } from "react-router-dom"
import { CloudBaseApi } from "@/api/cloudApi"
import { clearRequestPendingPool } from "@/api/helpers/axiosPendingPool"
import { getTeamsInfo } from "@/api/team"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { UserInfoResponse } from "@/redux/currentUser/currentUserState"
import { cloudUrl } from "@/router/routerConfig"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"
import { setLocalStorage } from "@/utils/storage"

const getUserInfo = (token: string) => {
  return new Promise<UserInfoResponse>((resolve, reject) => {
    CloudBaseApi.request<UserInfoResponse>(
      {
        url: "/users",
        method: "GET",
        headers: {
          Authorization: token,
        },
      },
      (response) => {
        // TIPS: can check user role
        store.dispatch(
          currentUserActions.updateCurrentUserReducer({
            ...response.data,
            userId: response.data.id,
          }),
        )
        resolve(response.data)
      },
      (e) => {
        reject(e)
      },
      (e) => {
        console.error("getUserInfo error", e)
        reject(e)
      },
    )
  })
}

export const requireAuth = async (
  pathToken?: string | null,
  teamIdentifier?: string,
) => {
  const userInfo = getCurrentUser(store.getState())
  const token = getAuthToken() || pathToken
  if (pathToken) {
    setLocalStorage("token", pathToken, -1)
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
    console.error(e)
  }
  return null
}
