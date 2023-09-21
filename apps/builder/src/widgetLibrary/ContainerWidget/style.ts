import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import {
  SCROLL_CONTAINER_PADDING,
  UNIT_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"

export const emptyStateStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  text-align: center;
`

export const applyEmptyStateWrapperStyle = (
  isInner: boolean = false,
  paddingTopBottom: number,
) => css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${isInner
    ? "100%"
    : 15 * UNIT_HEIGHT - 2 * SCROLL_CONTAINER_PADDING + paddingTopBottom};
`

export const applyContainerWrapperStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
`
