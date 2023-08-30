import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
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
          TextSignal.CREATE_STATE,
          TextTarget.APPS,
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
          TextSignal.DELETE_STATE,
          TextTarget.APPS,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    case "updateDashboardAppPublicReducer":
    case "updateDashboardAppContributeReducer":
    case "updateDashboardAppDeployedReducer":
    case "updateDashboardAppReducer":
      Connection.getTextRoom("dashboard", "")?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.APPS,
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
