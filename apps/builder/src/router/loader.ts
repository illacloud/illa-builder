import { redirect } from "react-router-dom"
import { Api } from "@/api/base"
import { AuthApi } from "@/api/cloudApi"
import { clearRequestPendingPool } from "@/api/helpers/axiosPendingPool"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { teamActions } from "@/redux/team/teamSlice"
import { TeamInfo } from "@/redux/team/teamState"
import { ILLA_CLOUD_PATH } from "@/router/routerConfig"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"

export const getTeamsInfo = (teamIdentifier?: string) => {
  return new Promise<TeamInfo>((resolve, reject) => {
    Api.request<TeamInfo[]>(
      {
        url: "/teams/my",
        method: "GET",
      },
      (response) => {
        const data = response.data ?? []
        const currentTeamInfo = data.find(
          (item) => item.identifier === teamIdentifier,
        )
        if (currentTeamInfo) {
          store.dispatch(teamActions.updateCurrentIdReducer(currentTeamInfo.id))
          store.dispatch(teamActions.updateTeamItemsReducer(data))
          resolve(currentTeamInfo)
        }
        reject("have no team match")
      },
      (e) => {
        reject(e)
      },
      (e) => {
        reject(e)
      },
    )
  })
}

const getUserInfo = (token: string) => {
  return new Promise<CurrentUser>((resolve, reject) => {
    AuthApi.request<CurrentUser>(
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
            nickname: response.data.nickname,
          }),
        )
        resolve(response.data)
      },
      (e) => {
        reject(e)
      },
      (e) => {
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
  if (!userInfo?.userId) {
    const token = getAuthToken() || pathToken
    if (!token) {
      clearRequestPendingPool()
      return redirect(ILLA_CLOUD_PATH)
    } else {
      const userInfo = await getUserInfo(token)
      if (!userInfo) {
        return redirect(ILLA_CLOUD_PATH)
      }
    }
  }
  try {
    await getTeamsInfo(teamIdentifier)
  } catch (e) {
    console.error(e)
  }
}
