import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"
import { DragShadow } from "@/redux/currentApp/editor/dragShadow/dragShadowState"

export function updateDottedLineSquareData(
  componentNode: ComponentNode,
  squareX: number,
  squareY: number,
  parentDisplayName: string,
  dispatchFn: (componentNode: ComponentNode) => void,
) {
  // reduce render
  const currentDottedLine = searchDsl(
    store.getState().currentApp.editor.components.rootDsl,
    componentNode.displayName,
  )
  if (currentDottedLine != null) {
    if (squareX == currentDottedLine.x && squareY == currentDottedLine.y) {
      return
    }
  }
  // set dotted line
  const newItem = {
    ...componentNode,
  } as ComponentNode
  newItem.parentNode = parentDisplayName
  newItem.containerType = "EDITOR_DOTTED_LINE_SQUARE"
  newItem.x = squareX
  newItem.y = squareY
  dispatchFn?.(newItem)
}

export function updateDragShadowData(
  componentNode: ComponentNode,
  renderX: number,
  renderY: number,
  unitWidth: number,
  unitHeight: number,
  dispatchFn: (renderDragShadow: DragShadow) => void,
) {
  // reduce render
  const currentDrag =
    store.getState().currentApp.editor.dragShadow.map[componentNode.displayName]
  if (currentDrag !== null && currentDrag !== undefined) {
    if (renderX == currentDrag.renderX && renderY == currentDrag.renderY) {
      return
    }
  }

  // set shadow
  const renderDragShadow = {
    displayName: componentNode.displayName,
    renderX,
    renderY,
    w: componentNode.w * unitWidth,
    h: componentNode.h * unitHeight,
    isConflict: false,
  } as DragShadow
  dispatchFn?.(renderDragShadow)
}

export function updateScaleSquare(
  componentNode: ComponentNode,
  squareX: number,
  squareY: number,
  parentDisplayName: string,
  dispatchFn: (componentNode: ComponentNode) => void,
) {
  // set scale square
  const newItem = {
    ...componentNode,
  } as ComponentNode
  newItem.parentNode = parentDisplayName
  newItem.containerType = "EDITOR_SCALE_SQUARE"
  newItem.x = squareX
  newItem.y = squareY
  // add component
  dispatchFn?.(newItem)
}
