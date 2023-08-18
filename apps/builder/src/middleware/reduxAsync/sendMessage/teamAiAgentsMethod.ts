import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { RootState } from "@/store"

export const teamAiAgentsAsync = (
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
    case "addTeamAiAgentReducer":
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
    case "removeTeamAiAgentReducer":
      Connection.getTextRoom("dashboard", "")?.send(
        getTextMessagePayload(
          TextSignal.GLOBAL_BROADCAST_ONLY,
          TextTarget.APPS,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    case "modifyTeamAiAgentReducer":
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
