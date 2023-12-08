import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const pageItemContainerStyle = (
  isSelected: boolean,
  level: number,
) => css`
  padding-left: ${level > 1 ? level * 16 + 8 : 16}px;
  padding-right: 16px;
  background-color: ${isSelected
    ? getColor("techPurple", "08")
    : "transparent"};
  cursor: pointer;
  :hover {
    .icon-area {
      transform: translateX(0);
    }
  }
`

export const pageNameStyle = css`
  font-size: 12px;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
`

export const parentPageNameStyle = css`
  font-size: 12px;
  color: ${getColor("grayBlue", "04")};
  font-weight: 500;
`

export const pageNameContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
`

export const baseIconStyle = css`
  font-size: 12px;
  width: 12px;
  height: 12px;
  flex: none;
`

export const actionAreaContainerStyle = css`
  flex: none;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
  transform: translateX(48px);
`

export const iconHotSpotContainerStyle = css`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`

export const plusIconStyle = css`
  ${baseIconStyle};
  color: ${getColor("grayBlue", "04")};
`

export const pageItemInnerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  overflow: hidden;
`
