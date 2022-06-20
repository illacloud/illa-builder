import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyScaleStyle(
  h: number | null,
  verticalResize: boolean,
): SerializedStyles {
  let finalHeight: string
  if (h == null) {
    finalHeight = "100%"
  } else {
    finalHeight = `${h}px`
  }
  return css`
    position: relative;
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 6px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: ${verticalResize ? "auto" : "hidden"};
    width: 100%;
    min-width: 948px;
    min-height: 948px;
    height: ${finalHeight};
  `
}

export const dotStyle = css`
  height: 2px;
  width: 2px;
  border-radius: 1px;
  background: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export function applyDotRowsStyle(isLastRow: boolean): SerializedStyles {
  return css`
    height: ${isLastRow ? "2px" : "8px"};
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
}

export function applyChildrenContainerStyle(
  w: number | null,
  h?: number | null,
): SerializedStyles {
  return css`
    position: absolute;
    width: ${w}px;
    height: ${h}px;
  `
}

export function applyDotContainerStyle(
  showDot: boolean,
  w: number | null,
  h?: number | null,
): SerializedStyles {
  return css`
    z-index: -1;
    visibility: ${showDot ? "visible" : "hidden"};
    position: absolute;
    width: ${w}px;
    height: ${h}px;
  `
}

export function applyDragObjectStyle(t: number, l: number): SerializedStyles {
  return css`
    position: absolute;
    top: ${t}px;
    left: ${l}px;
  `
}
