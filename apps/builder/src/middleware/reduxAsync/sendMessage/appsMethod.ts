import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
import { RootState } from "@/store"

export const appsAsync = (
  reduxAction: string,
  currentAppID: string,
  action: PayloadAction<any>,
  teamID: string,
  uid: string,
  _prevRootState: RootState,
  _nextRootState: RootState,
) => {
  const { payload } = action
  switch (reduxAction) {
    case "addDashboardAppReducer":
      Connection.getTextRoom("dashboard", "")?.send(
        getTextMessagePayload(
          Signal.CREATE_STATE,
          Target.APPS,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    case "removeDashboardAppReducer":
      Connection.getTextRoom("dashboard", "")?.send(
        getTextMessagePayload(
          Signal.GLOBAL_BROADCAST_ONLY,
          Target.APPS,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    case "updateDashboardAppReducer":
    case "renameDashboardAppReducer":
    case "modifyConfigDashboardAppReducer":
      Connection.getTextRoom("dashboard", "")?.send(
        getTextMessagePayload(
          Signal.UPDATE_STATE,
          Target.APPS,
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
