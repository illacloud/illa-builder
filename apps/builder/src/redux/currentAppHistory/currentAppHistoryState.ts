import { Signal, Target } from "@/api/ws/ILLA_PROTO"

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

export interface CurrentAppHistory {
  snapshotList: Snapshot[]
  currentSnapshotID?: string
}

export const CurrentAppHistoryInitialState: CurrentAppHistory = {
  snapshotList: [],
}
