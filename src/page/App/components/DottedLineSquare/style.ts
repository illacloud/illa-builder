import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyDottedContainer(w: number, h: number): SerializedStyles {
  return css`
    width: ${w}px;
    height: ${h}px;
    border-width: 1px;
    border-style: dashed;
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  `
}
