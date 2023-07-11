import { configActions } from "@/redux/config/configSlice"
import { LayoutInfo } from "@/redux/currentApp/editor/components/componentsPayload"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { WidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { FocusManager } from "../focusManager"

export function startDragMultiNodes(dragWidgetInfos: WidgetLayoutInfo[]) {
  store.dispatch(configActions.updateShowDot(true))
  const displayNames = dragWidgetInfos.map((node) => node.displayName)
  store.dispatch(executionActions.setDraggingNodeIDsReducer(displayNames))
}

export function endDragMultiNodes(
  dragWidgetInfos: WidgetLayoutInfo[],
  isDropOnCanvas: boolean,
  isAddAction: boolean = false,
) {
  store.dispatch(configActions.updateShowDot(false))
  const displayNames = dragWidgetInfos.map((node) => node.displayName)
  store.dispatch(executionActions.setDraggingNodeIDsReducer([]))

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

export const mergeLayoutInfoToComponent = (
  executionLayoutInfo: LayoutInfo,
  originComponentNode: ComponentNode,
) => {
  return {
    ...originComponentNode,
    ...executionLayoutInfo,
  }
}

export const batchMergeLayoutInfoToComponent = (
  executionResult: Record<string, WidgetLayoutInfo>,
  originComponentNodes: ComponentNode[],
) => {
  return originComponentNodes.map((componentNode) => {
    if (!executionResult[componentNode.displayName]) return componentNode
    return mergeLayoutInfoToComponent(
      executionResult[componentNode.displayName].layoutInfo,
      componentNode,
    )
  })
}
