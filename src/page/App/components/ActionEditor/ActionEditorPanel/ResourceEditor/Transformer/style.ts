import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const disableTransformerStyle = css`
  border-radius: 8px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  padding: 8px 16px;
  font-size: 14px;
  line-height: 22px;
`
