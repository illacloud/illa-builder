import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const keyPressComponentStyle = css`
  padding: 2px 6px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
`

export const emptyStateStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`
