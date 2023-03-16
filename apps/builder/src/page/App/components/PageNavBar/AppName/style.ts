import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const triggerStyle = css`
  margin-top: 20px;
`

export const nameStyle = css`
  font-weight: 500;
  cursor: pointer;
  color: ${getColor("grayBlue", "02")};
`
