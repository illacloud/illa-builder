import { configActions } from "@/redux/config/configSlice"
import { WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { FocusManager } from "../focusManager"

export function startDragMultiNodes(dragWidgetInfos: WidgetLayoutInfo[]) {
  store.dispatch(configActions.updateShowDot(true))
  const displayNames = dragWidgetInfos.map((node) => node.displayName)
  store.dispatch(configActions.setDraggingNodeIDsReducer(displayNames))
}

export function endDragMultiNodes(
  dragWidgetInfos: WidgetLayoutInfo[],
  isDropOnCanvas: boolean,
  isAddAction: boolean = false,
) {
  store.dispatch(configActions.updateShowDot(false))
  const displayNames = dragWidgetInfos.map((node) => node.displayName)
  store.dispatch(configActions.setDraggingNodeIDsReducer([]))

  if (isDropOnCanvas) {
    FocusManager.switchFocus("canvas", {
      displayName: displayNames[0],
      type: "component",
      clickPosition: [],
    })
    store.dispatch(configActions.updateSelectedComponent(displayNames))
  }

  if (isAddAction && !isDropOnCanvas) {
    DisplayNameGenerator.removeDisplayName(dragWidgetInfos[0].displayName)
  }
}
