import {
  currentUserActions,
  getCurrentUser,
  getTeamItems,
  teamActions,
} from "@illa-public/user-data"
import { getAuthToken, sendConfigEvent } from "@illa-public/utils"
import { LoaderFunctionArgs, redirect } from "react-router-dom"
import { fetchCurrentUserTeamsInfo } from "@/services/team"
import { fetchUserInfo } from "@/services/user"
import { store } from "@/store"
import { getLocalCurrentTeamID } from "@/utils/auth"

export const getUserInfoLoader = async () => {
  const userInfo = getCurrentUser(store.getState())
  if (!userInfo?.userID) {
    const token = getAuthToken()
    if (!token) {
      return false
    } else {
      try {
        const { data } = await fetchUserInfo()
        sendConfigEvent(data?.userID)
        const reportedUserInfo: Record<string, any> = {}
        Object.entries(userInfo).forEach(([key, value]) => {
          reportedUserInfo[`illa_${key}`] = value
        })

        store.dispatch(currentUserActions.updateCurrentUserReducer(data))
        return true
      } catch (e) {
        return false
      }
    }
  }
  return true
}

export const getTeamsInfoLoader = async () => {
  const userListInDisk = getTeamItems(store.getState())
  if (userListInDisk) {
    return userListInDisk
  }
  try {
    const response = await fetchCurrentUserTeamsInfo()
    store.dispatch(teamActions.updateTeamItemsReducer(response.data ?? []))
    return response.data ?? []
  } catch (e) {
    store.dispatch(teamActions.updateTeamItemsReducer([]))
    return []
  }
}

export const needAuthLoader = async (args: LoaderFunctionArgs) => {
  const { params } = args
  const isLogin = await getUserInfoLoader()
  if (isLogin) {
    const { teamIdentifier } = params
    const teamList = await getTeamsInfoLoader()
    if (teamIdentifier) {
      const team = teamList.find((team) => team.identifier === teamIdentifier)
      if (!team) {
        return redirect("/404")
      }
      store.dispatch(teamActions.updateCurrentIdReducer(team.id))
    } else {
      let currentTeamID = getLocalCurrentTeamID()
      const currentTeam = teamList.find((team) => team.id === currentTeamID)
      if (!currentTeam) {
        if (teamList.length > 0) {
          store.dispatch(teamActions.updateCurrentIdReducer(teamList[0].id))
        }
      } else {
        store.dispatch(teamActions.updateCurrentIdReducer(currentTeam.id))
      }
    }
  } else {
    return redirect("/login")
  }
  return null
}
