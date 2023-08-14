import userDataStore, { getCurrentTeamInfo } from "@illa-public/user-data"
import { LoaderFunction, defer, redirect } from "react-router-dom"
import {
  fetchAPPPublicStatus,
  fetchPrivateAppInitData,
  fetchPubicAppInitData,
} from "@/services/apps"
import { fetchResources } from "@/services/resource"
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
      const teamInfo = getCurrentTeamInfo(userDataStore.getState())
      if (teamInfo && teamInfo.identifier !== teamIdentifier) {
        return redirect("/403")
      }
      if (!teamInfo) {
        const teamInfoLoaderResponse = await getTeamsInfoLoader(args)
        if (teamInfoLoaderResponse) {
          return teamInfoLoaderResponse
        }
      }
      const appInfo = fetchPrivateAppInitData(
        appId,
        "-2",
        teamIdentifier,
        args.request.signal,
      )
      const resourceInfo = fetchResources(args.request.signal)

      return defer({
        isPublic,
        appInfo,
        resourceInfo,
      })
    }
  } catch (e) {
    return redirect("/404")
  }
}
