import { UnknownAction } from "@reduxjs/toolkit"
import { REDUX_ACTION_FROM } from "@/middleware/undoRedo/interface"

export const receiveMessage = (action: UnknownAction, currentAppID: string) => {
  const { type, payload } = action
  const typeList = type.split("/")
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  const newType = `${reduxType}/${reduxAction}`
  action.type = newType
  action.from = REDUX_ACTION_FROM.WS

  switch (newType) {
    case "enter/remote": {
      if (currentAppID !== "") {
        action.type = "collaborators/setInRoomUsers"
      }
      break
    }
    case "attachComponent/remote": {
      if (currentAppID !== "") {
        if (
          typeof payload === "object" &&
          payload !== null &&
          "componentAttachedUsers" in payload
        ) {
          action.type = "collaborators/updateComponentAttachedUsers"
          action.payload = payload.componentAttachedUsers
        }
      }
      break
    }
    default: {
      break
    }
  }
}
