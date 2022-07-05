import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const itemNameStyle: SerializedStyles = css`
  font-size: 12px;
  font-weight: 500;
`

export const itemNameDescStyle: SerializedStyles = css`
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const jsonNameStyle: SerializedStyles = css`
  display: inline-block;
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const jsonValueStyle: SerializedStyles = css`
  display: inline-block;
  font-size: 12px;
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
