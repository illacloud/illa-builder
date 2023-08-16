import { builderRequest, builderWSRequest } from "@illa-public/illa-net"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { SnapshotList } from "@/redux/currentAppHistory/currentAppHistoryState"
import { getCurrentTeamID } from "../utils/team"

export const fetchSnapShotList = (params: {
  appID: string
  page: number
  pageLimit?: number
  signal?: AbortSignal
}) => {
  const { appID, page, pageLimit = 10, signal } = params
  return builderRequest<SnapshotList>(
    {
      url: `/apps/${appID}/snapshotList/limit/${pageLimit}/page/${page}`,
      method: "GET",
      signal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchSnapShot = (
  appID: string,
  snapshotID: string,
  signal?: AbortSignal,
) => {
  return builderRequest<CurrentAppResp>(
    {
      url: `/apps/${appID}/snapshot/${snapshotID}`,
      method: "GET",
      signal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const recoverSnapShot = (appID: string, snapshotID: string) => {
  return builderRequest(
    {
      url: `/apps/${appID}/recoverSnapshot/${snapshotID}`,
      method: "POST",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}
export const recoverSnapShotWS = (appID: string) => {
  return builderWSRequest(
    {
      url: `/apps/${appID}/recoverSnapshot`,
      method: "POST",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

// Take snapshot for current App
export const takeSnapShot = (appID: string) => {
  return builderRequest(
    {
      url: `/apps/${appID}/takeSnapshot`,
      method: "POST",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}
