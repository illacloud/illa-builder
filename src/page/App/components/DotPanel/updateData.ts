import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { Dispatch } from "redux"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { DragShadow } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"

export function updateDottedLineSquareData(
  componentNode: ComponentNode,
  dispatch: Dispatch,
  squareX: number,
  squareY: number,
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
  newItem.parentNode = componentNode.displayName
  newItem.containerType = "EDITOR_DOTTED_LINE_SQUARE"
  newItem.x = squareX
  newItem.y = squareY
  dispatch(componentsActions.addOrUpdateComponentReducer(newItem))
}

export function updateDragShadowData(
  componentNode: ComponentNode,
  dispatch: Dispatch,
  renderX: number,
  renderY: number,
  unitWidth: number,
  unitHeight: number,
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
  dispatch(dragShadowActions.addOrUpdateDragShadowReducer(renderDragShadow))
}

export function updateScaleSquare(
  componentNode: ComponentNode,
  dispatch: Dispatch,
  squareX: number,
  squareY: number,
) {
  // set scale square
  const newItem = {
    ...componentNode,
  } as ComponentNode
  newItem.parentNode = componentNode.displayName
  newItem.containerType = "EDITOR_SCALE_SQUARE"
  newItem.x = squareX
  newItem.y = squareY
  // add component
  dispatch(componentsActions.addOrUpdateComponentReducer(newItem))
}
