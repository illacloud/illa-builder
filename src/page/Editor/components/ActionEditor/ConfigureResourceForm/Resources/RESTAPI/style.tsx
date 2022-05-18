import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const GridContainerGapCSS = css`
  gap: 8px;
`

export const LabelAlignSelfFlexStartCSS = css`
  align-self: flex-start;
  margin-top: 5px;
`

export const InputTagSmallSizeCSS = css`
  height: 32px;
`

export const TopZIndexCSS = css`
  z-index: 3000;
`

export const OAuth2Description = css`
  white-space: normal;
  background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  padding: 8px 16px;
  border-radius: 8px;
  margin: 8px 0;
`
