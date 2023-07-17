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

export interface SnapshotList {
  snapshotList: Snapshot[]
  totalPage: number
}

export interface CurrentSnapshotList extends SnapshotList {
  snapshotList: Snapshot[]
  totalPage: number
  hasMore: boolean
}

export interface CurrentAppHistory extends CurrentSnapshotList {
  currentSnapshotID?: string
}

const initialSnapshot = [
  {
    snapshotID: "14312",
    snapshotTriggerMode: 1, // 1, automatic, 2, manual
    modifyHistory: [
      {
        operation: 1, // 详见 [App Operaion List](#app-operaion-list)
        operationTarget: 2, // 详见 [App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "input1",
        modifiedBy: "username",
        modifiedAt: "2023-03-03 15:54:17.486328",
      },
      {
        operation: 2, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 4, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "table1",
        modifiedBy: "username",
        modifiedAt: "2023-03-03 15:54:17.486328",
      },
    ],
    createdAt: "2023-03-03 15:54:17.486328",
  },
  {
    snapshotID: "14313",
    snapshotTriggerMode: 2, // 1, automatic, 2, manual
    modifyHistory: [
      {
        operation: 1, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 2, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "input1",
        modifiedBy: "username",
        modifiedAt: "2023-03-03 15:54:17.486328",
      },
      {
        operation: 2, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 4, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "table1",
        modifiedBy: "username",
        modifiedAt: "2023-03-03 15:54:17.486328",
      },
    ],
    createdAt: "2023-03-03 15:54:17.486328",
  },
]
export const CurrentAppHistoryInitialState: CurrentAppHistory = {
  snapshotList: initialSnapshot,
  totalPage: 0,
  hasMore: false,
}
