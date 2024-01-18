import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const navBarStyle = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
  padding: 6px 16px;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 16px;
`

export const rowCenter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const viewControlStyle = () => css`
  pointer-events: none;
  color: ${getColor("grayBlue", "04")};
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${rowCenter};

  & > svg {
    &:hover {
      color: ${getColor("grayBlue", "02")};
      cursor: pointer;
    }
  }
`

export const rightContentStyle = css`
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  align-items: center;
  gap: 29px;
`

export const buttonGroupStyle = css`
  display: inline-flex;
  gap: 8px;
`

export const badgeStyle = css`
  z-index: 3;
`

export const informationStyle = css`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  flex-shrink: 1;
`

export const descriptionStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 18px;
  color: ${getColor("grayBlue", "04")};
`

export const saveFailedTipStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 18px;
  color: ${getColor("grayBlue", "03")};
  gap: 4px;
`

export const logoCursorStyle = css`
  cursor: pointer;
`

export const closeIconStyle = css`
  width: 8px;
  height: 8px;
  color: ${getColor("grayBlue", "04")};
`

export const inputAreaWrapperStyle = css`
  width: 100%;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: calc(100% + 16px);
  top: 0;
`

export const inputAreaLabelWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 8px;
  color: ${getColor("grayBlue", "02")};
`

export const nameStyle = css`
  font-weight: 500;
  cursor: pointer;
  color: ${getColor("grayBlue", "02")};
`

export const missingResourceModalContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`

export const missingHeaderContainerStyle = css`
  display: flex;
  gap: 8px;
`

export const missingResourceHeaderStyle = css`
  margin: 0;
  padding: 0;
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`

export const missingContentStyle = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
`
