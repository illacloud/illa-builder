import { builderRequest } from "@/api/http"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"

export enum SnapshotTriggerMode {
  AUTOMATIC = 1,
  MANUAL = 2,
}

export interface ModifyHistory {
  operation: Signal
  operationTarget: Target
  operationTargetName: string
  modifiedBy: string
  modifiedAt: string
}

export interface Snapshot {
  snapshotID: string
  snapshotTriggerMode: SnapshotTriggerMode
  modifyHistory: ModifyHistory[]
  createdAt: string
}

export interface SnapshotList {
  snapshotList: Snapshot[]
}

export const getSnapShotList = (params: {
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

export const getSnapShot = (
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
