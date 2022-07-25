import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const resourceChooseContainerStyle = css`
  display: flex;
  flex-direction: row;
  height: 64px;
`

export const resourceTitleStyle = css`
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
