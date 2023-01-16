import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const restapiPanelContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const topDivider = css`
  min-height: 8px;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const restapiItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const restapiItemLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const restapiItemInputStyle = css`
  flex-grow: 1;
  width: 0;
  margin-left: -1px;
  border-radius: 0 8px 8px 0;
`
