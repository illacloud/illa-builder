import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const applyWSItemTitleStyle: SerializedStyles = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`
