import { LoaderFunction, redirect } from "react-router-dom"
import { getCurrentUserIsLogin } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { teamActions } from "@/redux/team/teamSlice"
import { fetchMyTeamsInfo } from "@/services/team"
import { fetchUserInfo } from "@/services/users"
import store from "@/store"
import { getAuthToken } from "@/utils/auth"
import { ILLABuilderStorage } from "@/utils/storage"
import { ILLAMixpanel } from "../../illa-public-component/MixpanelUtils"

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
  const isLogin = getCurrentUserIsLogin(store.getState())

  if (isLogin) {
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
      return redirect("", {
        status: 302,
        headers: {
          Location: "/403",
        },
      })
    }
  }
  return redirect("", {
    status: 302,
    headers: {
      Location: "/403",
    },
  })
}

export const getTeamsInfoLoader: LoaderFunction = async (args) => {
  const { params } = args
  const { teamIdentifier } = params
  const currentTeamInfoInDisk = getCurrentTeamInfo(store.getState())
  if (currentTeamInfoInDisk?.id) {
    return null
  }
  if (!teamIdentifier) {
    return redirect("", {
      status: 302,
      headers: {
        Location: "/403",
      },
    })
  }
  const response = await fetchMyTeamsInfo()
  const teamsInfo = response.data ?? []
  const currentTeamInfo = teamsInfo.find(
    (item) => item.identifier === teamIdentifier,
  )
  if (currentTeamInfo) {
    store.dispatch(teamActions.updateCurrentIdReducer(currentTeamInfo.id))
    store.dispatch(teamActions.updateTeamItemsReducer(teamsInfo))
    ILLAMixpanel.getOriginalMixpanel().set_group("team", teamIdentifier)
    return null
  }
  return redirect("", {
    status: 302,
    headers: {
      Location: "/403",
    },
  })
}
