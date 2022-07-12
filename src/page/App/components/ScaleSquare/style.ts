import { css, SerializedStyles } from "@emotion/react"
import { ScaleSquareType } from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"

export type BarPosition = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br"

export function getStateColor(scaleSquareType: ScaleSquareType): string {
  let stateColor: string
  switch (scaleSquareType) {
    case "error":
      stateColor = globalColor(`--${illaPrefix}-red-03`)
      break
    case "normal":
      stateColor = globalColor(`--${illaPrefix}-techPurple-01`)
      break
    default:
      stateColor = globalColor(`--${illaPrefix}-techPurple-01`)
      break
  }
  return stateColor
}

export function getSelectedColor(selected: boolean): string {
  return selected ? globalColor(`--${illaPrefix}-techPurple-01`) : "transparent"
}

export function applyOuterStyle(
  isDragging: boolean,
  h: number,
  w: number,
): SerializedStyles {
  return css`
    opacity: ${isDragging ? 0 : 100};
    height: ${h}px;
    width: ${w}px;
  `
}

export function applySquarePointerStyle(
  selected: boolean,
  resizing: boolean,
  scaleSquareType: ScaleSquareType,
  pointerPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }
  let positionStyle: SerializedStyles
  switch (pointerPosition) {
    case "tl":
      positionStyle = css`
        top: -2px;
        left: -2px;
        cursor: ${selected ? "nwse-resize" : "default"};
      `
      break
    case "tr":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        top: -2px;
        right: -2px;
      `
      break
    case "bl":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        bottom: -2px;
        left: -2px;
      `
      break
    case "br":
      positionStyle = css`
        cursor: ${selected ? "nwse-resize" : "default"};
        bottom: -2px;
        right: -2px;
      `
      break
    default:
      positionStyle = css``
      break
  }

  const baseColor = getSelectedColor(selected)

  return css`
    ${positionStyle};
    box-sizing: border-box;
    border: 1px solid ${baseColor};
    height: 5px;
    width: 5px;
    position: absolute;
    background: ${selected
      ? globalColor(`--${illaPrefix}-white-01`)
      : "transparent"};

    &:active {
      background: ${baseColor};
    }

    &:hover {
      background: ${baseColor};
    }
  `
}

export const onePixelStyle = css`
  width: 1px;
  height: 1px;
`

export const dragIconStyle = css`
  flex: none;
`

export const dragHandlerTextStyle = css`
  flex-shrink: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export function applyHandlerStyle(
  selected: boolean,
  maxWidth: number,
  state: ScaleSquareType,
): SerializedStyles {
  if (state === "production") {
    return css`
      visibility: hidden;
    `
  }

  return css`
    visibility: ${state === "error" || selected ? "visible" : "hidden"};
    display: flex;
    left: 0;
    cursor: grab;
    top: -18px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: absolute;
    color: ${globalColor(`--${illaPrefix}-white-01`)};
    background: ${getStateColor(state)};
    flex-direction: row;
    font-size: 12px;
    align-items: center;
    padding-left: 1px;
    padding-right: 4px;
    height: 18px;
    max-width: ${maxWidth}px;
  `
}

export const warningStyle = css`
  margin-left: 4px;
`

export function applyBarPointerStyle(
  selected: boolean,
  resizing: boolean,
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }

  let barPositionStyle: SerializedStyles
  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        top: -2px;
        left: 0;
        right: 0;
        margin: auto;
        cursor: ${selected ? "row-resize" : "default"};
        height: 5px;
        width: 24px;
      `
      break
    case "b":
      barPositionStyle = css`
        bottom: -2px;
        left: 0;
        right: 0;
        cursor: ${selected ? "row-resize" : "default"};
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        left: -2px;
        top: 0;
        cursor: ${selected ? "col-resize" : "default"};
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        right: -2px;
        top: 0;
        cursor: ${selected ? "col-resize" : "default"};
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    default:
      barPositionStyle = css``
  }

  const baseColor = getSelectedColor(selected)
  return css`
    ${barPositionStyle};
    box-sizing: border-box;
    position: absolute;
    border-radius: 2.5px;
    border: 1px solid ${baseColor};
    background: ${selected
      ? globalColor(`--${illaPrefix}-white-01`)
      : "transparent"};

    &:active {
      background: ${baseColor};
    }

    &:hover {
      background: ${baseColor};
    }
  `
}

export function applyTransformWidgetStyle(
  verticalResize: boolean,
): SerializedStyles {
  return css`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: ${verticalResize ? "auto" : "hidden"};
    padding: 3px;
  `
}

export function applyBorderStyle(
  selected: boolean,
  scaleSquareState: ScaleSquareType,
): SerializedStyles {
  if (scaleSquareState === "production") {
    return css`
      width: calc(100%);
      height: calc(100%);
      position: absolute;
    `
  }

  return css`
    width: calc(100%);
    height: calc(100%);
    position: absolute;
    cursor: move;
    border: 1px solid ${getSelectedColor(selected)};
    background-color: ${scaleSquareState === "error" && !selected
      ? globalColor(`--${illaPrefix}-red-07`)
      : "transparent"};

    &:hover {
      border-color: ${selected
        ? globalColor(`--${illaPrefix}-techPurple-01`)
        : getStateColor(scaleSquareState)};
      background-color: transparent;

      .handler {
        visibility: visible;
      }
    }

    &:active {
      border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    }
  `
}
