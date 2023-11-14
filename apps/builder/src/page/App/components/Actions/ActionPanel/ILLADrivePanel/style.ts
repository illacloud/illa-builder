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
  justify-content: flex-end;
  gap: 8px;
`

export const containerStyle = css`
  display: flex;
  flex-direction: column;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const nameStyle = css`
  display: flex;
  width: 160px;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`
