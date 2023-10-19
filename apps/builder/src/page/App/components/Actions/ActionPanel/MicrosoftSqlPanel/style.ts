import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const labelContainerStyle = css`
  width: 160px;
  text-align: right;
`

export const labelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;

  position: relative;
`

export const labelTipsStyle = css`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  border-bottom: 1px dashed ${getColor("grayBlue", "06")};
`

export const modeContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`
