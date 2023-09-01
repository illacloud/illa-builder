import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { RootState } from "@/store"

export const agentAsync = (
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
    case "addTeamAIAgentReducer":
    case "removeTeamAIAgentReducer":
    case "modifyTeamAIAgentReducer":
      Connection.getTextRoom("dashboard", "")?.send(
        getTextMessagePayload(
          TextSignal.BROADCAST_ONLY,
          TextTarget.RESOURCE,
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
