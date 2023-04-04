import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
import { RootState } from "@/store"

export const actionsAsync = (
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
    case "addActionItemReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.ACTION,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "removeActionItemReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.ACTION,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "updateActionItemReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.ACTION,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "updateActionDisplayNameReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.ACTION,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "batchUpdateMultiActionSlicePropsReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.ACTION,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
  }
}
