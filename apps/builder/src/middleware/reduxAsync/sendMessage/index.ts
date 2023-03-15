import { PayloadAction } from "@reduxjs/toolkit"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { RootState } from "@/store"
import { actionsAsync } from "./actionMethod"
import { appsAsync } from "./appsMethod"
import { componentsAsync } from "./componentsMethod"
import { dottedLineSquareAsync } from "./dottedLineSquareMethod"
import { dragShadowAsync } from "./dragShadowMethod"
import { resourcesAsync } from "./resourceMethod"

export const sendMessage = (
  prevRootState: RootState,
  nextRootState: RootState,
  action: PayloadAction<any>,
) => {
  const currentAppID = nextRootState.currentApp.appInfo.appId ?? ""
  const { id: teamID = "", uid = "" } = getCurrentTeamInfo(nextRootState) ?? {}
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
        uid,
        prevRootState,
        nextRootState,
      )
      break
    }

    case "dragShadow": {
      dragShadowAsync(
        reduxAction,
        currentAppID,
        action,
        teamID,
        uid,
        prevRootState,
        nextRootState,
      )
      break
    }
    case "dottedLineSquare": {
      dottedLineSquareAsync(
        reduxAction,
        currentAppID,
        action,
        teamID,
        uid,
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
        uid,
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
        uid,
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
        uid,
        prevRootState,
        nextRootState,
      )
      break
    }
    default:
      break
  }
}
