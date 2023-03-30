import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const optionLabelContainerStyle = css`
  min-height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 8px;
  gap: 128px;
`

export const optionLabelStyle = css`
  height: 22px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "04")};
`

export const radioGroupContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1px;
  gap: 2px;
  height: 24px;
`
