import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import { RootState } from "@/store"

export const appInfoAsync = (
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
    case "updateAppInfoReducer": {
      Connection.getRoom("app", currentAppID)?.send(
        getPayload(
          Signal.SIGNAL_UPDATE_STATE,
          Target.TARGET_APPS,
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
