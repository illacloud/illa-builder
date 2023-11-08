import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const uploadContainerStyle = css`
  width: 100%;
  cursor: pointer;
  display: flex;
  padding: 4px 12px 4px 8px;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
`

export const uploadIconStyle = css`
  height: 22px;
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
  line-height: 20px;
`
