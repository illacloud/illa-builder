import { getCurrentTeamInfo } from "@illa-public/user-data"
import { PayloadAction } from "@reduxjs/toolkit"
import store, { RootState } from "@/store"
import { componentsOperationReport } from "./component"

export const reportMessage = (
  prevRootState: RootState,
  nextRootState: RootState,
  action: PayloadAction<any>,
) => {
  const currentAppID = nextRootState.currentApp.appInfo.appId ?? ""
  const { id: teamID = "", id = "" } =
    getCurrentTeamInfo(store.getState()) ?? {}
  const { type } = action
  const typeList = type.split("/")
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  switch (reduxType) {
    case "components": {
      componentsOperationReport(
        reduxAction,
        currentAppID,
        action,
        teamID,
        id,
        prevRootState,
        nextRootState,
      )
      break
    }

    default:
      break
  }
}
