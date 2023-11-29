import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const rightAsideWrapperStyle = css`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  background: ${getColor("white", "01")};
  border-radius: 16px;
  overflow: auto;
`

export const backIconStyle = css`
  width: 16px;
  height: 16px;
  font-size: 16px;
  margin-right: 12px;
  cursor: pointer;
`

export const leftAsideWrapperStyle = css`
  padding: 24px 0;
  width: 240px;
  position: relative;
  align-items: center;
  flex: none;
  overflow-y: auto;
  border-right: 1px solid ${getColor("grayBlue", "09")};
`

export const navWrapperStyle = css`
  padding: 16px 24px 24px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
`

export const layoutWrapperStyle = css`
  background: ${getColor("white", "01")};
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const menuContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-left: -12px;
  .settingMenuClass {
    gap: 0;
  }
  .settingMenuItemClass {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`

export const menuWrapperTittleStyle = css`
  display: flex;
  padding: 9px 24px;
  align-items: center;
  gap: 8px;
  color: ${getColor("grayBlue", "03")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const asideMenuStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const rightSectionContainerStyle = css`
  width: 100%;
  height: 100%;
  padding: 0 32px;
`
