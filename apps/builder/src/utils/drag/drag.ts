import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import store, { RootState } from "@/store"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { cloneDeep } from "lodash"

export function startDrag(dragNode: ComponentNode, exist: boolean) {
  store.dispatch(configActions.updateShowDot(true))
  store.dispatch(
    componentsActions.updateComponentDraggingState({
      displayName: dragNode.displayName,
      isDragging: true,
    }),
  )
}

export function endDrag(dragNode: ComponentNode, isDropOnCanvas: boolean) {
  store.dispatch(configActions.updateShowDot(false))
  if (isDropOnCanvas) {
    store.dispatch(configActions.updateSelectedComponent([dragNode]))
  }

  // remove dotted line square
  store.dispatch(
    dottedLineSquareActions.removeDottedLineSquareReducer(dragNode.displayName),
  )
  // remove drag
  store.dispatch(
    dragShadowActions.removeDragShadowReducer(dragNode.displayName),
  )
  if (
    searchDsl(
      store.getState().currentApp.editor.components,
      dragNode.displayName,
    ) == null
  ) {
    DisplayNameGenerator.removeDisplayName(dragNode.displayName)
  }
}

export const getSortedChildrenNodes = (parentDisplayName: string = "root") => {
  const rootState = store.getState()
  const rootNode = getCanvas(rootState)
  const targetNode = searchDsl(rootNode, parentDisplayName)
  const childrenNodes = targetNode?.childrenNode
    ? cloneDeep(targetNode.childrenNode)
    : []
  childrenNodes.sort((node1, node2) => {
    if (node1.y < node2.y) {
      return -1
    }
    if (node1.y > node2.y) {
      return 1
    }
    if (node1.y === node2.y) {
      if (node1.x > node2.x) {
        return 1
      }
      if (node1.x < node2.x) {
        return -1
      }
    }
    return 0
  })
  return childrenNodes
}
