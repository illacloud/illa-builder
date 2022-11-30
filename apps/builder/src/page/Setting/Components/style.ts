import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const labelStyles = css`
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const labelExtInfoStyles = css`
  font-size: 14px;
  font-weight: 400;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`
