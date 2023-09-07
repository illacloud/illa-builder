import { LoaderFunction, defer, redirect } from "react-router-dom"
import {
  fetchAPPPublicStatus,
  fetchPrivateAppInitData,
  fetchPubicAppInitData,
} from "@/services/apps"
import { fetchUserInfo } from "@/services/users"

export const deployLoader: LoaderFunction = async (args) => {
  const { appId, ownerTeamIdentifier } = args.params
  if (!appId || !ownerTeamIdentifier) {
    return redirect("/404")
  }

  let userInfo = undefined
  try {
    const publicStateResponse = await fetchAPPPublicStatus(
      appId,
      ownerTeamIdentifier,
      args.request.signal,
    )
    const isPublic = publicStateResponse.data.isPublic
    if (isPublic) {
      const appInfo = fetchPubicAppInitData(
        appId,
        "-2",
        ownerTeamIdentifier,
        args.request.signal,
      )
      return defer({
        isPublic,
        appInfo,
        userInfo,
      })
    } else {
      const userInfo = fetchUserInfo()
      const appInfo = fetchPrivateAppInitData(appId, "-2", args.request.signal)
      return defer({
        isPublic,
        appInfo,
        userInfo,
      })
    }
  } catch (e) {
    return redirect("/404")
  }
}
