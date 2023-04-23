import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
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
            Signal.GLOBAL_BROADCAST_ONLY,
            Target.RESOURCE,
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
            Signal.GLOBAL_BROADCAST_ONLY,
            Target.RESOURCE,
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
            Signal.GLOBAL_BROADCAST_ONLY,
            Target.RESOURCE,
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
            Signal.GLOBAL_BROADCAST_ONLY,
            Target.RESOURCE,
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
            Signal.GLOBAL_BROADCAST_ONLY,
            Target.RESOURCE,
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
            Signal.GLOBAL_BROADCAST_ONLY,
            Target.RESOURCE,
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
