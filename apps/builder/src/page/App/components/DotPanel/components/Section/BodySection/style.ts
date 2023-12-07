import { css } from "@emotion/react"
import { getSpecialThemeColor } from "@illa-design/react"

export const bodySectionWrapperStyle = (background: string) => css`
  position: absolute;
  width: var(--illa-canvas-body-width, 100%);
  left: var(--illa-canvas-body-left, 0);
  top: var(--illa-canvas-body-top, 0);
  height: var(--illa-canvas-body-height);
  background: ${getSpecialThemeColor(background)};
`
