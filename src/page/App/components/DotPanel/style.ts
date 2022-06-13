import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

/**
 * @param height default 100% , or number for px
 */
export function applyScaleStyle(height: number | null): SerializedStyles {
  let finalHeight: string
  if (height == null) {
    finalHeight = "100%"
  } else {
    finalHeight = `${height}px`
  }
  return css`
    position: relative;
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 6px;
    box-sizing: border-box;
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
  width: number | null,
  height?: number | null,
): SerializedStyles {
  return css`
    position: absolute;
    width: ${width}px;
    height: ${height}px;
  `
}

export function applyDotContainerStyle(
  showDot: boolean,
  width: number | null,
  height?: number | null,
): SerializedStyles {
  return css`
    visibility: ${showDot ? "visible" : "hidden"};
    position: absolute;
    width: ${width}px;
    height: ${height}px;
  `
}

export function applyDragObjectStyle(t: number, l: number): SerializedStyles {
  return css`
    position: absolute;
    top: ${t}px;
    left: ${l}px;
  `
}
