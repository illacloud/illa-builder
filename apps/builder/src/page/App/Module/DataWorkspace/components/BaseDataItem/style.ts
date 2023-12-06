import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const outerContainerStyle = (
  isSelected: boolean,
  canExpand: boolean,
) => css`
  width: 100%;
  background-color: ${isSelected
    ? getColor("techPurple", "08")
    : getColor("white", "01")};
  cursor: pointer;
  font-family: "Fira Code", monospace;
  :hover {
    background-color: ${getColor("techPurple", "08")};
    #action-bar {
      visibility: visible;
    }
    #expand-icon {
      visibility: ${canExpand ? "visible" : "hidden"};
    }
  }
  #action-bar {
    visibility: ${isSelected ? "visible" : "hidden"};
  }
`

export const itemContainerStyle = (level: number = 0) => css`
  padding-left: ${level * 16 + (level - 1 >= 0 ? level - 1 : 0) * 4}px;
  padding-right: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const expendContainerStyle = css`
  display: flex;
  align-items: center;
`

export const rectangleStyle = css`
  width: 4px;
  height: 100%;
  flex: none;
`

export const titleAndIconContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const titleStyle = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  color: ${getColor("grayBlue", "02")};
`

export const applyExpandIconStyle = (
  isExpanded: boolean,
  canExpand: boolean,
  isSelected: boolean,
) => css`
  font-size: 8px;
  line-height: 0;
  cursor: pointer;
  transform-origin: center;
  transform: rotate(${isExpanded ? 90 : 0}deg);
  transition: transform 200ms;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  visibility: ${canExpand ? (isSelected ? "visible" : "hidden") : "hidden"};
`

export const iconContainerStyle = css`
  display: flex;
  align-items: center;
  visibility: hidden;
`

export const modalBodyContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const itemContentStyle = css`
  font-family: "Fira Code", monospace;
  height: 0;
`
