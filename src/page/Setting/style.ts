import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const navBarStyle = css`
  padding: 0 16px;
  height: 42px;
  display: flex;
  align-items: center;
`

export const navBarLogoStyle = css`
  margin-right: 40px;
`

export const navBarTabStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  margin-right: 32px;
`

export const tabPrefixStyle = css`
  display: inline-flex;
  align-self: center;
  margin-left: 16px;
  padding: 0 16px;
  cursor: pointer;
`
export const preIconStyle = css`
  display: inline-block;
  align-self: center;
  margin-right: 4px;
`
export const tabPreTextStyle = css`
  font-size: 14px;
`
