import { configActions } from "@/redux/config/configSlice"
import { LayoutInfo } from "@/redux/currentApp/editor/components/componentsPayload"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { widgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export function startDragMultiNodes(
  dragNodes: ComponentNode[],
  isAdd: boolean = false,
) {
  store.dispatch(configActions.updateShowDot(true))
  if (!isAdd) {
    const displayNames = dragNodes.map((node) => node.displayName)
    store.dispatch(executionActions.setDraggingNodeIDsReducer(displayNames))
  }
}

export function endDrag(
  dragNode: ComponentNode,
  isDropOnCanvas: boolean,
  isAddAction: boolean = false,
) {
  store.dispatch(configActions.updateShowDot(false))
  if (isDropOnCanvas) {
    store.dispatch(
      configActions.updateSelectedComponent([dragNode.displayName]),
    )
  }
  if (isAddAction && !isDropOnCanvas) {
    DisplayNameGenerator.removeDisplayName(dragNode.displayName)
  }
}

export function endDragMultiNodes(
  dragNodes: ComponentNode[],
  isDropOnCanvas: boolean,
  isAddAction: boolean = false,
) {
  store.dispatch(configActions.updateShowDot(false))
  const displayNames = dragNodes.map((node) => node.displayName)
  if (isDropOnCanvas) {
    store.dispatch(configActions.updateSelectedComponent(displayNames))
  }
  if (!isAddAction) {
    store.dispatch(executionActions.setDraggingNodeIDsReducer([]))
  }
  if (isAddAction && !isDropOnCanvas) {
    DisplayNameGenerator.removeDisplayName(dragNodes[0].displayName)
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
  executionResult: Record<string, widgetLayoutInfo>,
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
