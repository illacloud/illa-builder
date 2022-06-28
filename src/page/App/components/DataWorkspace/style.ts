import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const splitLineStyle: SerializedStyles = css`
  height: 1px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

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
