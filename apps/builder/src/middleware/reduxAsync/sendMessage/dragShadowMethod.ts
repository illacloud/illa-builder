import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
import { RootState } from "@/store"

export const dragShadowAsync = (
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
    case "addOrUpdateDragShadowReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.DRAG_SHADOW,
          true,
          action,
          teamID,
          uid,
          [payload],
        ),
      )
      break
    }
    case "removeDragShadowReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          Signal.BROADCAST_ONLY,
          Target.DRAG_SHADOW,
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
