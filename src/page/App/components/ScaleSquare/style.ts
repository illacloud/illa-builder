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

export function applyOuterStyle(h: number, w: number): SerializedStyles {
  return css`
    height: ${h}px;
    width: ${w}px;
  `
}

export function applySquarePointerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  pointerPosition: BarPosition,
): SerializedStyles {
  let positionStyle: SerializedStyles
  switch (pointerPosition) {
    case "tl":
      positionStyle = css`
        cursor: ${selected ? "nwse-resize" : "default"};
        top: 0;
        left: 0;
      `
      break
    case "tr":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        top: 0;
        right: 0;
      `
      break
    case "bl":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        bottom: 0;
        left: 0;
      `
      break
    case "br":
      positionStyle = css`
        cursor: ${selected ? "nwse-resize" : "default"};
        bottom: 0;
        right: 0;
      `
      break
    default:
      positionStyle = css``
      break
  }

  let stateColor = getStateColor(scaleSquareType)

  return css`
    ${positionStyle};
    box-sizing: border-box;
    border: 1px solid ${selected ? stateColor : "transparent"};
    height: 4px;
    width: 4px;
    position: absolute;
    background: ${selected
      ? globalColor(`--${illaPrefix}-white-01`)
      : "transparent"};

    &:hover {
      background: ${selected ? stateColor : "transparent"};
    }
  `
}

export const onePixelStyle = css`
  width: 1px;
  height: 1px;
`

export function applyBarPointerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
): SerializedStyles {
  let stateColor = getStateColor(scaleSquareType)

  let barPositionStyle: SerializedStyles
  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        cursor: ${selected ? "row-resize" : "default"};
        height: 4px;
        width: 18px;
      `
      break
    case "b":
      barPositionStyle = css`
        bottom: 0;
        left: 0;
        right: 0;
        cursor: ${selected ? "row-resize" : "default"};
        margin: auto;
        height: 4px;
        width: 18px;
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        left: 0;
        top: 0;
        cursor: ${selected ? "col-resize" : "default"};
        margin: auto;
        width: 4px;
        height: 18px;
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        right: 0;
        top: 0;
        cursor: ${selected ? "col-resize" : "default"};
        margin: auto;
        width: 4px;
        height: 18px;
      `
      break
    default:
      barPositionStyle = css``
  }

  return css`
    ${barPositionStyle};
    box-sizing: border-box;
    position: absolute;
    border-radius: 2px;
    border: 1px solid ${selected ? stateColor : "transparent"};
    background: ${selected
      ? globalColor(`--${illaPrefix}-white-01`)
      : "transparent"};

    &:hover {
      background: ${selected ? stateColor : "transparent"};
    }
  `
}

export function applyTransformWidgetStyle(): SerializedStyles {
  return css`
    width: 100%;
    height: 100%;
    padding: 3px;
  `
}

export function applyBorderStyle(
  selected: boolean,
  scaleSquareState: ScaleSquareType,
): SerializedStyles {
  return css`
    width: calc(100% - 3px);
    height: calc(100% - 3px);
    position: absolute;
    top: 1.5px;
    left: 1.5px;
    border: 1px solid
      ${selected ? getStateColor(scaleSquareState) : "transparent"};

    &:hover {
      border-color: ${getStateColor(scaleSquareState)};
    }
  `
}
