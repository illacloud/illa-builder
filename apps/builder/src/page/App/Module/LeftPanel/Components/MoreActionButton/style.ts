import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const rowCenter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const spaceBetweenStyle = css`
  ${rowCenter};
  justify-content: space-between;
  gap: 8px;
`

export const keyTextStyle = css`
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-transform: capitalize;
`

export const upgradeStyle = css`
  ${rowCenter};
  gap: 8px;
`
