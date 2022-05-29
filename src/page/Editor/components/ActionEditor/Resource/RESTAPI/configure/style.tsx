import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const gridContainerGapCss = css`
  gap: 8px;
`

export const labelAlignSelfFlexStartCss = css`
  align-self: flex-start;
  margin-top: 5px;
`

export const inputTagSmallSizeCss = css`
  height: 32px;
`

export const topZIndexCss = css`
  z-index: 3000;
`

export const OAuth2Description = css`
  white-space: normal;
  background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  padding: 8px 16px;
  border-radius: 8px;
`
