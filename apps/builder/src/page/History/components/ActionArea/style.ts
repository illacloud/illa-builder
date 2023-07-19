import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const actionWrapperStyle = css`
  padding: 8px 0;
`

export const actionTextStyle = css`
  padding: 8px;
  color: ${getColor("techPurple", "01")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
`
