import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const baseLabelCss = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const labelTipsCss = css`
  ${baseLabelCss};
  border-bottom: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-07`)};
`
