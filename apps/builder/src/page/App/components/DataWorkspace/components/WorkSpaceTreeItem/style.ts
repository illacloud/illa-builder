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
`

export const objectAndArrayTitleStyle = css`
  font-size: 12px;
  font-weight: 600;
  height: 24px;
  display: flex;
  align-items: center;
  color: ${getColor("grayBlue", "02")};
  cursor: pointer;
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
`

export const applyObjectOrArrayContainerStyle = (
  isSelected: boolean,
  level: number,
) => css`
  display: flex;
  align-items: center;
  padding-left: ${(level + 1) * 16}px;
  padding-right: 16px;
  background-color: ${isSelected ? getColor("techPurple", "07") : ""};
  min-height: 24px;
  font-family: "Fira Code", monospace;
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
`

export const applyTitleAndDescContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`
