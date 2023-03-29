import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
import { RootState } from "@/store"

export const dottedLineSquareAsync = (
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
    case "addOrUpdateDottedLineSquareReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.DOTTED_LINE_SQUARE,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "removeDottedLineSquareReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.DOTTED_LINE_SQUARE,
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
