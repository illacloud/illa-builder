import { PayloadAction } from "@reduxjs/toolkit"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { RootState } from "@/store"
import { componentsOperationReport } from "./component"

export const reportMessage = (
  prevRootState: RootState,
  nextRootState: RootState,
  action: PayloadAction<any>,
) => {
  const currentAppID = nextRootState.currentApp.appInfo.appId ?? ""
  const { id: teamID = "", id = "" } = getCurrentTeamInfo(nextRootState) ?? {}
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
