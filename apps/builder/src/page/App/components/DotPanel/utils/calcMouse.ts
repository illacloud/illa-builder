import { XYCoord } from "react-dnd"

export const getMouseRealPosition = (
  clientOffSet: XYCoord,
  containerScrollTop: number = 0,
) => {
  return {
    x: clientOffSet.x,
    y: clientOffSet.y + containerScrollTop,
  }
}

export const getMouseRelativePosition = (
  canvasPosition: XYCoord,
  mousePosition: XYCoord,
  containerScrollTop: number = 0,
) => {
  const { x, y } = getMouseRealPosition(mousePosition, containerScrollTop)
  return {
    x: x - canvasPosition.x,
    y: y - canvasPosition.y,
  }
}

export const getMousePositionWithIllaUnit = (
  unitWidth: number,
  canvasPosition: XYCoord,
  mousePosition: XYCoord,
  containerScrollTop: number = 0,
) => {
  const relativePosition = getMouseRelativePosition(
    canvasPosition,
    mousePosition,
    containerScrollTop,
  )
  const realX = relativePosition.x / unitWidth
  const integerPartX = Math.floor(realX)
  const decimalPartX = realX - integerPartX
  const integerPartY = Math.floor(relativePosition.y)
  const decimalPartY = relativePosition.y - integerPartY
  return {
    xMod: decimalPartX,
    yMod: decimalPartY,
    xInteger: integerPartX,
    yInteger: integerPartY,
  }
}
