import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const triggerModeContainerStyle = css`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
`

export const containerStyle = css`
  display: flex;
  flex-direction: column;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const spaceStyle = css`
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`

export const titleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`
