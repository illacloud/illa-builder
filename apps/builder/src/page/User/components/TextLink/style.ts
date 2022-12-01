import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const textLinkStyle: SerializedStyles = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  cursor: pointer;
`
