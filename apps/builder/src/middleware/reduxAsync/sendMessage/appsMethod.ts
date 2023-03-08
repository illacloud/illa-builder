import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import { RootState } from "@/store"

export const appsAsync = (
  reduxAction: string,
  currentAppID: string,
  action: PayloadAction<any>,
  teamID: string,
  uid: string,
  prevRootState: RootState,
  nextRootState: RootState,
) => {
  const { payload } = action
  switch (reduxAction) {
    case "addDashboardAppReducer":
      Connection.getRoom("dashboard", "")?.send(
        getPayload(
          Signal.SIGNAL_CREATE_STATE,
          Target.TARGET_APPS,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    case "removeDashboardAppReducer":
      Connection.getRoom("dashboard", "")?.send(
        getPayload(
          Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
          Target.TARGET_APPS,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    case "renameDashboardAppReducer":
      Connection.getRoom("dashboard", "")?.send(
        getPayload(
          Signal.SIGNAL_UPDATE_STATE,
          Target.TARGET_APPS,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    case "modifyConfigDashboardAppReducer":
      Connection.getRoom("dashboard", "")?.send(
        getPayload(
          Signal.SIGNAL_UPDATE_STATE,
          Target.TARGET_APPS,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    default:
      break
  }
}
