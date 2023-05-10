import { LoaderFunction, redirect } from "react-router-dom"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { teamActions } from "@/redux/team/teamSlice"
import { fetchMyTeamsInfo } from "@/services/team"
import { fetchUserInfo } from "@/services/users"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"

export const getSelfHostUserInfoLoader: LoaderFunction = async () => {
  const authToken = getAuthToken()
  const currentUser = getCurrentUser(store.getState())

  if (currentUser.userId) {
    return null
  }
  if (authToken) {
    try {
      const response = await fetchUserInfo()
      store.dispatch(
        currentUserActions.updateCurrentUserReducer({
          ...response.data,
          userId: response.data.userID,
        }),
      )
      return null
    } catch (e) {
      return redirect("/500")
    }
  }

  return redirect("/login")
}

export const getSelfHostTeamsInfoLoader: LoaderFunction = async () => {
  const currentTeamInfoInDisk = getCurrentTeamInfo(store.getState())
  if (currentTeamInfoInDisk?.id) {
    return null
  }
  try {
    const response = await fetchMyTeamsInfo()
    const teamsInfo = response.data ?? []
    store.dispatch(
      teamActions.updateTeamReducer({
        currentId: teamsInfo?.[0]?.id,
        items: teamsInfo,
      }),
    )
    return null
  } catch (e) {
    return redirect("/500")
  }
}
