import { getCurrentTeamInfo } from "@illa-public/user-data"
import { PayloadAction } from "@reduxjs/toolkit"
import { agentAsync } from "@/middleware/reduxAsync/sendMessage/agentMethod"
import store, { RootState } from "@/store"
import { actionsAsync } from "./actionMethod"
import { appInfoAsync } from "./appInfoMethod"
import { appsAsync } from "./appsMethod"
import { componentsAsync } from "./componentsMethod"
import { resourcesAsync } from "./resourceMethod"

export const sendMessage = (
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
      componentsAsync(
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
    case "action": {
      actionsAsync(
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
    case "apps": {
      appsAsync(
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
    case "appInfo": {
      appInfoAsync(
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
    case "resource": {
      resourcesAsync(
        reduxAction,
        currentAppID,
        action,
        teamID,
        id,
        prevRootState,
        nextRootState,
      )
      agentAsync(
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
