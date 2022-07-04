import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const controlStyle = css`
  display: flex;
  align-items: center;
  margin-left: 14px;
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const numStyle = css`
  margin: 0 4px;
`

export const buttonStyle = css`
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  &: hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`
