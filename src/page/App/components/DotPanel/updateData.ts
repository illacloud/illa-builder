import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import store from "@/store"
import { DragShadow } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { DottedLineSquare } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"
import { BarPosition } from "@/page/App/components/ScaleSquare/style"

export function updateDottedLineSquareData(
  currentParent: string,
  componentNode: ComponentNode,
  squareX: number,
  squareY: number,
  unitWidth: number,
  unitHeight: number,
  dispatchFn: (dottedLineSquare: DottedLineSquare) => void,
) {
  // reduce render
  const currentDrag =
    store.getState().currentApp.editor.dottedLineSquare[
      componentNode.displayName
    ]
  if (currentDrag !== null && currentDrag !== undefined) {
    if (squareX == currentDrag.squareX && squareY == currentDrag.squareY) {
      return
    }
  }

  // set shadow
  const dottedLineSquare = {
    parentNode: currentParent,
    displayName: componentNode.displayName,
    squareX,
    squareY,
    w: componentNode.w * unitWidth,
    h: componentNode.h * unitHeight,
  } as DottedLineSquare
  dispatchFn?.(dottedLineSquare)
}

export function updateDragShadowData(
  currentParent: string,
  componentNode: ComponentNode,
  renderX: number,
  renderY: number,
  unitWidth: number,
  unitHeight: number,
  canvasWidth: number,
  canvasHeight: number,
  edgeWidth: number,
  parentVerticalResize: boolean,
  dispatchFn: (renderDragShadow: DragShadow) => void,
) {
  // reduce render
  const currentDrag =
    store.getState().currentApp.editor.dragShadow[componentNode.displayName]
  if (currentDrag !== null && currentDrag !== undefined) {
    if (renderX == currentDrag.renderX && renderY == currentDrag.renderY) {
      return
    }
  }

  // set shadow
  const renderDragShadow = {
    parentNode: currentParent,
    displayName: componentNode.displayName,
    renderX,
    renderY,
    w: componentNode.w * unitWidth,
    h: componentNode.h * unitHeight,
    isConflict:
      renderX < 0 ||
      renderX + componentNode.w * unitWidth > canvasWidth ||
      renderY < 0 ||
      (!parentVerticalResize
        ? renderY + componentNode.h * unitHeight > canvasHeight
        : false),
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
    case "t": {
      let finalY = nearY
      if (nearY < 0) {
        finalY = 0
      }
      if (newItem.h + newItem.y - nearY < newItem.minH) {
        finalY = newItem.h + newItem.y - newItem.minH
      }
      newItem.h = newItem.h + newItem.y - finalY
      newItem.y = finalY
      break
    }
    case "r": {
      let finalX = nearX
      if (nearX > blockColumns) {
        finalX = blockColumns
      }
      if (nearX < newItem.x + newItem.minW) {
        finalX = newItem.x + newItem.minW
      }
      newItem.w = finalX - newItem.x
      break
    }
    case "b": {
      let finalY = nearY
      if (nearY < newItem.y + newItem.minH) {
        finalY = newItem.y + newItem.minH
      }
      newItem.h = finalY - newItem.y
      break
    }
    case "l": {
      let finalX = nearX
      if (nearX < 0) {
        finalX = 0
      }
      if (newItem.w + newItem.x - finalX < newItem.minW) {
        finalX = newItem.w + newItem.x - newItem.minW
      }
      newItem.w = newItem.w + newItem.x - finalX
      newItem.x = finalX
      break
    }
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
