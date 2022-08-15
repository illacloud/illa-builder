import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyCircleStyle(color: string): SerializedStyles {
  return css`
    background-color: ${color};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  `
}
