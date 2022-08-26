import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyScaleContainerStyle(scale: number): SerializedStyles {
  return css`
    transform: scale(${scale / 100});
    transform-origin: 50% 0;
    background: ${globalColor(`--${illaPrefix}-white-01`)};
    box-sizing: border-box;
    min-width: 148px;
    overflow-y: hidden;
    height: 100%;
  `
}

export const previewStyle = css`
  position: absolute;
  z-index: 100;
  box-shadow: 0 0 6px 0 ${globalColor(`--${illaPrefix}-blackAlpha-06`)};
  bottom: 8px;
  right: 16px;
`
