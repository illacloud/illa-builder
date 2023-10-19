import { currentUserActions } from "@illa-public/user-data"
import { sendConfigEvent } from "@illa-public/utils"
import { LoaderFunction, defer, redirect } from "react-router-dom"
import {
  fetchAPPPublicStatus,
  fetchPrivateAppInitData,
  fetchPubicAppInitData,
} from "@/services/apps"
import { fetchUserInfo, tryFetchUserInfo } from "@/services/users"
import store from "@/store"
import { getTeamsInfoLoader } from "./cloudAuthLoader"

export const deployLoader: LoaderFunction = async (args) => {
  const { appId, teamIdentifier } = args.params
  if (!appId || !teamIdentifier) {
    return redirect("/404")
  }

  try {
    const publicStateResponse = await fetchAPPPublicStatus(
      appId,
      teamIdentifier,
      args.request.signal,
    )

    const isPublic = publicStateResponse.data.isPublic
    if (isPublic) {
      const userInfo = await tryFetchUserInfo()
      if (userInfo) {
        store.dispatch(
          currentUserActions.updateCurrentUserReducer(userInfo.data),
        )
      }
      const appInfo = fetchPubicAppInitData(
        appId,
        "-2",
        teamIdentifier,
        args.request.signal,
      )
      return defer({
        isPublic,
        appInfo,
      })
    } else {
      const teamInfoLoaderResponse = await getTeamsInfoLoader(args)
      if (teamInfoLoaderResponse) {
        return teamInfoLoaderResponse
      }
      const userInfo = await fetchUserInfo()
      sendConfigEvent(userInfo?.data.userID)
      store.dispatch(currentUserActions.updateCurrentUserReducer(userInfo.data))
      const appInfo = fetchPrivateAppInitData(appId, "-2", args.request.signal)
      return defer({
        isPublic,
        appInfo,
      })
    }
  } catch (e) {
    return redirect("/404")
  }
}
