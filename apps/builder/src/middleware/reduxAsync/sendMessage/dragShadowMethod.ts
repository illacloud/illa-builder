import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
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
      Connection.getRoom("app", currentAppID)?.send(
        getPayload(
          Signal.SIGNAL_ONLY_BROADCAST,
          Target.TARGET_DRAG_SHADOW,
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
      Connection.getRoom("app", currentAppID)?.send(
        getPayload(
          Signal.SIGNAL_ONLY_BROADCAST,
          Target.TARGET_DRAG_SHADOW,
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
