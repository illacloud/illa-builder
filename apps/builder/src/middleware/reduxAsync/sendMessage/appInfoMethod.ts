import { PayloadAction } from "@reduxjs/toolkit"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { RootState } from "@/store"

export const appInfoAsync = (
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
    case "updateAppContributeReducer":
    case "updateAppPublicReducer":
    case "updateAppDeployedReducer":
    case "updateAppInfoReducer": {
      Connection.getTextRoom("app", currentAppID)?.send(
        getTextMessagePayload(
          TextSignal.UPDATE_STATE,
          TextTarget.APPS,
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
