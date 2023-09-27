import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const tipContainerStyle = css`
  position: relative;
`

export const vectorStyle = css`
  position: absolute;
  top: -72px;
  right: -76px;
`

export const tipTextStyle = css`
  position: relative;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
`
