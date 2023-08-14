import userDataStore, {
  currentUserActions,
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import { LoaderFunction, redirect } from "react-router-dom"
import { fetchMyTeamsInfo } from "@/services/team"
import { fetchUserInfo } from "@/services/users"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"

export const getSelfHostUserInfoLoader: LoaderFunction = async () => {
  const authToken = getAuthToken()
  const currentUser = getCurrentUser(userDataStore.getState())

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

export const getSelfHostTeamsInfoLoader: LoaderFunction = async (args) => {
  const { params } = args
  const { teamIdentifier } = params
  const currentTeamInfoInDisk = getCurrentTeamInfo(store.getState())
  if (currentTeamInfoInDisk?.id) {
    return null
  }
  if (!teamIdentifier) {
    return redirect("/login")
  }
  const response = await fetchMyTeamsInfo()
  const teamsInfo = response.data ?? []
  const currentTeamInfo = teamsInfo.find(
    (item) => item.identifier === teamIdentifier,
  )
  if (currentTeamInfo) {
    store.dispatch(
      teamActions.updateTeamReducer({
        currentId: currentTeamInfo.id,
        items: teamsInfo,
      }),
    )

    return null
  }
  return redirect("/404")
}
