import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const actionWrapperStyle = css`
  padding: 8px 0;
  min-height: 38px;
`

export const actionTextStyle = css`
  min-height: 38px;
  padding: 8px;
  color: ${getColor("techPurple", "03")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
`
