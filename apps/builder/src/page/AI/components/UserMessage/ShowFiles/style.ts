import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  gap: 8px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 8px;
  ${applyMobileStyle(css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  `)}
`

export const fileItemStyle = css`
  display: flex;
  width: 284px;
  padding: 8px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 12px;
  background: ${getColor("grayBlue", "09")};
  ${applyMobileStyle(css`
    width: 100%;
  `)}
`

export const iconContainerStyle = css`
  display: flex;
  width: 32px;
  height: 32px;
  padding: 1px 4px;
  justify-content: center;
  align-items: center;
`

export const fileTypeIconStyle = css`
  width: 24px;
  height: 30px;
`

export const fileNameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
