import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const tipContainerStyle = css`
  width: 326px;
  height: 93px;
  position: relative;
`

export const vectorStyle = css`
  position: absolute;
  top: 0;
  right: 0;
`

export const tipTextStyle = css`
  position: absolute;
  left: 0;
  bottom: 0;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`
