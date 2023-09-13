import {
  currentUserActions,
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import { LoaderFunction, redirect } from "react-router-dom"
import i18n from "@/i18n/config"
import { fetchMyTeamsInfo } from "@/services/team"
import { fetchUserInfo } from "@/services/users"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"

export const getSelfHostUserInfoLoader: LoaderFunction = async () => {
  const authToken = getAuthToken()
  const userInfo = getCurrentUser(store.getState())
  const currentLng = window.localStorage.getItem("i18nextLng")

  if (userInfo.userID) {
    return null
  }
  if (authToken) {
    try {
      const response = await fetchUserInfo()
      const lng = response.data.language
      if (lng && currentLng !== lng) {
        i18n.changeLanguage(lng)
        window.location.reload()
      }
      store.dispatch(currentUserActions.updateCurrentUserReducer(response.data))
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
