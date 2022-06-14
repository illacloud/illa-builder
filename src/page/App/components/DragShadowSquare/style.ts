import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyDragShadowSquareStyle(
  isConflict: boolean,
  h: number,
  w: number,
) {
  return css`
    height: ${h}px;
    width: ${w}px;
    border-radius: 2px;
    background: ${isConflict
      ? globalColor(`--${illaPrefix}-red-03`)
      : globalColor(`--${illaPrefix}-techPurple-06`)};
  `
}
