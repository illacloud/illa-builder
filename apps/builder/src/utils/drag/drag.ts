import { configActions } from "@/redux/config/configSlice"
import { LayoutInfo } from "@/redux/currentApp/editor/components/componentsPayload"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { widgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export function startDragMultiNodes(
  dragNodes: ComponentNode[],
  isAdd: boolean = false,
) {
  store.dispatch(configActions.updateShowDot(true))
  store.dispatch(configActions.updateDraggingStateReducer(true))
  if (!isAdd) {
    const updateSlice = dragNodes.map((dragNode) => ({
      displayName: dragNode.displayName,
      statusInfo: {
        isDragging: true,
      },
    }))
    store.dispatch(
      componentsActions.batchUpdateComponentStatusInfoReducer(updateSlice),
    )
  }
}

export function endDrag(
  dragNode: ComponentNode,
  isDropOnCanvas: boolean,
  isAddAction: boolean = false,
) {
  store.dispatch(configActions.updateShowDot(false))
  store.dispatch(configActions.updateDraggingStateReducer(false))
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
  store.dispatch(configActions.updateDraggingStateReducer(false))
  const displayNames = dragNodes.map((node) => node.displayName)
  if (isDropOnCanvas) {
    store.dispatch(configActions.updateSelectedComponent(displayNames))
  }
  if (!isAddAction) {
    const updateSlice = dragNodes.map((dragNode) => ({
      displayName: dragNode.displayName,
      statusInfo: {
        isDragging: false,
      },
    }))
    store.dispatch(
      componentsActions.batchUpdateComponentStatusInfoReducer(updateSlice),
    )
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
