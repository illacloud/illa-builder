import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { RootState } from "@/store"

export const resourcesAsync = (
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
    case "addResourceItemReducer": {
      if (currentAppID) {
        Connection.getTextRoom("app", currentAppID)?.send(
          getTextMessagePayload(
            TextSignal.GLOBAL_BROADCAST_ONLY,
            TextTarget.RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      } else {
        Connection.getTextRoom("dashboard", "")?.send(
          getTextMessagePayload(
            TextSignal.GLOBAL_BROADCAST_ONLY,
            TextTarget.RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      }
      break
    }
    case "updateResourceItemReducer": {
      if (currentAppID) {
        Connection.getTextRoom("app", currentAppID)?.send(
          getTextMessagePayload(
            TextSignal.GLOBAL_BROADCAST_ONLY,
            TextTarget.RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      } else {
        Connection.getTextRoom("dashboard", "")?.send(
          getTextMessagePayload(
            TextSignal.GLOBAL_BROADCAST_ONLY,
            TextTarget.RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      }

      break
    }
    case "removeResourceItemReducer": {
      if (currentAppID) {
        Connection.getTextRoom("app", currentAppID)?.send(
          getTextMessagePayload(
            TextSignal.GLOBAL_BROADCAST_ONLY,
            TextTarget.RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      } else {
        Connection.getTextRoom("dashboard", "")?.send(
          getTextMessagePayload(
            TextSignal.GLOBAL_BROADCAST_ONLY,
            TextTarget.RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      }
      break
    }
  }
}
