import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const formTitleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: ${globalColor(`--${illaPrefix}-gray-02`)};
`

export const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
