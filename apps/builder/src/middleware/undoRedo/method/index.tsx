import { AnyAction } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { actionsSnapShot } from "./action"
import { componentsSnapShot } from "./components"

export const undoRedoMethod = (
  prevRootState: RootState,
  nextRootState: RootState,
  action: AnyAction,
) => {
  const { type } = action
  const typeList = type.split("/")
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  switch (reduxType) {
    case "components": {
      componentsSnapShot(reduxAction, action, prevRootState, nextRootState)
      break
    }
    case "action": {
      actionsSnapShot(reduxAction, action, prevRootState, nextRootState)
      break
    }
    default:
      break
  }
}
