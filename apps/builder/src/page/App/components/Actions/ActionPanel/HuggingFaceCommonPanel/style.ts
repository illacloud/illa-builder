import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const restapiPanelContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const actionItemContainer = css`
  padding: 8px 0;
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
`

export const textCodeEditorStyle = css`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
`

export const actionItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 38px;
  padding: 0 16px;
`

export const actionItemLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  align-self: center;
`

export const checkoutContentStyle = css`
  min-height: 22px;
  align-self: flex-start;
  display: flex;
  align-items: center;
`

export const checkboxContentContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  align-items: center;
  width: 100%;
`

export const checkboxTipsStyle = css`
  display: inline-block;
  line-height: 22px;
  font-size: 14px;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`
