import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { RootState } from "@/store"

export const actionsAsync = (
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
    case "addActionItemReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.BROADCAST_ONLY,
          TextTarget.ACTION,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "batchAddActionItemReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.BROADCAST_ONLY,
          TextTarget.ACTION,
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
          TextSignal.BROADCAST_ONLY,
          TextTarget.ACTION,
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
          TextSignal.BROADCAST_ONLY,
          TextTarget.ACTION,
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
          TextSignal.BROADCAST_ONLY,
          TextTarget.ACTION,
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
          TextSignal.BROADCAST_ONLY,
          TextTarget.ACTION,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "batchUpdateResourceID": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.BROADCAST_ONLY,
          TextTarget.ACTION,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "batchUpdateActionItemReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.BROADCAST_ONLY,
          TextTarget.ACTION,
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
