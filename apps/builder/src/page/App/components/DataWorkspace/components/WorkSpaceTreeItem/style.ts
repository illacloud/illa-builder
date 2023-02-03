import { SerializedStyles, css } from "@emotion/react"
// import "@fontsource/fira-code"
import chroma from "chroma-js"
import { Variants } from "framer-motion"
import { globalColor, illaPrefix } from "@illa-design/react"

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
export function applyExpandIconStyle(
  expanded?: boolean,
  level: number = 0,
): SerializedStyles {
  const rotate = expanded ? 90 : 0
  return css`
    font-size: 8px;
    line-height: 0;
    cursor: pointer;
    position: absolute;
    left: ${16 + 12 * level}px;
    top: 8px;
    transform-origin: center;
    transform: rotate(${rotate}deg);
    transition: transform 200ms;
  `
}

export function applyItemContainerStyle(
  isSelected?: boolean,
  level: number = 0,
): SerializedStyles {
  const colorStyle: SerializedStyles = isSelected
    ? css`
        background-color: ${globalColor(`--${illaPrefix}-techPurple-07`)};
      `
    : css``
  return css`
    font-size: 12px;
    min-height: 24px;
    line-height: 22px;
    position: relative;
    padding: 1px 16px;
    padding-left: ${28 + 12 * level}px;
    user-select: none;
    ${colorStyle}
  `
}

export function applyJsonContentStyle(isSelected?: boolean): SerializedStyles {
  return css`
    ${isSelected
      ? css`
          background-color: ${chroma(
            globalColor(`--${illaPrefix}-techPurple-07`),
          )
            .alpha(0.5)
            .hex()};
        `
      : ""}
  `
}
export const jsonNameStyle: SerializedStyles = css`
  display: inline-block;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const jsonValueStyle: SerializedStyles = css`
  display: inline-block;
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
