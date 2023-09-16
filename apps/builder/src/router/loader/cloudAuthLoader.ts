import { ILLAMixpanel } from "@illa-public/mixpanel-utils"
import {
  currentUserActions,
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import { canAccessManage } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { LoaderFunction, redirect } from "react-router-dom"
import i18n from "@/i18n/config"
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

  if (userInfo.userID) {
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
      ILLAMixpanel.getMixpanelInstance()?.identify(response.data.userID)
      const reportedUserInfo: Record<string, any> = {}
      Object.entries(response.data).forEach(([key, value]) => {
        reportedUserInfo[`illa_${key}`] = value
      })
      ILLAMixpanel.getMixpanelInstance()?.people.set(reportedUserInfo)
      store.dispatch(currentUserActions.updateCurrentUserReducer(response.data))
      return null
    } catch (e) {
      ILLAMixpanel.getMixpanelInstance()?.reset()
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
      isCloudVersion &&
      !canAccessManage(
        currentTeamInfo.myRole,
        getPlanUtils(currentTeamInfo),
        currentTeamInfo.totalTeamLicense.teamLicenseAllPaid,
      )
    ) {
      return redirect(`${cloudUrl}/workspace/${currentTeamInfo.identifier}`)
    }
    return null
  }
  return redirect("/403")
}
