import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { RIGHT_PANEL_WIDTH } from "@/style"

export const componentPanelCss = css`
  display: inline-flex;
  justify-content: center;
`

export const menuHeaderWrapperStyle = css`
  display: flex;
  width: 100%;
  padding: 13px 12px;
  gap: 10px;
`

export const applyTabItemStyle = (isActive: boolean) => css`
  padding: 1px 4px;
  height: 24px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: ${isActive ? 500 : 400};
  color: ${isActive ? getColor("grayBlue", "02") : getColor("grayBlue", "03")};
  :hover {
    background-color: ${getColor("grayBlue", "09")};
  }
`

export const containerStyle = css`
  box-sizing: border-box;
  width: ${RIGHT_PANEL_WIDTH}px;
  flex: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  position: relative;
`
