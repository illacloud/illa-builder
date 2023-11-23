import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const esItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const esItemLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${getColor("grayBlue", "02")};
`
