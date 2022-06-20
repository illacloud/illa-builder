import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import store from "@/store"
import { DragShadow } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { DottedLineSquare } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"
import { BarPosition } from "@/page/App/components/ScaleSquare/style"

export function updateDottedLineSquareData(
  componentNode: ComponentNode,
  squareX: number,
  squareY: number,
  unitWidth: number,
  unitHeight: number,
  dispatchFn: (dottedLineSquare: DottedLineSquare) => void,
) {
  // reduce render
  const currentDrag =
    store.getState().currentApp.editor.dottedLineSquare.map[
      componentNode.displayName
    ]
  if (currentDrag !== null && currentDrag !== undefined) {
    if (squareX == currentDrag.squareX && squareY == currentDrag.squareY) {
      return
    }
  }

  // set shadow
  const dottedLineSquare = {
    displayName: componentNode.displayName,
    squareX,
    squareY,
    w: componentNode.w * unitWidth,
    h: componentNode.h * unitHeight,
  } as DottedLineSquare
  dispatchFn?.(dottedLineSquare)
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
  newItem.isDragging = false
  newItem.containerType = "EDITOR_SCALE_SQUARE"
  newItem.x = squareX
  newItem.y = squareY
  // add component
  dispatchFn?.(newItem)
}

export function updateResizeScaleSquare(
  componentNode: ComponentNode,
  blockColumns: number,
  nearX: number,
  nearY: number,
  position: BarPosition,
  dispatchFn: (componentNode: ComponentNode) => void,
) {
  // set scale square
  const newItem = {
    ...componentNode,
  } as ComponentNode

  switch (position) {
    case "t":
      if (nearY < 0) {
        return
      }
      newItem.h = newItem.h + newItem.y - nearY
      if (newItem.h < newItem.minH) {
        return
      }
      newItem.y = nearY
      break
    case "r":
      newItem.w = nearX - newItem.x
      if (newItem.w < newItem.minW) {
        return
      }
      break
    case "b":
      newItem.h = nearY - newItem.y
      if (newItem.h < newItem.minH) {
        return
      }
      break
    case "l":
      newItem.w = newItem.w + newItem.x - nearX
      if (newItem.w < newItem.minW) {
        return
      }
      newItem.x = nearX
      break
    case "tl": {
      const rightTlX = newItem.x + newItem.w - newItem.minW
      const rightTlY = newItem.y + newItem.h - newItem.minH
      const leftTlX = 0
      const leftTlY = 0

      let finalY = nearY
      let finalX = nearX

      if (nearX > rightTlX) {
        finalX = rightTlX
      }
      if (nearX < leftTlX) {
        finalX = leftTlX
      }
      if (nearY > rightTlY) {
        finalY = rightTlY
      }
      if (nearY < leftTlY) {
        finalY = leftTlY
      }

      newItem.h = newItem.h + newItem.y - finalY
      newItem.y = finalY
      newItem.w = newItem.w + newItem.x - finalX
      newItem.x = finalX
      break
    }
    case "tr": {
      const rightTlX = blockColumns
      const rightTlY = 0
      const leftTlX = newItem.x + newItem.minW
      const leftTlY = newItem.y + newItem.h - newItem.minH

      let finalY = nearY
      let finalX = nearX

      if (nearX > rightTlX) {
        finalX = rightTlX
      }
      if (nearX < leftTlX) {
        finalX = leftTlX
      }
      if (nearY < rightTlY) {
        finalY = rightTlY
      }
      if (nearY > leftTlY) {
        finalY = leftTlY
      }

      newItem.h = newItem.h + newItem.y - finalY
      newItem.y = finalY
      newItem.w = finalX - newItem.x
      break
    }
    case "bl": {
      const rightTlX = newItem.x + newItem.w - newItem.minW
      const rightTlY = newItem.y + newItem.minH
      const leftTlX = 0

      let finalY = nearY
      let finalX = nearX

      if (nearX > rightTlX) {
        finalX = rightTlX
      }
      if (nearX < leftTlX) {
        finalX = leftTlX
      }
      if (nearY < rightTlY) {
        finalY = rightTlY
      }

      newItem.h = finalY - newItem.y
      newItem.w = newItem.w + newItem.x - finalX
      newItem.x = finalX
      break
    }
    case "br": {
      const rightTlX = blockColumns
      const leftTlX = newItem.x + newItem.minW
      const leftTlY = newItem.y + newItem.minH

      let finalY = nearY
      let finalX = nearX

      if (nearX > rightTlX) {
        finalX = rightTlX
      }
      if (nearX < leftTlX) {
        finalX = leftTlX
      }

      if (nearY < leftTlY) {
        finalY = leftTlY
      }

      newItem.h = finalY - newItem.y
      newItem.w = finalX - newItem.x
      break
    }
    default:
      break
  }
  if (
    newItem.w != componentNode.w ||
    newItem.h != componentNode.h ||
    newItem.x != componentNode.x ||
    newItem.y != componentNode.y
  ) {
    dispatchFn?.(newItem)
  }
}
