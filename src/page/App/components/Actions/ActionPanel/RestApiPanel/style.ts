import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const restapiPanelContainerStyle = css`
  padding-bottom: 48px;
  width: 100%;
  min-width: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const restapiItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`

export const restapiItemLabelStyle = css`
  font-size: 14px;
  min-height: 48px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
