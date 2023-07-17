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
  appRefID: string
  snapshotID: string
  snapshotTriggerMode: SnapshotTriggerMode
  modifyHistory: ModifyHistory[]
  targetVersion: number
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

const initialSnapshot: Snapshot[] = [
  {
    snapshotID: "ILA00012",
    teamID: "ILAex4p1C7YJ",
    appRefID: "ILAex4p1C7U3",
    targetVersion: 0, // 0 代表当前正在编辑的版本, 是不能恢复到这个版本的.
    snapshotTriggerMode: 1, // 1, automatic, 2, manual
    modifyHistory: [
      {
        operation: 1, // 详见 [App Operaion List](#app-operaion-list)
        operationTarget: 2, // 详见 [App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "input1",
        modifiedBy: {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
        },
        modifiedAt: "2023-03-03 15:54:17.486328",
      },
      {
        operation: 2, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 4, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "table1",
        modifiedBy: {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
        },
        modifiedAt: "2023-03-03 15:54:19.486328",
      },
    ],
    createdAt: "2023-03-03 15:54:17.486328",
  },
  {
    snapshotID: "ILA00013",
    teamID: "ILAex4p1C7YJ",
    appRefID: "ILAex4p1C7U3",
    targetVersion: 192, // 非 0 版本即为 App 的内部历史快照内部版本, 是内部使用的, 恢复快照需要传 snapshotID, 而不是这个字段.
    snapshotTriggerMode: 2, // 1, automatic, 2, manual
    modifyHistory: [
      {
        operation: 1, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 2, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "input1",
        modifiedBy: {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
        },
        modifiedAt: "2023-03-03 15:54:17.486328",
      },
      {
        operation: 2, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 4, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "table1",
        modifiedBy: {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
        },
        modifiedAt: "2023-03-03 15:54:18.486328",
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
