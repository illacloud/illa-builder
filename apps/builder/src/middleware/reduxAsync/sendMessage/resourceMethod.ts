import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import { RootState } from "@/store"

export const resourcesAsync = (
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
    case "addResourceItemReducer": {
      if (currentAppID) {
        Connection.getRoom("app", currentAppID)?.send(
          getPayload(
            Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
            Target.TARGET_RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      } else {
        Connection.getRoom("dashboard", "")?.send(
          getPayload(
            Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
            Target.TARGET_RESOURCE,
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
        Connection.getRoom("app", currentAppID)?.send(
          getPayload(
            Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
            Target.TARGET_RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      } else {
        Connection.getRoom("dashboard", "")?.send(
          getPayload(
            Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
            Target.TARGET_RESOURCE,
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
        Connection.getRoom("app", currentAppID)?.send(
          getPayload(
            Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
            Target.TARGET_RESOURCE,
            true,
            action,
            teamID,
            uid,
            [payload],
          ),
        )
      } else {
        Connection.getRoom("dashboard", "")?.send(
          getPayload(
            Signal.SIGNAL_GLOBAL_BROADCAST_ONLY,
            Target.TARGET_RESOURCE,
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
