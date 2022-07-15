import { globalColor, illaPrefix } from "@illa-design/theme"
import { css } from "@emotion/react"

export const deployContainerStyle = css`
  width: 100%;
  height: 100%;
`

export const deployLogoStyle = css`
  position: absolute;
  bottom: 16px;
  box-shadow: 0 0 6px 0 ${globalColor(`--${illaPrefix}-blackAlpha-06`)};
  right: 16px;
`
