import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const uploadContainerStyle = (isUpLoading: boolean) => css`
  pointer-events: ${isUpLoading ? "none" : "auto"};
  width: 100%;
  cursor: ${isUpLoading ? "not-allowed" : "pointer"};
  display: flex;
  padding: 3px 12px 3px 8px;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  opacity: ${isUpLoading ? 0.5 : 1};
`

export const uploadIconStyle = css`
  padding: 4px;
  display: inline-flex;
  flex: none;
`

export const uploadNameStyle = css`
  overflow: hidden;
  color: ${getColor("grayBlue", "02")};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`
