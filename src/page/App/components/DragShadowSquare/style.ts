import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyDragShadowSquareStyle(
  isConflict: boolean,
  height: number,
  width: number,
) {
  return css`
    height: ${height}px;
    width: ${width}px;
    border-radius: 2px;
    background: ${isConflict
      ? globalColor(`--${illaPrefix}-red-03`)
      : globalColor(`--${illaPrefix}-techPurple-06`)};
  `
}
