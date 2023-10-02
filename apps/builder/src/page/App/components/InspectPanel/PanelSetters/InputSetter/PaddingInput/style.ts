import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const directionPaddingContainerStyle = css`
  display: flex;
  padding: 8px 16px;
`

export const setterContainerStyle = css`
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const optionsIconHotSpotStyle = css`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const prefixContainerStyle = css`
  color: ${getColor("grayBlue", "04")};
  font-size: 12px;
`
