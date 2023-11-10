import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const triggerModeContainerStyle = css`
  display: flex;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  overflow-x: auto;
  flex-direction: row;
  min-height: 64px;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`

export const containerStyle = css`
  display: flex;
  flex-direction: column;
`

export const actionItemContainer = css`
  padding: 8px 0;
`
