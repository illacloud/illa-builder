import { configActions } from "@/redux/config/configSlice"
import { updateCurrentAllComponentsAttachedUsers } from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import { LayoutInfo } from "@/redux/currentApp/editor/components/componentsPayload"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export function startDrag(dragNode: ComponentNode, isAdd: boolean = false) {
  store.dispatch(configActions.updateShowDot(true))
  store.dispatch(configActions.updateDraggingStateReducer(true))
  if (!isAdd) {
    store.dispatch(
      componentsActions.updateComponentLayoutInfoReducer({
        displayName: dragNode.displayName,
        layoutInfo: {},
        statusInfo: {
          isDragging: true,
        },
      }),
    )
  }
}

export function endDrag(dragNode: ComponentNode, isDropOnCanvas: boolean) {
  store.dispatch(configActions.updateShowDot(false))
  store.dispatch(configActions.updateDraggingStateReducer(false))
  if (isDropOnCanvas) {
    store.dispatch(
      configActions.updateSelectedComponent([dragNode.displayName]),
    )
    updateCurrentAllComponentsAttachedUsers(
      [dragNode.displayName],
      store.getState().currentApp.collaborators.components,
    )
  } else {
    DisplayNameGenerator.removeDisplayName(dragNode.displayName)
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
  executionResult: Record<string, any>,
  originComponentNodes: ComponentNode[],
) => {
  return originComponentNodes.map((componentNode) => {
    if (!executionResult[componentNode.displayName]) return componentNode
    return mergeLayoutInfoToComponent(
      executionResult[componentNode.displayName].$layoutInfo,
      componentNode,
    )
  })
}
