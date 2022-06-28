import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const itemTitleStyle: SerializedStyles = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`

export const gridCollapseContentStyle: SerializedStyles = css`
  display: grid;
  grid-gap: 4px;
`
