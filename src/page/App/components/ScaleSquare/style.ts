import { css, SerializedStyles } from "@emotion/react"
import { ScaleSquareType } from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"

export type PointerPosition = "tl" | "tr" | "bl" | "br"
export type BarPosition = "l" | "r" | "t" | "b"

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
  pointerPosition: PointerPosition,
): SerializedStyles {
  let positionStyle: SerializedStyles
  switch (pointerPosition) {
    case "tl":
      positionStyle = css`
        top: 0;
        left: 0;
      `
      break
    case "tr":
      positionStyle = css`
        top: 0;
        right: 0;
      `
      break
    case "bl":
      positionStyle = css`
        bottom: 0;
        left: 0;
      `
      break
    case "br":
      positionStyle = css`
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
        height: 4px;
        width: 18px;
      `
      break
    case "b":
      barPositionStyle = css`
        bottom: 0;
        left: 0;
        right: 0;
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
        margin: auto;
        width: 4px;
        height: 18px;
      `
      break
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
    position: absolute;
    top: 0;
    left: 0;
    stroke: ${selected ? getStateColor(scaleSquareState) : "transparent"};
    stroke-width: 0.5px;
    &:hover {
      stroke: ${getStateColor(scaleSquareState)};
    }
  `
}
