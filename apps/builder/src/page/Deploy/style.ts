import { globalColor, illaPrefix } from "@illa-design/theme"
import { css } from "@emotion/react"

// TODO: @aruseito change canvas position and zindex
export const deployContainerStyle = css`
  width: 100%;
  height: 100vh;
`

export const deployLogoStyle = css`
  position: absolute;
  bottom: 16px;
  right: 16px;
  box-shadow: 0 0 8px 0 ${globalColor(`--${illaPrefix}-blackAlpha-07`)};
`
