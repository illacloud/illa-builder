import { css } from "@emotion/react"
import { getSpecialThemeColor } from "@illa-design/react"
import { LEFT_MIN_WIDTH } from "@/page/App/components/DotPanel/constant/canvas"

export const applyLeftSectionWrapperStyle = (
  width: string,
  top: string = "0px",
  isFold: boolean,
  dividerColor?: string,
  background: string = "transparent",
) => css`
  position: absolute;
  top: var(--illa-canvas-left-top, ${top});
  left: 0;
  height: var(--illa-canvas-left-height, 100%);
  width: ${width};
  display: flex;
  flex-direction: row;
  min-width: ${isFold ? 0 : `${LEFT_MIN_WIDTH}px`};
  border-right: ${dividerColor
    ? `1px solid ${getSpecialThemeColor(dividerColor)}`
    : "unset"};
  background: ${getSpecialThemeColor(background)};
`
