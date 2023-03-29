import { SerializedStyles, css } from "@emotion/react"
import chroma from "chroma-js"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const itemNameStyle: SerializedStyles = css`
  font-weight: 600;
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 160px;
  vertical-align: bottom;
  display: inline-block;
`

export const itemNameDescStyle: SerializedStyles = css`
  display: inline-block;
  vertical-align: bottom;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export function applyJsonContentStyle(isSelected?: boolean): SerializedStyles {
  return css`
    font-family: "Fira Code", monospace;
    background-color: ${isSelected
      ? chroma(globalColor(`--${illaPrefix}-techPurple-07`))
          .alpha(0.5)
          .hex()
      : ""};
    height: 0;
  `
}
export const jsonNameStyle: SerializedStyles = css`
  display: inline-block;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const jsonValueStyle: SerializedStyles = css`
  display: inline-block;
  word-break: break-all;
`

export const jsonItemStyle: SerializedStyles = css`
  overflow-wrap: break-word;
  word-break: break-all;
`

export function applyJsonValueColorStyle(type: any): SerializedStyles {
  switch (type) {
    case "number":
      return css`
        color: #164;
      `
    case "boolean":
      return css`
        color: #219;
      `
    case "string":
      return css`
        color: #219;
      `
    case "undefined":
      return css`
        color: #708;
      `
    case "function":
      return css`
        color: #05a;
      `
    case "symbol":
      return css`
        color: #00c;
      `
    case "bigint":
      return css`
        color: #170;
      `
    case "object":
      return css`
        color: #a50;
      `
    default:
      return css`
        color: #999;
      `
  }
}

export const editIconHotSpotStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 16px;
  height: 16px;
  font-size: 12px;
  margin-left: 4px;
  position: relative;
  color: ${getColor("grayBlue", "04")};
`

export const globalStateItemContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  width: calc(100% - 16px);
`

export const objectAndArrayTitleStyle = (isChild: boolean) => css`
  font-size: 12px;
  font-weight: 600;
  height: ${isChild ? "20px" : "24px"};
  line-height: ${isChild ? "20px" : "24px"};
  color: ${getColor("grayBlue", "02")};
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const objectAndArrayDescStyle = css`
  font-size: 12px;
  color: ${getColor("grayBlue", "04")};
`

export const globalStateEditIconHotSpotStyle = css`
  width: 12px;
  height: 12px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  visibility: hidden;
`

export const applyObjectOrArrayContainerStyle = (
  isSelected: boolean,
  level: number,
  isChild: boolean,
) => css`
  display: flex;
  align-items: center;
  padding-left: ${(level + 1) * 16}px;
  padding-right: 16px;
  background-color: ${isSelected ? getColor("techPurple", "07") : ""};
  min-height: ${isChild ? "20px" : "24px"};
  margin-top: ${isChild ? "4px" : "0px"};
  font-family: "Fira Code", monospace;
  :hover {
    .global-state-edit-icon-hot-spot {
      visibility: visible;
    }
  }
`

export const applySimpleItemContainerStyle = (
  isSelected: boolean,
  level: number,
) => css`
  display: flex;
  align-items: center;
  padding-left: ${(level + 1) * 16}px;
  padding-right: 16px;
  background-color: ${isSelected ? getColor("techPurple", "07") : ""};
  flex-wrap: wrap;
  margin-top: 4px;
  font-size: 12px;
  gap: 4px;
  :hover {
    .global-state-edit-icon-hot-spot {
      visibility: visible;
    }
  }
  :last-child {
    padding-bottom: 4px;
  }
`

export const applyExpandIconStyle = (isExpanded: boolean) => css`
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
`

export const applyTitleAndDescContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`
