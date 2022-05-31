import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const gridContainerGapStyle = css`
  gap: 8px;
`

export const inputTagSmallSizeStyle = css`
  height: 32px;
`

export const topZIndexStyle = css`
  z-index: 3000;
`

export const OAuth2Description = css`
  white-space: normal;
  background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  padding: 8px 16px;
  border-radius: 8px;
`
