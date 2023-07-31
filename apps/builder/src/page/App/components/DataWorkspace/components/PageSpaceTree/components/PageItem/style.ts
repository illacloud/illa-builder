import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const pageItemContainerStyle = (
  isSelected: boolean,
  level: number,
) => css`
  display: flex;
  padding: 4px ${level > 1 ? level * 16 + 8 : 16}px;
  align-items: center;
  justify-content: space-between;
  background-color: ${isSelected
    ? getColor("techPurple", "07")
    : "transparent"};
  cursor: pointer;
  height: 24px;
  :hover {
    .add-subpage-icon {
      display: flex;
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
`

export const iconHotSpotContainerStyle = css`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`

export const addSubpageIconHotSpotStyle = css`
  ${iconHotSpotContainerStyle};
  display: none;
`

export const plusIconStyle = css`
  ${baseIconStyle};
  color: ${getColor("grayBlue", "04")};
`
