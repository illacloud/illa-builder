import { LoaderFunction, redirect } from "react-router-dom"
import i18n from "@/i18n/config"
import { ILLAMixpanel } from "@/illa-public-component/MixpanelUtils"
import { canAccessManage } from "@/illa-public-component/UserRoleUtils"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { teamActions } from "@/redux/team/teamSlice"
import { cloudUrl } from "@/router/constant"
import { fetchMyTeamsInfo } from "@/services/team"
import { fetchUserInfo } from "@/services/users"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"
import { ILLABuilderStorage } from "@/utils/storage"

export const setTokenToLocalStorageLoader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url)
  const searchParams = url.searchParams
  const token = searchParams.get("token")
  if (token) {
    ILLABuilderStorage.setLocalStorage("token", token, -1)
  }
  return null
}

export const getUserInfoLoader: LoaderFunction = async () => {
  const authToken = getAuthToken()
  const userInfo = getCurrentUser(store.getState())
  const currentLng = window.localStorage.getItem("i18nextLng")

  if (userInfo.userId) {
    const lng = userInfo.language
    if (lng && currentLng !== lng) {
      i18n.changeLanguage(lng)
      window.location.reload()
    }
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

      store.dispatch(
        currentUserActions.updateCurrentUserReducer({
          ...response.data,
          userId: response.data.userID,
        }),
      )
      return null
    } catch (e) {
      return redirect("/403")
    }
  }
  return redirect("/403")
}

export const getTeamsInfoLoader: LoaderFunction = async (args) => {
  const { params } = args
  const { teamIdentifier } = params
  const currentTeamInfoInDisk = getCurrentTeamInfo(store.getState())
  if (currentTeamInfoInDisk?.id) {
    return null
  }
  if (!teamIdentifier) {
    return redirect("/403")
  }
  const response = await fetchMyTeamsInfo()
  const teamsInfo = response.data ?? []
  const currentTeamInfo = teamsInfo.find(
    (item) => item.identifier === teamIdentifier,
  )
  if (currentTeamInfo) {
    store.dispatch(teamActions.updateCurrentIdReducer(currentTeamInfo.id))
    store.dispatch(teamActions.updateTeamItemsReducer(teamsInfo))
    ILLAMixpanel.setGroup(teamIdentifier)
    if (
      !canAccessManage(
        currentTeamInfo.myRole,
        currentTeamInfo.totalTeamLicense.teamLicensePurchased,
      )
    ) {
      return redirect(`${cloudUrl}/workspace/${currentTeamInfo.identifier}`)
    }
    return null
  }
  return redirect("/403")
}
