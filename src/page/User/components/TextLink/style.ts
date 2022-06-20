import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const textLinkStyle: SerializedStyles = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  cursor: pointer;
`
