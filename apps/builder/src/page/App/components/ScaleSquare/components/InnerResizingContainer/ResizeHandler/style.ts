import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { BarPosition } from "./interface"

export const applyBarPointerShapeStyle = (barPosition: BarPosition) => {
  let barPositionStyle: SerializedStyles

  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        left: 0;
        right: 0;
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "b":
      barPositionStyle = css`
        left: 0;
        right: 0;
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        top: 0;
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        top: 0;
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    default:
      barPositionStyle = css``
  }
  return css`
    ${barPositionStyle};
    box-sizing: border-box;
    position: absolute;
    border-radius: 2.5px;
    background-color: ${getColor("white", "01")};
  `
}

export function applyBarHandlerStyle(
  barPosition: BarPosition,
): SerializedStyles {
  let barPositionStyle: SerializedStyles
  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        top: -2px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: row-resize;
      `
      break
    case "b":
      barPositionStyle = css`
        bottom: -2px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: row-resize;
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        left: -2px;
        top: 0;
        width: 5px;
        cursor: col-resize;
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        right: -2px;
        top: 0;
        cursor: col-resize;
        width: 5px;
      `
      break
    default:
      barPositionStyle = css``
  }

  return css`
    ${barPositionStyle};
    position: absolute;
  `
}

export function applyBarPointerStyle(
  barPosition: BarPosition,
  isLimitedMode: boolean = false,
): SerializedStyles {
  let barPositionStyle: SerializedStyles =
    applyBarPointerShapeStyle(barPosition)

  const baseColor = isLimitedMode
    ? getColor("techPink", "01")
    : getColor("techPurple", "01")
  return css`
    ${barPositionStyle};
    border: 1px solid ${baseColor};
    :hover {
      background-color: ${isLimitedMode
        ? getColor("techPink", "01")
        : getColor("techPurple", "01")};
    }
    :active {
      background-color: ${isLimitedMode
        ? getColor("techPink", "01")
        : getColor("techPurple", "01")};
    }
  `
}

export function applySquarePointerStyle(
  pointerPosition: BarPosition,
): SerializedStyles {
  let positionStyle: SerializedStyles
  switch (pointerPosition) {
    case "tl":
      positionStyle = css`
        top: -2px;
        left: -2px;
        cursor: nwse-resize;
      `
      break
    case "tr":
      positionStyle = css`
        cursor: nesw-resize;
        top: -2px;
        right: -2px;
      `
      break
    case "bl":
      positionStyle = css`
        cursor: nesw-resize;
        bottom: -2px;
        left: -2px;
      `
      break
    case "br":
      positionStyle = css`
        cursor: nwse-resize;
        bottom: -2px;
        right: -2px;
      `
      break
    default:
      positionStyle = css``
      break
  }

  return css`
    ${positionStyle};
    box-sizing: border-box;
    border: 1px solid ${getColor("techPurple", "01")};
    height: 5px;
    width: 5px;
    position: absolute;
    background: ${getColor("white", "01")};
    z-index: 150;
    &:active {
      background: ${getColor("techPurple", "01")};
    }

    &:hover {
      background: ${getColor("techPurple", "01")};
    }
  `
}
