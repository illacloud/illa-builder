import { AnyAction } from "@reduxjs/toolkit"
import { Connection } from "@/api/ws"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"
import { ILLARoute } from "@/router"

export const receiveMessage = (action: AnyAction, currentAppID: string) => {
  const { type, payload } = action
  const typeList = type.split("/")
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  const newType = `${reduxType}/${reduxAction}`
  action.type = newType
  action.from = REDUX_ACTION_FROM.WS

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
