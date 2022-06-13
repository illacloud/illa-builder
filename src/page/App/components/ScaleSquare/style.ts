import { css, SerializedStyles } from "@emotion/react"
import { ScaleSquareType } from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"

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
): SerializedStyles {
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

  return css`
    box-sizing: border-box;
    border: 1px ${stateColor};
    height: 4px;
    width: 4px;
    &:hover {
      background: ${stateColor};
    }
  `
}

export function applyBarPointerStyle(
  scaleSquareType: ScaleSquareType,
): SerializedStyles {
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

  return css`
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px ${stateColor};
    height: 4px;
    width: 18px;
    &:hover {
      background: ${stateColor};
    }
  `
}
