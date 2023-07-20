import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const ACTION_AREA_HEIGHT = 38
export const actionWrapperStyle = css`
  padding: 8px 0;
  height: ${ACTION_AREA_HEIGHT}px;
`

export const actionTextStyle = css`
  height: ${ACTION_AREA_HEIGHT}px;
  padding: 8px;
  color: ${getColor("techPurple", "01")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
`
