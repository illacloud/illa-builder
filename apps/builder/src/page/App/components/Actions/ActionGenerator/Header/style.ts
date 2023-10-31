import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  width: 100%;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const headerStyle = css`
  text-align: center;
  font-size: 16px;
  margin: 0;
  padding: 0;
  color: ${getColor("grayBlue", "02")};
`

export const closeIconContainerStyle = css`
  position: absolute;
  right: 16px;
  top: 16px;
`
