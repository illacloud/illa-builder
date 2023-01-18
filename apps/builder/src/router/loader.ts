import { redirect } from "react-router-dom"
import { Api } from "@/api/base"
import { clearRequestPendingPool } from "@/api/helpers/axiosPendingPool"
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

export const requireAuth = async (teamIdentifier?: string) => {
  const token = getAuthToken()
  if (!token) {
    clearRequestPendingPool()
    return redirect(ILLA_CLOUD_PATH)
  }
  try {
    await getTeamsInfo(teamIdentifier)
  } catch (e) {
    console.error(e)
    return redirect("/login")
  }
}
