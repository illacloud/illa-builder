import { Signal, Target } from "@/api/ws/ILLA_PROTO"

export enum SnapshotTriggerMode {
  AUTOMATIC = 1,
  MANUAL = 2,
}

interface UserInfo {
  userID: string
  nickname: string
  avatar: string
  email: string
}

export interface ModifyHistory {
  operation: Signal
  operationTarget: Target
  operationTargetName: string
  modifiedBy: UserInfo
  modifiedAt: string
}

export interface Snapshot {
  teamID: string
  appID: string
  snapshotID: string
  snapshotTriggerMode: SnapshotTriggerMode
  modifyHistory: ModifyHistory[]
  targetVersion: number
  createdAt: string
}

export interface SnapshotList {
  snapshotList: Snapshot[]
  totalPages: number
}

export interface CurrentSnapshotList extends SnapshotList {
  hasMore: boolean
}

export interface CurrentAppHistory extends CurrentSnapshotList {
  currentSnapshotID?: string
}

export const CurrentAppHistoryInitialState: CurrentAppHistory = {
  snapshotList: [],
  totalPages: 0,
  hasMore: false,
}
