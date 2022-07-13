import * as Redux from "redux"
import { addOrUpdateDragShadowReducer } from "@/redux/currentApp/editor/dragShadow/dragShadowReducer"

export const reduxAsync: Redux.Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const resp = next(action)
  const typeList = type.split("/")
  if (typeList[typeList.length] === "remote") {
    return
  }
  const reduxType = typeList[0]
  const reduxAction = typeList[1]
  switch (reduxType) {
    case "components":
      break
    case "dependencies":
      break
    case "dragShadow":
      switch (reduxAction) {
        case "addOrUpdateDragShadowReducer":
          break
        case "removeDragShadowReducer":
          break
      }
      break
    case "dottedLineSquare":
      switch (reduxAction) {
        case "addOrUpdateDottedLineSquareReducer":
          break
        case "removeDottedLineSquareReducer":
          break
      }
      break
    case "displayName":
      switch (reduxAction) {
        case "addDisplayNameReducer":
          break
        case "removeDisplayNameReducer":
          break
      }
      break
  }
  return resp
}
