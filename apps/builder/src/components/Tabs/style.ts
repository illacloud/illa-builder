import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const tabsHeaderContainerStyle = css`
  display: flex;
  width: 100%;
  padding: 12px 16px;
  gap: 8px;
`

export const applyTabsHeaderItemStyle = (isActive: boolean) => css`
  padding: 1px 4px;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: ${isActive ? 500 : 400};
  color: ${isActive ? getColor("grayBlue", "02") : getColor("grayBlue", "03")};
  :hover {
    background-color: ${getColor("grayBlue", "09")};
  }
`
