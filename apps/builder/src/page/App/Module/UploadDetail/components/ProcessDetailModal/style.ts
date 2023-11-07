import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const modalContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const buttonGroupContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
`

export const iconHotSpotStyle = css`
  width: 24px;
  height: 24px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${getColor("grayBlue", "02")};
`
