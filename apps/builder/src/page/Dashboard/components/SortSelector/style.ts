import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const sortTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`

export const sortContainerStyle = css`
  cursor: pointer;
  display: inline-flex;
  padding: 5px 16px;
  flex-direction: row;
`
