import { PayloadAction } from "@reduxjs/toolkit"
import { Connection } from "@/api/ws"
import { ILLARoute } from "@/router"

export const receiveMessage = (
  action: PayloadAction<any>,
  currentAppID: string,
) => {
  const { type, payload } = action
  const typeList = type.split("/")
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  const newType = `${reduxType}/${reduxAction}`
  action.type = newType
  switch (newType) {
    case "apps/removeDashboardAppReducer": {
      if (payload === currentAppID) {
        const wsUrl = Connection.roomMap.get(currentAppID) ?? ""
        if (wsUrl) {
          Connection.leaveRoom("app", currentAppID)
        }
        ILLARoute.navigate("/404", {
          replace: true,
        })
      }
      break
    }
    case "enter/remote": {
      if (currentAppID !== "") {
        action.type = "collaborators/setInRoomUsers"
      }
      break
    }
    case "attachComponent/remote": {
      if (currentAppID !== "") {
        action.type = "collaborators/updateComponentAttachedUsers"
        action.payload = payload.componentAttachedUsers
      }
      break
    }
    default: {
      break
    }
  }
}
