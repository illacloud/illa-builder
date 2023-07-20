import { builderRequest, builderWSRequest } from "@/api/http"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { SnapshotList } from "@/redux/currentAppHistory/currentAppHistoryState"

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
      needTeamID: true,
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
      needTeamID: true,
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
      needTeamID: true,
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
      needTeamID: true,
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
      needTeamID: true,
    },
  )
}
