import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const dottedContainer = css`
  border-width: 1px;
  border-style: dotted;
  border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
`
