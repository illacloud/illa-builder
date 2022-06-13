import { css, SerializedStyles } from "@emotion/react"
import { ScaleSquareType } from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"

export type PointerPosition = "tl" | "tr" | "bl" | "br"
export type BarPosition = "l" | "r" | "t" | "b"

function getStateColor(scaleSquareType: ScaleSquareType): string {
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

export function applyScaleSquareContainerStyle(
  h: number,
  w: number,
): SerializedStyles {
  return css`
    position: relative;
    height: ${h}px;
    width: ${w}px;
  `
}

export function applySquarePointerStyle(
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
    background: ${globalColor(`--${illaPrefix}-white-01`)};
    border: 1px solid ${stateColor};
    height: 4px;
    width: 4px;
    position: absolute;

    &:hover {
      background: ${stateColor};
    }
  `
}

export function applyBarPointerStyle(
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
): SerializedStyles {
  let stateColor = getStateColor(scaleSquareType)

  let barPositionStyle: SerializedStyles
  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        top: 0;
        margin: auto;
      `
      break
    case "b":
      barPositionStyle = css`
        bottom: 0;
      `
      break
    case "l":
      barPositionStyle = css`
        left: 0;
      `
      break
    case "r":
      barPositionStyle = css`
        right: 0;
      `
      break
  }

  return css`
    box-sizing: border-box;
    border-radius: 2px;
    position: absolute;
    border: 1px solid ${stateColor};
    background: ${globalColor(`--${illaPrefix}-white-01`)};
    height: 4px;
    width: 18px;

    &:hover {
      background: ${stateColor};
    }
  `
}

export function applyTransformWidgetStyle(
  scaleSquareType: ScaleSquareType,
): SerializedStyles {
  let stateColor = getStateColor(scaleSquareType)
  return css`
    box-sizing: border-box;
    border: 1px solid ${stateColor};
    width: 100%;
    height: 100%;
    margin: 1px;
    padding: 3px;
  `
}
