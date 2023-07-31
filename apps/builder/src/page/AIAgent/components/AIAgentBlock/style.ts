import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const agentBlockStyle = css`
  margin-top: 8px;
  padding: 8px 24px;
  width: 100%;
`

export const blockTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 22px;
`
