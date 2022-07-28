import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const resourceChooseContainerStyle = css`
  display: flex;
  align-items: center;
  padding: 0 16px;
  flex-direction: row;
  min-height: 64px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const resourceTitleStyle = css`
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const createNewStyle = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
`
