import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const landingTitleStyle = css`
  width: 100%;
  padding: 4px 16px 20px 16px;
  color: ${getColor("grayBlue", "02")};
  font-size: 24px;
  font-weight: 600;
`
export const landingMenuItemsStyle = css`
  background-color: #f7f8fa;
  width: 100%;
  height: 12px;
`
export const landingMenuTitleStyle = css`
  display: flex;
  padding: 9px 16px;
  align-items: center;
  gap: 8px;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const menuItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  color: ${getColor("grayBlue", "02")};
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  &:hover {
    background-color: ${getColor("grayBlue", "09")};
  }
`

export const rightIconStyle = css`
  color: #a9aeb8;
`

// mobile
export const landingWrapperStyle = css`
  position: relative;
  margin: 16px;
  min-height: 500px;
`
export const avatarStyle = css`
  margin: 0 auto 48px;
  width: 100px;
  height: 100px;
`

export const cameraIconStyle = css`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 72px;
  right: 113px;
`
