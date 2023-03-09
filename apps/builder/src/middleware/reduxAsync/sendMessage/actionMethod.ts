import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
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
      Connection.getRoom("app", currentAppID)?.send(
        getPayload(
          Signal.SIGNAL_ONLY_BROADCAST,
          Target.TARGET_ACTION,
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
      Connection.getRoom("app", currentAppID)?.send(
        getPayload(
          Signal.SIGNAL_ONLY_BROADCAST,
          Target.TARGET_ACTION,
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
      Connection.getRoom("app", currentAppID)?.send(
        getPayload(
          Signal.SIGNAL_ONLY_BROADCAST,
          Target.TARGET_ACTION,
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
      Connection.getRoom("app", currentAppID)?.send(
        getPayload(
          Signal.SIGNAL_ONLY_BROADCAST,
          Target.TARGET_ACTION,
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
      Connection.getRoom("app", currentAppID)?.send(
        getPayload(
          Signal.SIGNAL_ONLY_BROADCAST,
          Target.TARGET_ACTION,
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
