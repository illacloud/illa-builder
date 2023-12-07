import { css } from "@emotion/react"
import { getSpecialThemeColor } from "@illa-design/react"
import { HEADER_MIN_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"

export const applyHeaderSectionWrapperStyle = (
  height: string,
  left: string = "0px",
  width: string = "0px",
  dividerColor?: string,
  background: string = "transparent",
) => css`
  position: absolute;
  top: 0;
  left: var(--illa-canvas-header-left, ${left});
  width: var(--illa-canvas-header-width, ${width});
  height: ${height};
  display: flex;
  flex-direction: column;
  min-height: ${HEADER_MIN_HEIGHT}px;
  border-bottom: ${dividerColor
    ? `1px solid ${getSpecialThemeColor(dividerColor)}`
    : "unset"};
  background: ${getSpecialThemeColor(background)};
`
